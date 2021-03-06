#ifndef HTMLPAGES_H_INCLUDED
#define HTMLPAGES_H_INCLUDED

const char PAGE_CONFIG[] = R"=====(
<meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link rel="stylesheet" href="style.css" type="text/css"><script src="script.js"></script><div class="header"><a href="./" class="btn btn-s btn-back">&lt;</a><div class="title">Network Configuration</div></div><hr><div class="subtitle">Connect to Router with these settings:</div><table border="0" cellspacing="0" cellpadding="3"><tr><td align="right">SSID:</td><td><input type="text" id="ssid" name="ssid" value=""></td></tr><tr><td align="right">Password:</td><td><input type="password" id="password" name="password" value=""></td></tr></table><br><a href="javascript:sendForm()" class="btn btn-s btn-blue btn-full">Save</a><hr><div class="subtitle">Connection State:</div><div id="connectionstate">Loading...</div><a href="javascript:getConnectionState()" class="btn btn-s btn-blue btn-full">Refresh</a><hr><div class="subtitle">Networks:</div><table border="0" cellspacing="3"><tr><td><div id="networks">Scanning...</div></td></tr></table><br><a href="javascript:getNetworks()" class="btn btn-s btn-blue btn-full">Refresh</a><script>function sendForm(){document.getElementById("connectionstate").innerHTML="Connection...",setValues("/post/connection/form?ssid="+document.getElementById("ssid").value+"&password="+document.getElementById("password").value),setTimeout(getConnectionState,1500)}function getNetworks(){setValues("/get/networks")}function getConnectionState(){setValues("/get/connection/state")}function setssid(e){document.getElementById("ssid").value=e}window.onload=function(){getConnectionState(),setTimeout(getNetworks,1e3)}</script>
)=====";

const char PAGE_GENERAL[] = R"=====(
<meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link rel="stylesheet" href="style.css" type="text/css"><script src="script.js"></script><div class="header"><a href="./" class="btn btn-s btn-back">&lt;</a><div class="title">General Settings</div></div><hr>Name of Device : <input type="text" name="devicename" value="" id="devicename" class="big-input" disabled="disabled"><script>window.onload=function(){setValues("/get/devicename")}</script>
)=====";

const char PAGE_INDEX[] = R"=====(
<meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link rel="stylesheet" href="style.css" type="text/css"><div class="header"><div class="title">Administration</div></div><hr><a href="general.html" class="btn btn-blue">General Configuration</a><br><a href="config.html" class="btn btn-blue">Network Configuration</a><br><a href="info.html" class="btn btn-blue">Network Information</a><br><a href="value.html" class="btn btn-blue">Pin Voltage</a><br>
)=====";

const char PAGE_INFO[] = R"=====(
<meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link rel="stylesheet" href="style.css" type="text/css"><script src="script.js"></script><div class="header"><a href="./" class="btn btn-s btn-back">&lt;</a><div class="title">Network Information</div></div><hr><table border="0" cellspacing="0" cellpadding="3"><tr><td align="right">SSID :</td><td><span id="x_ssid"></span></td></tr><tr><td align="right">IP :</td><td><span id="x_ip"></span></td></tr><tr><td align="right">Netmask :</td><td><span id="x_netmask"></span></td></tr><tr><td align="right">Gateway :</td><td><span id="x_gateway"></span></td></tr><tr><td align="right">Mac :</td><td><span id="x_mac"></span></td></tr></table><br><a href="javascript:getInformations()" class="btn btn-s btn-blue btn-full">Refresh</a><script>function getInformations(){setValues("/get/connection/info")}window.onload=function(){getInformations()}</script>
)=====";

const char PAGE_RELOAD[] = R"=====(
<meta http-equiv="refresh" content="5; URL=/"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link rel="stylesheet" href="style.css" type="text/css">Please Wait....Configuring and Restarting.
)=====";

const char PAGE_VALUE[] = R"=====(
<meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link rel="stylesheet" href="style.css" type="text/css"><script src="script.js"></script><div class="header"><a href="./" class="btn btn-s btn-back">&lt;</a><div class="title">Pin voltage</div></div><hr><div class="subtitle">Pin Voltage: <span id="value">0</span>V</div><script>function getPinValue(){setValues("/get/pin/value")}window.onload=function(){setInterval(getPinValue,1e3)}</script>
)=====";

const char PAGE_SCRIPT[] = R"=====(
function microAjax(e,t){if(this.bindFunction=function(e,t){return function(){return e.apply(t,[t])}},this.stateChange=function(e){4==this.request.readyState&&this.callbackFunction(this.request.responseText)},this.getRequest=function(){return window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):!!window.XMLHttpRequest&&new XMLHttpRequest},this.postBody=arguments[2]||"",this.callbackFunction=t,this.url=e,this.request=this.getRequest(),this.request){var n=this.request;n.onreadystatechange=this.bindFunction(this.stateChange,this),""!==this.postBody?(n.open("POST",e,!0),n.setRequestHeader("X-Requested-With","XMLHttpRequest"),n.setRequestHeader("Content-type","application/x-www-form-urlencoded"),n.setRequestHeader("Connection","close")):n.open("GET",e,!0),n.send(this.postBody)}}function setValues(e){microAjax(e,function(e){e.split(String.fromCharCode(10)).forEach(function(e){fields=e.split("|"),"input"===fields[2]?document.getElementById(fields[0]).value=fields[1]:"div"===fields[2]?document.getElementById(fields[0]).innerHTML=fields[1]:"chk"===fields[2]&&(document.getElementById(fields[0]).checked=fields[1])})})}
)=====";

const char PAGE_STYLE[] = R"=====(
.btn,body{letter-spacing:.15em}body{color:#000;font-family:avenir,helvetica,arial,sans-serif;font-size:1em}hr{background-color:#eee;border:0;color:#eee;height:1px}.header{height:40px}.header>.title{text-align:center;font-size:1.5em;line-height:40px}.header>.btn.btn-back{background:#e6e6e6;position:absolute;height:10px;width:18px;line-height:10px;display:block}table{width:100%}table td:not(:first-child){width:50%;min-width:50%}table td:first-child{max-width:50%}.subtitle{font-size:1em;font-weight:700}.btn{display:block;box-sizing:initial;border:1px solid #000;border-radius:.3em;text-align:center;margin-bottom:.5em;padding:1em .75em;text-decoration:none;text-transform:uppercase}.btn.btn-full,input.big-input{width:90%;margin:auto}.btn.btn-s{font-size:.8em}.btn.btn-m{font-size:1.2em}.btn.btn-blue{color:#fff;background-color:#0074D9}input{border:1px solid #000;border-radius:.3em}input.big-input{font-size:1.5em;display:block}
)=====";

#endif /* HTMLPAGES_H_INCLUDED */
