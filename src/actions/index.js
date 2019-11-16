import axios from 'axios';
import {
  FETCH_RENTALS_BY_ID_SUCCESS,
  FETCH_RENTALS_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from './types';
import authService from '../services/auth-service';


const fetchRentalsbyIdInit = () => {
  return {
    type: FETCH_RENTALS_BY_ID_INIT
  }
}


const fetchRentalsbyIdSuccess = (rental) => {
  return {
    type: FETCH_RENTALS_BY_ID_SUCCESS,
    rental
  }
}



const fetchRentalsSuccess = (rentals) => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals: rentals
  }
}


export const fetchRentals = () => {
  return (dispatch) => {
    axios.get('http://localhost:3001/api/v1/rentals').then((rentals) => {
      dispatch(fetchRentalsSuccess(rentals.data));
    });
  }
}


export const fetchRentalsbyId = (rentalId) => {
  return function (dispatch) {
    dispatch(fetchRentalsbyIdInit());
    axios.get(`http://localhost:3001/api/v1/rentals/${rentalId}`).then((rental) => {
      dispatch(fetchRentalsbyIdSuccess(rental.data));
    });
  }
}


//-------------------------------------------AUTH ACTIONS-----------------------------------------------//


export const register = (userData) => {
  return axios.post(`http://localhost:3001/api/v1/users/register`, {...userData}).then(
    (res) => {
      return res.data;
    },
    (err) => {
      return Promise.reject(err.response.data.errors);
    }
  );
}


const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors
  }
}


export const checkAuthState = () => {
  return dispatch => {
    if (authService.isAuthenticated()) {
      dispatch(loginSuccess());
    }
  }
}


export const login = (userData) => {
  return dispatch => {
    return axios.post(`http://localhost:3001/api/v1/users/auth`, {...userData})
    .then(res => res.data)
    .then(token => {
      localStorage.setItem('auth_token', token);
      dispatch(loginSuccess());
    })
    .catch((error) => {
      dispatch(loginFailure(error.response.data.errors));
    });
  }
}


export const logout = () => {
  authService.invalidateUser(); 
  return {
    type: LOGOUT
  }
}
