'use strict';
var path = require('path'),
    fs = require('fs'),
    extend = require('util')._extend,
    configFiles = [],
    configFile = null,
    configData = null;

function doesConfigFileExist(file) {
    return configFiles.indexOf(file) !== -1;

}
function getConfigurationFiles(options) {
    configFiles = fs.readdirSync(options.basePath + options.configPath).map(function (file) {
        return file.substring(0, file.indexOf('.'));
    });
}
module.exports = function (opt) {

    var options = extend({
        basePath: path.dirname(require.main.filename),
        configPath: "/config/"
    }, opt);


    getConfigurationFiles(options);

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