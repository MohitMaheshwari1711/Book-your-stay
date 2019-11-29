import React from 'react';
import { RentalList } from './RentalList';
import { connect } from 'react-redux';
import { toUpperCase } from '../../../helpers/index';
import * as actions from '../../../actions/index';


class RentalSearchListing extends React.Component {

    constructor() {
        super();

        this.state = {
            searchCity: ''
        };
    }

    componentDidMount() {
        this.searchRentalsByCity();
    }

    componentDidUpdate(prevProps) {
        const currentParam = this.props.match.params.city;
        const prevUrlParam = prevProps.match.params.city;

        if (currentParam !== prevUrlParam) {
            this.searchRentalsByCity();
        }
    }

    searchRentalsByCity() {
        const searchedCity = this.props.match.params.city;
        this.setState({
            searchedCity
        });
        this.props.dispatch(actions.fetchRentals(searchedCity));
    }

    renderTitle() {
        const { errors, data } = this.props.rentals;
        const { searchedCity } = this.state;
        let title = '';

        if (errors.length > 0) {
            title = errors[0].detail;
        } 
        if (data.length > 0) {
            title = `Your home in ${toUpperCase(searchedCity)}`;
        }

        return <h1 className="page-title">{title}</h1>
        
    }

    render() {
        return (
            <section id="rentalListing">
                {this.renderTitle()}
                <RentalList rentals={this.props.rentals.data} />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        rentals: state.rentals
    }
}

export default connect(mapStateToProps)(RentalSearchListing)