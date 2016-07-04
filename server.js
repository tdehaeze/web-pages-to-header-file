var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var config_server = {
  DeviceName: "esp8266"
};

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function(request, response){
  response.sendFile(__dirname + '/src/index.html');
});

app.get('/style.css', function(request, response){
  response.sendFile(__dirname + '/src/style.css');
});

app.get('/script.js', function(request, response){
  response.sendFile(__dirname + '/src/script.js');
});

app.get('/config.html', function(request, response){
  response.sendFile(__dirname + '/src/config.html');
});

app.get('/general.html', function(request, response){
  response.sendFile(__dirname + '/src/general.html');
});

app.post('/general.html', function(request, response){
  console.log('request.body', request.body);
  config_server.DeviceName = request.body.devicename;
  response.redirect(302, '/reload.html');
});

app.get('/info.html', function(request, response){
  response.sendFile(__dirname + '/src/info.html');
});

app.get('/reload.html', function(request, response){
  response.sendFile(__dirname + '/src/reload.html');
});

app.get('/admin/generalvalues', function(request, response){
  response.send('devicename|' + config_server.DeviceName + '|input');
});

app.get('/admin/connectionstate', function(request, response){
  response.send('connectionstate|Connected|div\nnetworks|Found 10 Networks<br><table border="0" cellspacing="0" cellpadding="3" class=""><tr bgcolor=\'#DDDDDD\'><td><strong>Name</strong></td><td><strong>Quality</strong></td><td><strong>Enc</strong></td><tr><tr><td><a href=\'javascript:setssid("Rtone Cisco")\'>Rtone Cisco</a></td><td>100%</td><td>*</td></tr><tr><td><a href=\'javascript:setssid("Rtone Cisco")\'>Rtone Cisco</a></td><td>72%</td><td>*</td></tr><tr><td><a href=\'javascript:setssid("HP-Print-3E-Officejet Pro X476dw")\'>HP-Print-3E-Officejet Pro X476dw</a></td><td>34%</td><td>*</td></tr><tr><td><a href=\'javascript:setssid("FreeWifi_secure")\'>FreeWifi_secure</a></td><td>16%</td><td>*</td></tr><tr><td><a href=\'javascript:setssid("FreeWifi")\'>FreeWifi</a></td><td>18%</td><td> </td></tr><tr><td><a href=\'javascript:setssid("FreeWifi_secure")\'>FreeWifi_secure</a></td><td>18%</td><td>*</td></tr><tr><td><a href=\'javascript:setssid("m2o")\'>m2o</a></td><td>20%</td><td>*</td></tr><tr><td><a href=\'javascript:setssid("FreeWifi")\'>FreeWifi</a></td><td>16%</td><td> </td></tr><tr><td><a href=\'javascript:setssid("Maison")\'>Maison</a></td><td>30%</td><td>*</td></tr><tr><td><a href=\'javascript:setssid("FreeWifi_secure")\'>FreeWifi_secure</a></td><td>24%</td><td>*</td></tr></table>|div');
});

app.get('/admin/values', function(request, response){
  response.send('ssid|rtone|input\npassword|0478477078rto|input\ndhcp|True|chk\nip_0|192|input\nip_1|168|input\nip_2|1|input\nip_3|215|input\nnm_0|255|input\nnm_1|255|input\nnm_2|0|input\nnm_3|0|input\ngw_0|156|input\ngw_1|156|input\ngw_2|144|input\ngw_3|144|input\n');
});

app.get('/admin/infovalues', function(request, response){
  response.send('x_ssid|rtone|div\nx_ip|192.168.1.211|div\nx_netmask|255.255.255.0|div\nx_gateway|255.255.255.0|div\nx_mac|01:00:0C:CC:CC:CC|div');
});

app.listen(8080);
