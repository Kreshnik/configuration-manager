'use strict';
var path = require('path'),
    fs = require('fs'),
    extend = require('util')._extend,
    items = [],
    configData = null,
    configFile = null;

function doesConfigFileExist(file) {
    return items.indexOf(file) !== -1;

}
module.exports = function (opt) {

    var options = extend({
        basePath: path.dirname(require.main.filename),
        configPath: "/config/"
    }, opt);

    items = fs.readdirSync(options.basePath + options.configPath);
    items = items.map(function (file) {
        return file.substring(0, file.indexOf('.'));
    });

    return {

        // Determine if the given configuration value exists.
        has: function (key) {
            var parts = key.split('.');

            if (!doesConfigFileExist(parts[0]))
                throw new Error('Configuration file not found.');

            configFile = options.basePath + options.configPath + parts[0] + ".json";
            configData = require(configFile);

            return configData.hasOwnProperty(parts[1]);


        },

        // Get the specified configuration value.
        get: function (key) {
            var parts = key.split('.');

            if (!this.has(key))
                throw new Error('Config property does not found.');

            return configData[parts[1]];
        },

        // Set a given configuration value.
        set: function (key, value) {
            var value = value || null,
                parts = key.split('.');

            if (!this.has(key))
                throw new Error('Config property does not found.');

            configData[parts[1]] = value;
            fs.writeFile(configFile, JSON.stringify(configData, null, '\t'), function (err) {
                if (err) throw err;
            });

            return true;
        }

    }

};