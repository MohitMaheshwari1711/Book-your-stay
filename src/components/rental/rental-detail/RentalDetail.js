import React from 'react';
import { connect } from 'react-redux';
import { RentalDetailInfo } from './RentalDetailInfo';
import { RentalMap } from './RentalMap';
import Booking from '../../../components/booking/Booking';

import * as actions from '../../../actions/index';

class RentailDetail extends React.Component {


    componentDidMount() {
        const rentalId = this.props.match.params._id;
        this.props.dispatch(actions.fetchRentalsbyId(rentalId));
    }

    // componentWillMount() {
    //     const rentalId = this.props.match.params._id;
    //     this.props.dispatch(actions.fetchRentalsbyId(rentalId));
    // }

    render() {

        const rental = this.props.rental;

        if (rental._id) {
            return (
                <section id='rentalDetails'>
                    <div className='upper-section'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <img src={rental.image} height='360px' alt=''></img>
                            </div>
                            <div className='col-md-6'>
                               <RentalMap location={`${rental.city}, ${rental.street}`}/>
                            </div>
                        </div>
                    </div>

                    <div className='details-section'>
                        <div className='row'>
                            <div className='col-md-8'>
                                <RentalDetailInfo rental={rental} />
                            </div>
                            <div className='col-md-4'>
                                <Booking rental={rental}/>
                            </div>
                        </div>
                    </div>
                </section>

            )
        } else {
            return (
                    <h1>Loading...</h1>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        rental: state.rental.data
    }
}

export default connect(mapStateToProps)(RentailDetail)