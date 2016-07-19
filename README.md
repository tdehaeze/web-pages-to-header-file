# Gulp script to convert html/css/js files to be used into a micro-controller

Checkout the following [project](https://github.com/tdehaeze/esp8266-simple-web-server) where this script is used with an ESP8266 to build a web-server.

## Installation

First you need to have installed the following :
 - [nodejs](https://nodejs.org/en/)
 - [npm](https://www.npmjs.com/)
 - [gulp-cli](http://gulpjs.com/) : `npm install --global gulp-cli`

Then, just use `npm install` in the root of the project to install all the dependancies.

## How to use the web server
The web-server used for testing is based on [expressjs](http://expressjs.com/) on top of [nodejs](https://nodejs.org/).

To listen for a route, you simply have to put inside server.js:


    app.get('/get/devicename', function(request, response){
        response.send('devicename|ESP8266_E8DF4E|input');
    });


Then, the server will listen to `/get/devicename` route and will send back the following content : `devicename|ESP8266_E8DF4E|input`.

To start the web server you can use one of the two command bellow :


    npm start
    node server.js


## How to compile files into htmlpages.h
[Gulp](http://gulpjs.com/) will take all .html / .css / .js files that are into src directory, clean/minify/uglify those files and concatenate them into `htmlpages.h`. To do that, simply run the following command :


    gulp


## How to get data from the html

All html files include `style.css` & `script.js`.

Inside html files, you can call `setValues` function (which is define into `script.js`) with the url of the API you defined on the server. Then it will parse the response and add the desired content to the html elements.



## How to send data to the html
To send data from the web server to the html is simple. To have to send back data with the following architecture :


    id|content|elementtag\n


 - `id` is the id of the element
 - `content` can be plain text or a full html page
 - `elementtag` = div|input|chk
 - `\n` is used to send multiple data at once
