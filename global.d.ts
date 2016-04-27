declare var __DEV__: boolean;

declare namespace reactGA {
  function initialize(gaTrackingID?: any, options?: Object);
  function pageview(path: string);
}

declare module 'react-ga' {
  export = reactGA;
}

declare namespace ReactHelmet {
  import React = __React;

  interface HelmetProps {
    title?: string;
    titleTemplate?: string;
    base?: any;
    link?: Array<any>;
    meta?: Array<any>;
    script?: Array<any>;
    onChangeClientState?: (newState: any) => void;
    defaultTitle?: string;
    htmlAttributes?: Object;
  }

  interface HelmetData {
    title: HelmetDatum;
    base: HelmetDatum;
    link: HelmetDatum;
    meta: HelmetDatum;
    script: HelmetDatum;
  }

  interface HelmetDatum {
    toString(): string;
    toComponent(): React.Component<any, any>;
  }

  class HelmetComponent extends React.Component<HelmetProps, any> {}
}

declare module "react-helmet" {
  var Helmet: {
    (): ReactHelmet.HelmetComponent
    rewind(): ReactHelmet.HelmetData
  }

  export = Helmet;
}
