import * as React from 'react';
let styles = require('./style.css');

export interface IProps extends React.Props<Wrapper> {

}

export default class Wrapper extends React.Component<IProps, void> {

  public refs: {
    [key: string]: (Element);
    loader: (HTMLElement);
  };

  public componentWillMount() {
    console.error('до');
  }

  public componentDidMount() {
    console.error('после');
  }

  public componentWillUpdate() {
    console.error('will update');
    console.error('this.refs.loader', this.refs.loader);
  }

  public componentDidUpdate(nextProps, nextState) {
    console.error('did update');
    console.error('this.props.children', this.props.children);
    console.error('this.props.children', nextProps.children);
    console.error(this.props.children === nextProps.children);
  }

  public render() {
    console.error('render');
    let loaderStyle = {
      position: 'fixed',
      top: '0',
      left: '0',
      height: '10px',
      background: 'tomato',
      width: '10%',
      tra
    };
    return (
        <main className={styles.wrapper}>
          <div ref='loader' style={loaderStyle}></div>
          {this.props.children}
        </main>
    );
  }
};
