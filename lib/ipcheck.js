/* Author: Ed Alegrid 10/2/2016 */
'use strict'

//const os = require('os');
const ip = require('ip');
const opCode = require('./WebControl.js').opCode;
const updateState = require('../tcp/client.js');

/* get http server ip */
exports.getIP = () => {
var address = ip.address();
return address;
};

/* remote IP sync/unsync process */
var i = 0;
var currentIP;
exports.sync = (_cd, remoteIP) => {
i += 1;
if(_cd === opCode.on){
if(i === 0){
currentIP = remoteIP;
}
if(i > 0){
if(remoteIP === currentIP){
currentIP = remoteIP;
}
else{ 			
if ( i !== 1 ){ 	
updateState.Connect(currentIP, 51111, op.foff);
}
currentIP = remoteIP;
}
if(i > 5){ i=0; }
}
console.log('currentIP: ' + currentIP);
updateState.Connect(remoteIP, 51111, remoteIP); 
console.log('IO-Control Module sync done');
return remoteIP;
}
else { 
console.log('IO-Control Module unsync done');
remoteIP = '127.0.0.1';
return remoteIP;
}
}; 

/* convert ipv6 to ipv4 */ 
var sanitizedIP = exports.sanitizedIP = function (_s){
var _ip = _s.remoteAddress;
/* check ip, ensure entering only from our local private network */
if (ip.isPrivate(_ip) && ip.isV6Format(_ip)) {
if(_ip.length < 15){ 
_ip = _ip;  
}
else{ 
var validIP = _ip.slice(7);
}
return validIP; 
}
}


