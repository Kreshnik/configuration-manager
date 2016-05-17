var path = require('path'),
    expect = require("chai").expect;

var configurationManager = require("./../index.js")({
    basePath: path.dirname(__filename)
});

describe("Configuration Manager", function () {

    it("Check if configuration property exists.", function () {
        expect(configurationManager.has('app.env')).to.equal(true);
    });

    it("Get configuration property.", function () {
        expect(configurationManager.get('app.env')).to.equal("Production");
    });

    it("Set configuration property.", function () {
        expect(configurationManager.set('app.env', "Production")).to.equal(true);
    });

});