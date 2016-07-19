var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.get('/', function(request, response){ response.sendFile(__dirname + '/src/index.html'); });
app.get('/style.css', function(request, response){ response.sendFile(__dirname + '/src/style.css'); });
app.get('/script.js', function(request, response){ response.sendFile(__dirname + '/src/script.js'); });
app.get('/config.html', function(request, response){ response.sendFile(__dirname + '/src/config.html'); });
app.get('/general.html', function(request, response){ response.sendFile(__dirname + '/src/general.html'); });
app.get('/info.html', function(request, response){ response.sendFile(__dirname + '/src/info.html'); });
app.get('/reload.html', function(request, response){ response.sendFile(__dirname + '/src/reload.html'); });
app.get('/value.html', function(request, response){ response.sendFile(__dirname + '/src/value.html'); });

app.get('/post/connection/form', function(request, response){
  console.log('request.query', request.query);
  response.send('');
  // config_server.DeviceName = request.body.devicename;
  // response.redirect(302, '/reload.html');
});

app.get('/get/devicename', function(request, response){
  response.send('devicename|ESP8266_E8DF4E|input');
});
app.get('/get/networks', function(request, response){
  response.send('networks|Found 10 Networks<br><table border="0" cellspacing="0" cellpadding="3" class=""><tr bgcolor=\'#DDDDDD\'><td><strong>Name</strong></td><td><strong>Quality</strong></td><td><strong>Enc</strong></td><tr><tr><td><a href=\'javascript:setssid("Rtone Cisco")\'>Rtone Cisco</a></td><td>100%</td><td>*</td></tr><tr><td><a href=\'javascript:setssid("Rtone Cisco")\'>Rtone Cisco</a></td><td>72%</td><td>*</td></tr><tr><td><a href=\'javascript:setssid("HP-Print-3E-Officejet Pro X476dw")\'>HP-Print-3E-Officejet Pro X476dw</a></td><td>34%</td><td>*</td></tr><tr><td><a href=\'javascript:setssid("FreeWifi_secure")\'>FreeWifi_secure</a></td><td>16%</td><td>*</td></tr><tr><td><a href=\'javascript:setssid("FreeWifi")\'>FreeWifi</a></td><td>18%</td><td> </td></tr><tr><td><a href=\'javascript:setssid("FreeWifi_secure")\'>FreeWifi_secure</a></td><td>18%</td><td>*</td></tr><tr><td><a href=\'javascript:setssid("m2o")\'>m2o</a></td><td>20%</td><td>*</td></tr><tr><td><a href=\'javascript:setssid("FreeWifi")\'>FreeWifi</a></td><td>16%</td><td> </td></tr><tr><td><a href=\'javascript:setssid("Maison")\'>Maison</a></td><td>30%</td><td>*</td></tr><tr><td><a href=\'javascript:setssid("FreeWifi_secure")\'>FreeWifi_secure</a></td><td>24%</td><td>*</td></tr></table>|div');
});
app.get('/get/connection/state', function(request, response){
  response.send('connectionstate|Connected|div');
});
app.get('/get/connection/form', function(request, response){
  response.send('ssid|rtone|input\npassword|0478477078rto|input\n');
});
app.get('/get/connection/info', function(request, response){
  response.send('x_ssid|rtone|div\nx_ip|192.168.1.211|div\nx_netmask|255.255.255.0|div\nx_gateway|255.255.255.0|div\nx_mac|01:00:0C:CC:CC:CC|div');
});
app.get('/get/pin/value', function(request, response){
  var pinValue = Math.round(3.3*Math.random()*100)/100;
  response.send('value|' + pinValue + '|div\n');
});

var times = [];
app.get('/image', function(request, response, next){
  console.time('image');
  var start = new Date();
  response.sendFile(__dirname + '/server.js', {}, function(){
    var end = new Date();
    var time = end - start;
    console.log(time + "ms");
    var speed = 400 / time;
    times.push(time);
    console.log(get2Digits(speed) + "mo/s");
    console.log("mean : " + get2Digits(getMeanValue(times)) + "mo/s");
    console.timeEnd('image');
  });
});

app.listen(8080, function(){
    console.log('Starting webserver on port 8080');
});

function getMeanValue (times) {
  var sum = times.reduce(function(a, b) { return a + b; });
  return 400 / (sum / times.length);
}

function get2Digits (speed) {
  return (Math.round(100 * speed)/100);
}
