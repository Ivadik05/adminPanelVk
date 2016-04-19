import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { Container } from '../../../components/container';
import { Markdown } from '../../../components/markdown';
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
    console.error(this.props.about);
    return (
        <div className={styles.about}>
          <Container>
            <Markdown
                str={this.props.about.contentText
                .replace(/<br\s*[\/]?>/gi, '\n')
                .replace(/&gt;/gi,'>')
                .replace('/&lt;/gi','<')} />
          </Container>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  about: state.about
});

export default connect(mapStateToProps)(About);
