//ajax
function apiSetting(type, path, success_callBack, fail_callBack) {
  var setting = {
    'url': path,
    'type': type,
    'accept': {
      'json': 'application/json'
    },
    'dataType': 'json',
    complete: function(xhr) {
      if(xhr.status >= 200 && xhr.status < 300 ){
        success_callBack(xhr.responseJSON);
      }
      else{
        console.log(xhr)
        fail_callBack(xhr.responseJSON);
      }
    }
  };
  return setting;
}
function query(method, url, params = {}, success_callback = cb, fail_callback = cb) {
  var setting = apiSetting(method.toUpperCase(), url, success_callback, fail_callback)
  if (params) {
    setting['data'] = params;
  }
  return $.ajax(setting);
}
function get(url, params = {}, success_callback = cb, fail_callback = cb) {
  if(params){
    var p = [];
    for(var i in params){
      p.push(i + '=' + params[i]);
    }
    if(url.indexOf('?') == -1){
      url += '?' + p.join('&');
    }
    else{
      url += '&' + p.join('&');
    }
  }
  return query('GET', url, null, success_callback, fail_callback);
}
function post(url, params = {}, success_callback = cb, fail_callback = cb) {
  return query('POST', url, params, success_callback, fail_callback);
}