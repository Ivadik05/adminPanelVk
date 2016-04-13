import * as React from 'react';
import store from '../../../../store';
import { actionCreators } from '../../../action-creators';

export interface IProps extends React.Props<Contacts> {

}

export default class Contacts extends React.Component<IProps, void> {
  public render() {
    let state = store.getState();
    let dispatch = store.dispatch;
    return (
        <div>
          КОНТАКТЫ
        </div>
    );
  }
};
