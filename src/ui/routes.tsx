import * as React from 'react';
import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router'
import App from './app'
import store from '../store';
import { utils } from '../utils';

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


// const App = React.createClass({
//   render() {
//     return (
//         <div>
//           <h1>Users </h1>
//           <div className='master'>
//             <ul>
//               {/* use Link to route around the app */}
//             </ul>
//           </div>
//           <div className='detail'>
//             {this.props.children}
//           </div>
//         </div>
//     )
//   }
// })

// <App state={store.getState()} dispatch={store.dispatch}/>
export default (
    <Route path='/' component={utils.tsReturnTypeFix(App)}>
      <IndexRoute component='INDEX'/>
      <Redirect from='*.*' to='/' />
      <Route path='/:login/:name'
             component={'loginName'} />
      <Route path='/login'
             component='login' />
      <Route path='*' component='noFound'/>
    </Route>
)
