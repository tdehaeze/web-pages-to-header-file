function microAjax(url, callbackFunction)
{

  this.bindFunction = function (caller, object) {
    return function() {
      return caller.apply(object, [object]);
    };
  };

  this.stateChange = function (object) {
    if (this.request.readyState==4) {
      this.callbackFunction(this.request.responseText);
    }
  };

  this.getRequest = function() {
    if (window.ActiveXObject) {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } else if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    } else {
      return false;
    }
  };

  this.postBody = (arguments[2] || '');

  this.callbackFunction = callbackFunction;
  this.url = url;
  this.request = this.getRequest();

  if(this.request) {
    var req = this.request;
    req.onreadystatechange = this.bindFunction(this.stateChange, this);

    if (this.postBody !== '') {
      req.open('POST', url, true);
      req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      req.setRequestHeader('Connection', 'close');
    } else {
      req.open('GET', url, true);
    }

    req.send(this.postBody);
  }
}


function setValues(url) {
  microAjax(url, function(res) {
    res.split(String.fromCharCode(10)).forEach(function(entry) {
      fields = entry.split('|');
      if(fields[2] === 'input') {
        document.getElementById(fields[0]).value = fields[1];
      } else if(fields[2] === 'div') {
        document.getElementById(fields[0]).innerHTML = fields[1];
      } else if(fields[2] === 'chk') {
        document.getElementById(fields[0]).checked = fields[1];
      }
    });
  });
}
