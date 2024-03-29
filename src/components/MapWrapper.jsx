/* eslint-disable no-undef */

import React, {Component} from 'react';
import {withGoogleMap, GoogleMap, InfoWindow, Marker} from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import {baseURL} from "../helpers/url";

Geocode.setApiKey(baseURL.mapApiKey);

class Map extends Component {

    constructor(props) {
        super(props);
        this.country = null;
        this.address = null;
        this.state = {
            address: '',
            city: '',
            area: '',
            state: '',
            countryCode: '',
            short_address: '',
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            place_uid: null
        };
    }

    /**
     * Get the current address from the default map position and set those values in the state
     */
    componentDidMount() {

        Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    placeID = response.results[0].place_id,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray),
                    country = this.getCountry(addressArray)['short_name'],
                    short_address = [city, state, this.getCountry(addressArray)['long_name']].filter(x => x !== undefined && x !== null).toString();

                this.setState({
                    address: (address) ? `${address} ` : '',
                    area: (area) ? `${area} ` : '',
                    city: (city) ? `${city} ` : '',
                    state: (state) ? `${state} ` : '',
                    country: (country) ? `${country} ` : '',
                    short_address: (short_address) ? `${short_address} ` : '',
                    markerPosition: {
                        lat: this.state.mapPosition.lat,
                        lng: this.state.mapPosition.lng
                    },
                    mapPosition: {
                        lat: this.state.mapPosition.lat,
                        lng: this.state.mapPosition.lng
                    },
                    place_uid: placeID
                })
                this.country = country;
                this.address = short_address;
                if (response) {
                    this.props.handleState(false, [this.country, this.address,]);
                }
            },
            error => {
                console.error(error);
            }
        );
    };

    handleChangeLatLng(newLat, newLng) {
        newLat = Number(newLat);
        newLng = Number(newLng);
        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    placeID = response.results[0].place_id,
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray),
                    country = this.getCountry(addressArray)['short_name'],
                    short_address = [city, state, this.getCountry(addressArray)['long_name']].filter(x => x !== undefined && x !== null).toString();

                this.setState({
                    address: (address) ? `${address} ` : '',
                    area: (area) ? `${area} ` : '',
                    city: (city) ? `${city} ` : '',
                    state: (state) ? `${state} ` : '',
                    country: (country) ? `${country} ` : '',
                    short_address: (short_address) ? `${short_address} ` : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    place_uid: placeID
                }, () => this.props.handleState(true, this.state))
            },
            error => {
                console.error(error);
            }
        );
    };

    /**
     * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
     *
     * @param nextProps
     * @param nextState
     * @return {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {

        if (
            this.state.markerPosition.lat !== this.props.center.lat ||
            this.state.address !== nextState.address ||
            this.state.city !== nextState.city ||
            this.state.area !== nextState.area ||
            this.state.state !== nextState.state
        ) {

            return true
        } else if (this.props.center.lat === nextProps.center.lat) {

            return false;
        }

        return true;
    }

    /**
     * Get the city and set the city input value to the one selected
     *
     * @param addressArray
     * @return {string}
     */
    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };
    getCountry = (addressArray) => {
        let country = [];
        country['long_name'] = '';
        country['short_name'] = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'country' === addressArray[i].types[0]) {
                    country['long_name'] = addressArray[i].long_name;
                    country['short_name'] = (addressArray[i].short_name) ? addressArray[i].short_name : '';
                    return country;
                }
            }
        }
    };
    /**
     * Get the area and set the area input value to the one selected
     *
     * @param addressArray
     * @return {string}
     */
    getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };
    /**
     * Get the address and set the address input value to the one selected
     *
     * @param addressArray
     * @return {string}
     */
    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };
    /**
     * And function for city,state and address input
     * @param event
     */
    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
    /**
     * This Event triggers when the marker window is closed
     *
     * @param event
     */
    onInfoWindowClose = (event) => {

    };

    /**
     * When the marker is dragged you get the lat and long using the functions available from event object.
     * Use geocode to get the address, city, area and state from the lat and lng positions.
     * And then set those values in the state.
     *
     * @param event
     */
    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    placeID = response.results[0].place_id,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray),
                    country = this.getCountry(addressArray)['short_name'],
                    short_address = [city, state, this.getCountry(addressArray)['long_name']].filter(x => x !== undefined && x !== null).toString();

                this.setState({
                    address: (address) ? `${address} ` : '',
                    area: (area) ? `${area} ` : '',
                    city: (city) ? `${city} ` : '',
                    state: (state) ? `${state} ` : '',
                    country: (country) ? `${country} ` : '',
                    short_address: (short_address) ? `${short_address} ` : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    place_uid: placeID
                }, () => this.props.handleState(true, this.state));
            },
            error => {
                console.error(error);
            }
        );
    };

    /**
     * When the user types an address in the search box
     * @param place
     */
    onPlaceSelected = (place) => {
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray),
            country = this.getCountry(addressArray)['short_name'],
            short_address = [city, state, this.getCountry(addressArray)['long_name']].filter(x => x !== undefined && x !== null).toString(),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();


        this.setState({
            address: (address) ? `${address} ` : '',
            area: (area) ? `${area} ` : '',
            city: (city) ? `${city} ` : '',
            state: (state) ? `${state} ` : '',
            country: (country) ? `${country} ` : '',
            short_address: (short_address) ? `${short_address} ` : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
            place_uid: place.place_id
        }, () => this.props.handleState(true, this.state));
    };

    render() {
        const AsyncMap =
            withGoogleMap(
                props => (
                    <>
                        <GoogleMap google={this.props.google}
                                   defaultZoom={this.props.zoom}
                                   defaultCenter={{lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng}}
                                   defaultOptions={{
                                       disableDefaultUI: true,
                                   }}
                        >
                            <Marker google={this.props.google}
                                    name={'Dolores park'}
                                    draggable={true}
                                    onDragEnd={this.onMarkerDragEnd}
                                    position={{lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng}}
                            />
                            <Marker/>
                            {/*<h2 className="py-5 mt-5">place id: {this.state.place_uid}</h2>*/}
                            <div className="search-input-container">
                                <Autocomplete
                                    id='searchInput'
                                    style={{
                                        width: '100%',
                                    }}
                                    className={`form-control bg-white ${this.props.searchInputClass}`}
                                    onPlaceSelected={this.onPlaceSelected}
                                    types={['(regions)']}
                                    placeholder="Type address"
                                />
                                <InfoWindow
                                    onClose={this.onInfoWindowClose}
                                    position={{
                                        lat: (this.state.markerPosition.lat + 0.0018),
                                        lng: this.state.markerPosition.lng
                                    }}
                                >
                                    <div>
                                        <span style={{
                                            padding: 0,
                                            margin: 0
                                        }}>{this.state.area}, {this.state.city}, {this.state.country}</span>
                                    </div>
                                </InfoWindow>
                            </div>

                        </GoogleMap>
                    </>
                )
            );
        let map;
        if (this.props.center.lat !== undefined) {
            map = <div>
                <AsyncMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${baseURL.mapApiKey}&libraries=places`}
                    loadingElement={
                        <div style={{height: `100%`}}/>
                    }
                    containerElement={
                        <div style={{height: this.props.height, position: this.props.containerPosition}}/>
                    }
                    mapElement={
                        <div className={this.props.mapContainer}
                             style={{height: `100%`, borderRadius: this.props.mapRadius}}/>
                    }
                />
            </div>
        } else {
            map = <div style={{height: this.props.height}}/>
        }
        return (map)
    }
}

export default Map