import { WebRequest } from './request/web-request';


export class Io {
  private webRequest: WebRequest = null;

  constructor() {
    this.webRequest = new WebRequest('/connect.php');
    this.webRequest.setData({
      query: 'get.market'
    });
    this.webRequest.send();
  }

  /**
   * @inheritDoc
   */
  public send(req) {

  }
}

// Load = function () {
//   window['CallbackRegistry'] = {};
// };
//
// Load.prototype.createRequest = function(url, onSuccess, onError) {
//   var scriptOk = false; // флаг, что вызов прошел успешно
//   var callbackName = 'cb' + String(Math.random()).slice(-6);
//   var script = document.createElement('script');
//
//   url += ~url.indexOf('?') ? '&' : '?';
//   url += 'callback=CallbackRegistry.' + callbackName;
//
//   CallbackRegistry[callbackName] = function(data) {
//     scriptOk = true;
//     delete CallbackRegistry[callbackName];
//     script.remove();
//     onSuccess(data.response);
//   };
//
//   function checkCallback() {
//     if (scriptOk) return;
//     delete CallbackRegistry[callbackName];
//     onError(url);
//   }
//
//   script.onreadystatechange = function() {
//     if (this.readyState == 'complete' || this.readyState == 'loaded') {
//       this.onreadystatechange = null;
//       setTimeout(checkCallback, 0); // Вызвать checkCallback - после скрипта
//     }
//   };
//
//   script.onload = script.onerror = checkCallback;
//   script.src = url;
//
//   document.getElementsByTagName('head')[0].appendChild(script);
// };
