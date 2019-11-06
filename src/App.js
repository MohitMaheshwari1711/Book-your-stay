import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';


import { Provider } from 'react-redux';

import { Header } from './shared/Header';
import RentalList from './components/rental/rental-listing/RentalList';
import RentailDetail from './components/rental/rental-detail/RentalDetail';

const store = require('./reducers').init();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <div className='container'>
              <Route exact path='/' render={() => { return <Redirect to='/rentals' /> }} />
              <Route exact path='/rentals' component={RentalList} />
              <Route exact path='/rentals/:_id' component={RentailDetail} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
