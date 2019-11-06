import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import { Cacher } from '../../services/cacher';


function MapComponent(props) {

    const {coordinates, isError, isLocationLoaded} = props;

    return (
        <GoogleMap
            defaultZoom={17}
            defaultCenter={coordinates}
            center={coordinates}
            options={{disableDefaultUI: isError ? true : false}}
        >
            {isLocationLoaded && !isError && <Marker
                position={coordinates}
            />}
            {isLocationLoaded && isError && <InfoWindow position={coordinates}>
                <div>
                    Oops, there is a problem to find location on map, we are trying to resolve th problem 
                    as fast as possible.
                </div>
            </InfoWindow>}
        </GoogleMap>
    );
}


function withGeoCode(WrappedComponent) {
    return class extends React.Component {

        constructor() {
            super();
            this.Cacher = new Cacher();
            this.state = {
                coordinates: {
                    lat: 0,
                    lng: 0
                },
                isError: false,
                isLocationLoaded: false
            };
        }

        componentWillMount() {
            this.getGeoCodedLocation()
        }

        updateCoordinates(coordinates) {
            this.setState({
                coordinates: coordinates,
                isLocationLoaded: true
            });
        }

        geocodeLocation(location) {
            const geocoder = new window.google.maps.Geocoder();

            return new Promise((resolve, reject) => {
                geocoder.geocode({ address: location }, (result, status) => {
                    if (status === 'OK') {
                        const geometry = result[0].geometry.location;
                        const coordinates = { lat: geometry.lat(), lng: geometry.lng() };

                        this.Cacher.cacheValue(location, coordinates);

                        resolve(coordinates);
                    } else {
                        reject('ERROR !!!');
                    }
                });
            });
        }

        getGeoCodedLocation() {
            const location = this.props.location;

            // if location is cached return cached value
            if (this.Cacher.isValueCached(location)) {
                this.updateCoordinates(this.Cacher.getCachedValue(location));
            // else geocode location    
            } else {
                this.geocodeLocation(location).then(
                    (coordinates) => {
                        this.updateCoordinates(coordinates);
                    },
                    (error) => {
                        this.setState({
                            isError: true,
                            isLocationLoaded: true
                        });
                    }
                );
            }
        }

        render() {
            return (
                <WrappedComponent {...this.state} />
            )
        }
    }
}


export const MapWithGeocode = withScriptjs(withGoogleMap(withGeoCode(MapComponent)));