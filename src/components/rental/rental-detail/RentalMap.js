import React from 'react';
// import { key } from '../../../secure';

import { MapWithGeocode } from '../../map/GoogleMap';

export class RentalMap extends React.Component {
    render() {
        const location = this.props.location;
        return (
            <MapWithGeocode
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA0UPMPNimNG9NAoPbQDYEycTMb2-ysnB8&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `360px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                location={location}
            />
        )
    }
}