## NodeJS-WebControl-Raspberry Pi

A start-up web control project for Raspberry Pi 3 using array-gpio, express, angular and socket.io.

Turn ON/OFF actuators/peripherals connected in your Raspberry Pi 3 using your mobile device browser.

Note:
 
Works on node v5.0 LTS or v6.5 latest and above.

### Raspberry Pin Setup

Using the GPIO physical pin number, choose the pins (max. 6) you want to use as inputs and outputs.

Configure the pins in the app.js file as shown below. 
~~~~
GPIO.setInput(in1, in2, ... in6);
GPIO.setOutput(out1, out2 ... out6);
~~~~

### Features

- Real-time update of the GPIO pin state.
- Control remote devices within your private network using your mobile device browser.  
- Get real-time status update during initial loading or refreshing of your browser everytime.
- You can also control your Raspberry Pi from your laptop or desktop PC using the IO-Control Module-Raspberry utility. 

### Installation 

git clone or download the application in your Raspberry Pi computer.

In the root folder, install all dependencies.
~~~~
$ npm install
~~~~

Run the application as shown below. 
~~~~
$ node app
~~~~

Type the `ip address` of your Raspberry Pi in your mobile device or development PC browser using http as shown below. 
~~~~
http://<ip address of your raspberry Pi>:3000/
~~~~
e.g.
~~~~
http://192.168.1.125:3000/
~~~~

### License

MIT
