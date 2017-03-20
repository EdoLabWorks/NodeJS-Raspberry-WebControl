/* Author: Ed Alegrid 3/13/2017 */
'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var Web = require('../lib/WebControl.js');

var result = [];
var r = express.Router();
r.use(bodyParser.json());

r.route('/data').post(function (req, res) {
var item = req.body;
var _cd = item.d;
result = [item];
console.log('\n**** HTTP (req, res) ****');
console.log('request data: ', item);

/* 
*  Using a single control function to get the current pin state,
*  control a GPIO pin and update the browser for ON/OFF state condition. 
*/ 
Web.Control(_cd);

result = [_cd];
console.log('response data:', result);

setTimeout( function() {
var data = JSON.stringify(result);
res.json({item: data.toString()});
}, 25 ); 
});
module.exports = r;   

 
