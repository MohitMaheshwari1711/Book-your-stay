import axios from 'axios';
import {
  FETCH_RENTALS_BY_ID_SUCCESS,
  FETCH_RENTALS_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS
} from './types';


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

