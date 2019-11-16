import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';


import { Provider } from 'react-redux';

import { Header } from './components/shared/Header';
import RentalList from './components/rental/rental-listing/RentalList';
import RentailDetail from './components/rental/rental-detail/RentalDetail';
import Login from './components/login/Login';
import { Register } from './components/register/Register';

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
            <Header logout={this.logout}/>
            <div className='container'>
              <Route exact path='/' render={() => { return <Redirect to='/rentals' /> }} />
              <Route exact path='/rentals' component={RentalList} />
              <Route exact path='/rentals/:_id' component={RentailDetail} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
