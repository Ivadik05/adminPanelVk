import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { Container } from '../../../components/container';
import { Markup } from '../../../components/markup';
import { connect } from 'react-redux';
import { actionCreators } from '../../../action-creators';
import { aboutType } from '../../../reducers/about';
let styles = require('./style.css');

export interface IProps extends React.Props<About> {
  about: aboutType;
  dispatch: IDispatch;
}

class About extends React.Component<IProps, {}> {
  public render() {
    let replaceText = this.props.about.contentText.replace(/&#62;/gi,'>').replace(/&#60;/gi,'<');
    return (
        <div className={styles.about}>
          <Container>
            <Markup
                str={replaceText
                // .replace(/<br\s*[\/]?>/gi, '\n')
                } />
          </Container>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  about: state.about
});

export default connect(mapStateToProps)(About);
