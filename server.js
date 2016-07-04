var express = require('express');

var app = express();

app.get('/', function(request, response){
  response.sendFile(__dirname + '/src/index.html');
});

app.get('/index.html', function(request, response){
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

app.get('/info.html', function(request, response){
  response.sendFile(__dirname + '/src/info.html');
});

app.get('/admin/generalvalues', function(request, response){
  response.send('devicename|esp8266|input');
});

app.get('/admin/connectionstate', function(request, response){
  response.send('connectionstate|Connected|div');
  // response.send('connectionstate|Disconnected|div');
});

app.get('/admin/values', function(request, response){
  response.send('ssid|rtone|input\npassword|0478477078rto|input\ndhcp|True|chk\nip_0|192|input\nip_1|168|input\nip_2|1|input\nip_3|215|input\nnm_0|255|input\nnm_1|255|input\nnm_2|0|input\nnm_3|0|input\ngw_0|156|input\ngw_1|156|input\ngw_2|144|input\ngw_3|144|input\n');
});

app.get('/admin/infovalues', function(request, response){
  response.send('x_ssid|rtone|div\nx_ip|192.168.1.211|div\nx_netmask|255.255.255.0|div\nx_gateway|255.255.255.0|div\nx_mac|01:00:0C:CC:CC:CC|div');
});

app.listen(8080);
