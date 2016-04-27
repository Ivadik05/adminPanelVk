import * as React from 'react';
let styles = require('./style.css');

interface IProps extends React.Props<Mobile> {
  children?: any;
  visible?: boolean;
}

interface IState {
  isMobile?: boolean;
}

export default class Mobile extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false
    };
  }

  public getBrowser(navigator) {
    let Browser = function () {
      this.isAndroid = function() {
        return Boolean(navigator.userAgent.match(/Android/i));
      };
      this.isBlackBerry = function() {
        return Boolean(navigator.userAgent.match(/BlackBerry/i));
      };
      this.isIOS = function() {
        return Boolean(navigator.userAgent.match(/iPhone|iPad|iPod/i));
      };
      this.isOpera = function() {
        return Boolean(navigator.userAgent.match(/Opera Mini/i));
      };
      this.isIe = function() {
        return Boolean(navigator.userAgent.match(/IEMobile/i));
      };
      this.isMobile = function() {
        return (this.isAndroid() ||
        this.isBlackBerry() ||
        this.isIOS() ||
        this.isOpera() ||
        this.isIe());
      };
    };
    return new Browser();
  }

  public componentDidMount() {
    let browser = this.getBrowser(navigator);
    if (browser.isMobile()) {
      this.setState({
        isMobile: true
      });
    }
  }

  public render() {
    let isVisible = this.props.visible === false ? false : true;
    let { isMobile } = this.state;
    console.error(isVisible);
    console.error(isMobile);
    console.error(this.props.children);
    return (
        ((isVisible && isMobile) ||
        (!isVisible && !isMobile)) ? this.props.children : null
    );
  }
};

