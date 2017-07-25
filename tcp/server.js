/* Author: Ed Alegrid 3/13/2017 */
'use strict';

const net = require('net');
const IOControlModule = require('../lib/ipcheck.js');
const Web = require('../lib/WebControl.js');
const opCode = require('../lib/WebControl.js').opCode;
const gpCode = require('../lib/WebControl.js').gpCode;

var remoteIP; 

exports.start = (io, port, cb) => {
  const s = net.createServer(function(server) {
  exports.server = server;
  server.setNoDelay(true);

  server.on('data', (payload) => {
  console.log('TcpServer:', payload.toString());
  var _cd = payload.toString();

    if (server.remoteAddress !== '::ffff:127.0.0.1'){

      exports.server = server;
      remoteIP = IOControlModule.sanitizedIP(server);

      if(_cd === opCode.on || _cd === opCode.off){
        exports.remoteIP = IOControlModule.sync(_cd, remoteIP);
        return;
      }
      exports.remoteIP;
      console.log('\n*** Tcp Control ***');
      //console.log('remote client data (port: 51111): ', _cd);
      if(_cd === opCode.state) {
        Web.Control(_cd);
      }
      else if(gpCode){
        for(let x in gpCode.out.on){
          if(gpCode.out.on[x] === _cd || gpCode.out.off[x] === _cd){
            return Web.Control(_cd);
          }
        }
      }
      else{
         console.log('gpCode is null, cannot control GPIO outputs');
         return;   
      }
    }
    else {
      io.emit('browserEvent', _cd); 
    }
  });
  server.on('error', (error) => {
    console.log('' + error);
    server.destroy();
  });
  server.on('end', () => {
    server.unref();
  });
  }).listen(port, () => { 

  if(cb){
    cb();
  }
  console.log('TcpServer waiting on port: ', port);
  });
};

