/* Author: Ed Alegrid 10/2/2016 */
'use strict';

const net = require('net');

exports.Connect = (ip, port, _cd) => {
const client = new net.Socket();
client.connect(port , ip );
client.setNoDelay(true);

  client.on('connect', () => {
  console.log('TcpClient: ' + client.remoteAddress +':' + client.remotePort + ' ' + _cd);

  if (_cd == null) {
    console.log('data is an invalid undefined payload');
    return;
  }
  else if (_cd === '') {
    console.log('data is an invalid empty string payload');
    return;
  }
  client.write(_cd.toString());
  client.end();

  }); 

  client.on('error', (error) => {
    console.log('client ' + error);
    client.destroy();
  });
  client.on('end', () => {
    client.unref();
  });

};


