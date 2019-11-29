import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';


import { Provider } from 'react-redux';

import Header from './components/shared/Header';
import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalSearchListing from './components/rental/rental-listing/RentalSearchListing';
import RentailDetail from './components/rental/rental-detail/RentalDetail';
import { RentalCreate } from './components/rental/rental-create/RentalCreate';
import Login from './components/login/Login';
import { Register } from './components/register/Register';
import { ProtectedRoutes } from './components/shared/auth/ProtectedRoute';
import { LoggedInRoute } from './components/shared/auth/LoggedinRoute';

import * as actions from './actions/index';

const store = require('./reducers').init();

class App extends Component {

  componentDidMount() {
    this.checkAuthState();
  }

  // componentWillMount() {
  //   store.dispatch(actions.checkAuthState());
  // }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }


  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header logout={this.logout} />
            <div className='container'>
              <Switch>
                <Route exact path='/' render={() => { return <Redirect to='/rentals' /> }} />
                <Route exact path='/rentals' component={RentalListing} />
                <Route exact path='/rentals/:city/homes' component={RentalSearchListing} />
                <ProtectedRoutes exact path='/rentals/new' component={RentalCreate} />
                <ProtectedRoutes exact path='/rentals/:_id' component={RentailDetail} />
                <Route exact path='/login' component={Login} />
                <LoggedInRoute exact path='/register' component={Register} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
