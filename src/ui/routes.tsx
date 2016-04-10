import * as React from 'react';
import { Route } from 'react-router'
// import App from './app'
import store from '../store';

// const history = syncHistory(browserHistory);
// export default class Routes extends React.Component<IProps, void> {
//     public render() {
//       let { store }  = this.props;
//       // <App state={store.getState()} dispatch={store.dispatch}/>
//       return (
//
//       );
//     }
// };
const App = React.createClass({
  render() {
    return (
        <div>
          <h1>Users</h1>
          <div className="master">
            <ul>
              {/* use Link to route around the app */}
            </ul>
          </div>
          <div className="detail">
            {this.props.children}
          </div>
        </div>
    )
  }
})

function feik(app) {
  return app;
}

// <App state={store.getState()} dispatch={store.dispatch}/>
export default (
    <Route path="/" component={App}>
      <Route path="/:login/:name"
             component={'loginName'} />
      <Route path="/:login"
             component={'login'} />
    </Route>
)