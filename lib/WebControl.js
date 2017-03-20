/* Author: Ed Alegrid 3/1/2017 */

'use strict';

const GPIO = require('array-gpio');
const TcpClient = require('../tcp/client.js');
var remoteIP;

/* web and tcp operational codes */ 
const opCode = exports.opCode = {on:'syn', off:'synoff', foff:'fsynoff', state:'pinstat'};

/* GPIO control code container */
const gpCode = exports.gpCode = {in:{on:[], off:[]}, out:{on:[], off:[]}};

/**
*  web control API and setup
*/
console.log('\n*** WebControl Initialization ***');
// input and output object variables
var input, output;
// valid pin array container
var validInputPin = [];
var validOutputPin = [];

/**
*  Input pin setup function
*/
exports.setInput = function (in1,in2,in3,in4,in5,in6){
  let inputPin = [in1,in2,in3,in4,in5,in6];
  for(let x in inputPin){
    if(inputPin[x]){
      validInputPin.push(inputPin[x]);
    }
  }
  input = GPIO.Input({pin:validInputPin}); 
  if(input !== undefined){
    startWebControl();
  }
  else{
    console.log('no user input pins were defined');  
  }
}

/**
*  Output pin setup function
*/
exports.setOutput = function (out1,out2,out3,out4,out5,out6){
  let outputPin = [out1,out2,out3,out4,out5,out6];
  for(let x in outputPin){
    if(outputPin[x]){
      validOutputPin.push(outputPin[x]);
    }
  }
  output = GPIO.Output({pin:validOutputPin});
  if(output !== undefined){
    startWebControl();
  }
  else{
    console.log('no user output pins were defined');  
  }
}

/*
*  Start Web Control Process 
*/
function startWebControl () {

/* 
*  A simple process to turn ON an output if a button switch is pressed.
*  Each input will control an output consecutively.
*  Try connecting one button switch as input and one led as output. 
*/

/* 'array-gpio' common event function */
/* check array-gpio API for details */
GPIO.main = () => {
  if(input){
    for(let i in input){
      pinState(input[i].pin, updateBrowser);
      if(input[i].isOn){
        if(output){
          for(let x in output){
            if(i === x && output[x].isOff){
                output[x].on(() => pinState(output[x].pin, updateBrowser));
            }
          }
        }
      }
      else if(input[i].isOff){
        if(output){
          for(let x in output){
            if(i === x && output[x].isOn){
              output[x].off(() => pinState(output[x].pin, updateBrowser));
            }
          }
        }
      }
    }
  }
};

/*
*  generate in real-time GPIO control codes
*  should be the same in index.html client and socket.io client script
*/ 
(function (){
  /* input code */
  if(input){
    for(let i in input){
      gpCode.in.on[i] = 'h' + i;
      gpCode.in.off[i] = 'l' + i;
    }
  }
 
  /* output code */
  if(output){
    for (let x in output){
      gpCode.out.on[x] = 'on' + x;
      gpCode.out.off[x] = 'off' + x;
    }
  }
 
})();

/*
*  get control data (_cd) from a unique pin number
*/
function pinState (pin, cb) {
  let _cd;
  for (let i in input) {
    if (pin && pin === input[i].pin && input[i].state === true){
      _cd =  gpCode.in.on[i];
    }
    else if (pin && pin === input[i].pin && input[i].state === false){
      _cd = gpCode.in.off[i];
    }
  }
  for (let x in output) {
    if (pin && pin === output[x].pin && output[x].state === true){
      _cd =  gpCode.out.on[x];
    }
    else if (pin && pin === output[x].pin && output[x].state === false){
      _cd =  gpCode.out.off[x];
    }
  }

  /* update browser using 2-stage update */
  if(_cd && cb){
    process.nextTick(function(){
      // 1st stage update
      cb(_cd);
      // 2nd stage update mostly for old slow browsers
      setTimeout( function() {
        cb(_cd); 
      }, 200 ); 
    });
  }
  return _cd;
};

/*
*  update pin state
*/ 
function updatePinState (_cd){
  if(_cd === opCode.state){
    for (let i in input) {
      pinState(input[i].pin, updateBrowser);
    }
    for (let x in output) {
      pinState(output[x].pin, updateBrowser);
    }
  }
};

/*
*  GPIO output control function
*/
function gpioControl (data){
  for (let x in output){
    if(gpCode.out.on[x] === data){
      output[x].on();
    }
    if(gpCode.out.off[x] === data){
      output[x].off();
    }
  }
};

/*
*  general purpose function to get current pin state,
*  control a GPIO pin and update browser for new pin state
*/
module.exports.Control = function (_cd) {
  if(!_cd){
    console.log('missing or null parameter _cd');
  }
  else if(_cd === opCode.state) {
    updatePinState(_cd); 
  }else{
    process.nextTick(function(){
      /* capture GPIO output control codes */ 
      gpioControl(_cd);
      /* update browser state after each call to gpioControl() */
      setImmediate(updateBrowser, _cd);
    });
  }
};

/*
*  update pin state browser function
*/ 
function updateBrowser (_cd) {
  let remoteIP = require('../tcp/server.js').remoteIP;
  /* update also IO-ControlModule - Raspberry Pi desktop application if synchronized */ 
  if(remoteIP && remoteIP !== '127.0.0.1' ){ 
    TcpClient.Connect(remoteIP, 51111, _cd);
  }
  TcpClient.Connect('127.0.0.1', 5555, _cd);
  remoteIP = null;
};

}

/* exit clean-up process function */
function appExitProcess () {
  console.log('Closing all input/output objects ... ');
  for(let i in input){
    input[i].close();
  }
  for(let x in output){
    output[x].close();
  }
}

process.on('SIGINT', function (){
  console.log('\nWebControl module terminated using Ctrl-C');
  appExitProcess();
  process.exit(0);
});


