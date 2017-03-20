/* Author: Ed Alegrid 10/2/2016 */
'use strict'
var device = require('./device.js'); 

exports.load = function(app){
    app.use('/device', device); 
};


