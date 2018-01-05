'use strict'

/*
 * autoload
 *
*/
const ServiceProvider = require('./src/ServiceProvider')
if (!global.use) {
    require("./autoload")
}

module.exports = { ServiceProvider  }
