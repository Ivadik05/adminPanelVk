export { storageMarks } from './storage-marks';

export class Storage {


  constructor() {

  }
}

// /**
//  * @constructor
//  */
// appStorage = function(storageKey) {
//
//   /**
//    * @type {string}
//    */
//   this.__storageKey = storageKey;
// };
//
//
// /**
//  * @param {!Object} payload
//  */
// appStorage.prototype.saveStorage = function(payload) {
//   localStorage.setItem(this.__storageKey, JSON.stringify(payload));
// };
//
//
// /**
//  * @return {Array}
//  */
// appStorage.prototype.restoreData = function() {
//   var data = localStorage.getItem(this.__storageKey);
//   if (data) {
//     return JSON.parse(data)
//   }
//   return [];
// };
//
//
// /**
//  */
// appStorage.prototype.removeData = function() {
//   localStorage.removeItem(this.__storageKey);
// };
//
//
// /**
//  */
// appStorage.prototype.listenerStorage = function(callback) {
//   var self = this;
//   window.addEventListener('storage', handleStorage, false);
//   function handleStorage(event) {
//     if (event.key === self.__storageKey) {
//       callback(event);
//     }
//   }
// };
