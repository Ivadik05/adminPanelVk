import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { Container } from '../../../components/container';
import { Markup } from '../../../components/markup';
import { connect } from 'react-redux';
import { actionCreators } from '../../../action-creators';
import { aboutType } from '../../../reducers/about';
import * as Helmet from 'react-helmet';
let styles = require('./style.css');

export interface IProps extends React.Props<About> {
  about: aboutType;
  dispatch: IDispatch<{}>;
}

class About extends React.Component<IProps, {}> {
  public render() {
    let text = this.props.about.contentText;
    return (
        <div className={styles.about}>
          <Helmet
              title='О нас'
          />
          <Container>
            <Markup
                str={text} />
          </Container>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  about: state.about
});

export default connect(mapStateToProps)(About);
