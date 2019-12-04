import axios from 'axios';
import {
  FETCH_RENTALS_BY_ID_SUCCESS,
  FETCH_RENTALS_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_INIT,
  FETCH_RENTALS_FAIL,
  FETCH_USER_BOOKINGS_INIT,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from './types';
import authService from '../services/auth-service';
import axiosService from '../services/axios-service';


const axiosInstance = axiosService.getInstance();


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


const fetchRentalsInit = () => {
  return {
    type: FETCH_RENTALS_INIT
  }
}


const fetchRentalsFail = (errors) => {
  return {
    type: FETCH_RENTALS_FAIL,
    errors
  }
}


export const fetchRentals = (city) => {
  const url = city ? `/rentals?city=${city}` : '/rentals';
  return (dispatch) => {

    dispatch(fetchRentalsInit());

    axiosInstance.get(`http://localhost:3001/api/v1${url}`)
    .then((rentals) => {
      dispatch(fetchRentalsSuccess(rentals.data));
    })
    .catch(({response}) => {
      dispatch(fetchRentalsFail(response.data.errors))
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


export const createRental = (rentalData) => {
  return axiosInstance.post(`http://localhost:3001/api/v1/rentals`, rentalData).then(
    (res) => {
      return res.data;
    },
    (err) => {
      return Promise.reject(err.response.data.errors);
    }
  );
}

//---------------------------------------USER BOOKING ACTIONS-------------------------------------------//

const fetchUserBookingsInit = () => {
  return {
    type: FETCH_USER_BOOKINGS_INIT
  }
}

const fetchUserBookingsSuccess = (userBookings) => {
  return {
    type: FETCH_USER_BOOKINGS_SUCCESS,
    userBookings
  }
}

const fetchUserBookingsFail = (errors) => {
  return {
    type: FETCH_USER_BOOKINGS_FAIL,
    errors
  }
}


export const fetchUserBookings = () => {
  return dispatch => {
    dispatch(fetchUserBookingsInit());

    axiosInstance.get(`http://localhost:3001/api/v1/bookings/manage`)
    .then((userBookings) => {
      dispatch(fetchUserBookingsSuccess(userBookings.data));
    })
    .catch(({response}) => {
      dispatch(fetchUserBookingsFail(response.data.errors))
    });
  }
}


//-------------------------------------------AUTH ACTIONS-----------------------------------------------//


export const register = (userData) => {
  return axios.post(`http://localhost:3001/api/v1/users/register`, userData).then(
    (res) => {
      return res.data;
    },
    (err) => {
      return Promise.reject(err.response.data.errors);
    }
  );
}



export const getUserRentals = () => {
  return axiosInstance.get(`http://localhost:3001/api/v1/rentals/manage`).then(
    (res) => {
      return res.data;
    },
    (err) => {
      return Promise.reject(err.response.data.errors);
    }
  );
}


export const deleteRental = (rentalId) => {
  return axiosInstance.delete(`http://localhost:3001/api/v1/rentals/${rentalId}`).then(
    (res) => {
      return res.data
    },
    (err) => {
      return Promise.reject(err.response.data.errors);
    }
  );
}



const loginSuccess = () => {
  const username = authService.getUsername();
  return {
    type: LOGIN_SUCCESS,
    username
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
    return axios.post(`http://localhost:3001/api/v1/users/auth`, userData)
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


export const createBooking = (booking) => {
  return axiosInstance.post(`http://localhost:3001/api/v1/bookings`, booking)
  .then(res => res.data)
  .catch(({response}) => Promise.reject(response.data.errors))
}
