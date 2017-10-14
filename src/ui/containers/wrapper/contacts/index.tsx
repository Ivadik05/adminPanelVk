import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { connect } from 'react-redux';
import { Container } from '../../../components/container';
import { Markup } from '../../../components/markup';
import { actionCreators } from '../../../action-creators';
import * as Helmet from 'react-helmet';
let styles = require('./style.css');

export interface IProps extends React.Props<Contacts> {
  contacts: any;
  dispatch: IDispatch<{}>;
}

class Contacts extends React.Component<IProps, {}> {
  public render() {
    return (
        <div className={styles.contacts}>
          <Helmet
              title='Контакты'
          />
          <Container>
            <Markup
                str={this.props.contacts.contentText} />
          </Container>
        </div>
    );
  }
}


const mapStateToProps = state => ({
  contacts: state.contacts
});

export default connect(mapStateToProps)(Contacts);
