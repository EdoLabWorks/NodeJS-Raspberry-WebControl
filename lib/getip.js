/* Author: Ed Alegrid 10/2/2016 */
'use strict'

var os = require('os');
var address;

exports.Check = () => {
var ifaces = os.networkInterfaces();
for (var dev in ifaces) {
var iface = ifaces[dev].filter(function(details) {
return details.family === 'IPv4' && details.internal === false;
});
if(iface.length > 0) address = iface[0].address;
}
console.log('http server ip :', address);
return address;
};





