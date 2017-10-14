import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { connect } from 'react-redux';
let styles = require('./style.css');

export interface IProps extends React.Props<Main> {
  main: any;
  dispatch: IDispatch<{}>;
}

class Main extends React.Component<IProps, {}> {
  public render() {
    return (
        <div className={styles.main}></div>
    );
  }
}

const mapStateToProps = state => ({
  main: state.main
});

export default connect(mapStateToProps)(Main);
