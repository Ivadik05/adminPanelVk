declare var __DEV__: boolean;

declare namespace reactGA {
  function initialize(gaTrackingID?: any, options?: Object);
  function pageview(path: string);
}

declare module 'react-ga' {
  export = reactGA;
}
