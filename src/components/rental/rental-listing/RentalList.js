import React from 'react';
import { RentalCard } from './RentalCard';
import { connect } from 'react-redux';

import * as actions from '../../../actions/index';

class RentalList extends React.Component {


    renderRentals() {
        return this.props.rentals.map((rental, index) => {
            return (
                <RentalCard key={index} colNum="col-md-3 col-xs-6" rental={rental}/>
            )
        })
    }

    componentDidMount() {
        this.props.dispatch(actions.fetchRentals());
    }

    // componentWillMount() {
    //     this.props.dispatch(actions.fetchRentals());
    // }


    render() {
        return (
            <section id='rentalListing'>
                <h1 className='page-title'>Your Home All Around the World</h1>
                <div className='row'>
                   {this.renderRentals()} 
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        rentals: state.rentals.data
    }
}

export default connect(mapStateToProps)(RentalList)