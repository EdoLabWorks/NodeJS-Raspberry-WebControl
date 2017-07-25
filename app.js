/* Author: Ed Alegrid 3/1/2017 */
'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const serverIP = require('./lib/ipcheck.js');
const device = require('./routes/device.js');
const TcpServer = require('./tcp/server.js');
const gpio = require('./lib/WebControl.js');

/*
 *  Provide the GPIO pin no. of your input and output object (max. of 6 inputs and 6 outputs).  
 *  (replace the default setup below using the actual pins you will use)  
 */
gpio.setInput(11,13,15,19);
gpio.setOutput(33,35,37,36,38,40); 

var ip;

function webStart(){
/* start tcp server with socket.io for browser button updates */
TcpServer.start(io, 5555, ()=>{ //using port 5555
  console.log('\n*** start tcp server ***');
}); 

/* load web api routes */
app.use('/device', device); 

/* set public and spa folder as index.html container */
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/SPA'));

/* get local http server ip address */
var address = serverIP.getIP();
ip = address;
const port = 3000;

http.listen(port, ip, () => {
  console.log('\n*** start http server ***');
  console.log(`HttpServer started: http://${ip}:${port}`);
  exports.ip = ip;
});
};

/* start http server */
webStart();


