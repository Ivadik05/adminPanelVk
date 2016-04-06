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
