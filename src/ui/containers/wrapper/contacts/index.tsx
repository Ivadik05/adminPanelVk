import * as React from 'react';
import { Container } from '../../../components/container';
import { actionCreators } from '../../../action-creators';
let styles = require('./style.css');

export interface IProps extends React.Props<Contacts> {

}

export default class Contacts extends React.Component<IProps, void> {
  public render() {
    return (
        <div className={styles.contacts}>
          <Container>
            КОНТАКТЫ
          </Container>
        </div>
    );
  }
};
