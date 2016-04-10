import storeDev from './store-dev';
let store;
export default store = (function() {
    if (process.env.NODE_ENV === 'production') {
        return storeDev();
    } else {
        return storeDev();
    }
})();