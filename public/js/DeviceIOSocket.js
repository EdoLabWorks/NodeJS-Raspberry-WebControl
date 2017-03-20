var socket = io();

$('#ig1').hide();
$('#ig2').hide();
$('#ig3').hide();
$('#ig4').hide();
$('#ig5').hide();
$('#ig6').hide();
$('#og1').hide();
$('#og2').hide();
$('#og3').hide();
$('#og4').hide();
$('#og5').hide();
$('#og6').hide();

socket.on('browserEvent', function(msg){
const on = 'orange';
const off = 'red';
const neutral = '';

/* input1 */
if(msg === 'h0' || msg === 'l0'){
$('#ig1').show();
if(msg === 'h0'){ 
$('#btnH1').html('ON').css('background-color', on);
//$('#btnL1').css('background-color', neutral);
}
else if(msg === 'l0'){ 
//$('#btnL1').css('background-color', off);
$('#btnH1').html('OFF').css('background-color', off);
}
}

/* input2 */
if(msg === 'h1' || msg === 'l1'){
$('#ig2').show();
if(msg === 'h1'){ 
$('#btnH2').html('ON').css('background-color', on);
//$('#btnL2').css('background-color', neutral);
}
else if(msg === 'l1'){ 
//$('#btnL2').css('background-color', off);
$('#btnH2').html('OFF').css('background-color', off);
}
}

/* input3 */
if(msg === 'h2' || msg === 'l2'){
$('#ig3').show();
if(msg === 'h2'){ 
$('#btnH3').html('ON').css('background-color', on);
//$('#btnL3').css('background-color', neutral);
}
if(msg === 'l2'){ 
//$('#btnL3').css('background-color', off);
$('#btnH3').html('OFF').css('background-color', off);
}
}

/* input4 */
if(msg === 'h3' || msg === 'l3'){
$('#ig4').show();
if(msg === 'h3'){ 
$('#btnH4').html('ON').css('background-color', on);
//$('#btnL4').css('background-color', neutral);
}
else if(msg === 'l3'){ 
//$('#btnL4').css('background-color', off);
$('#btnH4').html('OFF').css('background-color', off);
}
}

/* input5 */
if(msg === 'h4' || msg === 'l4'){
$('#ig5').show();
if(msg === 'h4'){ 
$('#btnH5').html('ON').css('background-color', on);
//$('#btnL5').css('background-color', neutral);
}
else if(msg === 'l4'){ 
//$('#btnL5').css('background-color', off);
$('#btnH5').html('OFF').css('background-color', off);
}
}

/* input6 */
if(msg === 'h5' || msg === 'l5'){
$('#ig6').show();
if(msg === 'h5'){ 
$('#btnH6').html('ON').css('background-color', on);
//$('#btnL6').css('background-color', neutral);
}
else if(msg === 'l5'){ 
//$('#btnL6').css('background-color', off);
$('#btnH6').html('OFF').css('background-color', off);
}
}

/* output1 */
if(msg === 'on0' || msg === 'off0'){
$('#og1').show();
if(msg === 'on0'){ 
$('#btnON1').css('background-color', on);
$('#btnOFF1').css('background-color', neutral);
}
else if(msg === 'off0'){ 
$('#btnOFF1').css('background-color', off);
$('#btnON1').css('background-color', neutral);
}
}

/* output2 */
if(msg === 'on1' || msg === 'off1'){
$('#og2').show();
if(msg === 'on1'){ 
$('#btnON2').css('background-color', on);
$('#btnOFF2').css('background-color', neutral);
}
if(msg === 'off1'){ 
$('#btnOFF2').css('background-color', off);
$('#btnON2').css('background-color', neutral);
}
}

/* output3 */
if(msg === 'on2' || msg === 'off2'){
$('#og3').show();
if(msg === 'on2'){ 
$('#btnON3').css('background-color', on);
$('#btnOFF3').css('background-color', neutral);
}
if(msg === 'off2'){ 
$('#btnOFF3').css('background-color', off);
$('#btnON3').css('background-color', neutral);
}
}

/* output4 */
if(msg === 'on3' || msg === 'off3'){
$('#og4').show();
if(msg === 'on3'){ 
$('#btnON4').css('background-color', on);
$('#btnOFF4').css('background-color',  neutral);
}
if(msg === 'off3'){ 
$('#btnOFF4').css('background-color', off);
$('#btnON4').css('background-color',  neutral);
}
}

/* output5 */
if(msg === 'on4' || msg === 'off4'){
$('#og5').show();
if(msg === 'on4'){ 
$('#btnON5').css('background-color', on);
$('#btnOFF5').css('background-color', neutral);
}
if(msg === 'off4'){ 
$('#btnOFF5').css('background-color', off);
$('#btnON5').css('background-color', neutral);
}
}

/* output6 */
if(msg === 'on5' || msg === 'off5'){
$('#og6').show();
if(msg === 'on5'){ 
$('#btnON6').css('background-color', on);
$('#btnOFF6').css('background-color', neutral);
}
if(msg === 'off5'){ 
$('#btnOFF6').css('background-color', off);
$('#btnON6').css('background-color', neutral);
}
}

});
