export module utils {
  export function debounce(fn: Function, wait: number): (...args: Array<any>) => any {
    let timeout;
    return (...args) => {
      let later = () => {
        timeout = null;
        fn.apply(null, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  export function encodeJsonData(object) {
    let result;
    try {
      result = JSON.stringify(object);
    } catch (error) {
      result = '';
    }
    return result;
  }

  export function decodeJsonData(data: string): Object {
    let result;
    try {
      result = JSON.parse(data);
    } catch (error) {
      result = null;
    }
    return result;
  }
}
