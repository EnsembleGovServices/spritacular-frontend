/* eslint-disable no-undef */

import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import { GoogleMapsAPI } from '../config';
import getCity, {getPostalCode, getState , getCountry, getArea} from '../helpers';
Geocode.setApiKey(GoogleMapsAPI);
Geocode.enableDebug();

class Map extends Component{

	constructor( props ){
		super( props );
		this.state = {
			address: '',
			city: '',
			area: '',
			state: '',
			countryCode: '',
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			}
		}
	}
	/**
	 * Get the current address from the default map position and set those values in the state
	 */
	componentDidMount() {
		Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
			response => {
				const address = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components,
				      city = this.getCity( addressArray ),
				      area = this.getArea( addressArray ),
				      state = this.getState( addressArray ),
					  country = this.getCountry(addressArray)['short_name'];

				// console.log( 'city', city, area, state );

				this.setState( {
					address: ( address ) ? address : '',
					area: ( area ) ? area : '',
					city: ( city ) ? city : '',
					state: ( state ) ? state : '',
					country: (country) ? country: '',
				} )
			},
			error => {
				console.error( error );
			}
		);
	};

	handleChangeLatLng(newLat,newLng) {
		console.log("hhihiih");
		newLat = Number(newLat);
		newLng = Number(newLng);
		Geocode.fromLatLng( newLat , newLng ).then(
			response => {
				const address = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components,
				      city = this.getCity( addressArray ),
				      area = this.getArea( addressArray ),
				      state = this.getState( addressArray ),
					  country = this.getCountry(addressArray)['short_name'];
				this.setState( {
					address: ( address ) ? address : '',
					area: ( area ) ? area : '',
					city: ( city ) ? city : '',
					state: ( state ) ? state : '',
					country: (country) ? country : '',
					markerPosition: {
						lat: newLat,
						lng: newLng
					},
					mapPosition: {
						lat: newLat,
						lng: newLng
					},
				} )
				this.props.handleState(this.state);
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
	shouldComponentUpdate( nextProps, nextState ){

		if (
			this.state.markerPosition.lat !== this.props.center.lat ||
			this.state.address !== nextState.address ||
			this.state.city !== nextState.city ||
			this.state.area !== nextState.area ||
			this.state.state !== nextState.state
		) {			

			return true
		}
		 else if ( this.props.center.lat === nextProps.center.lat ){

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
	getCity = ( addressArray ) => {
		let city = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
				city = addressArray[ i ].long_name;
				return city;
			}
		}
	};
	getCountry = ( addressArray ) => {
		let country = [];
		for( let i = 0; i < addressArray.length; i++ ) {
			for( let i = 0; i < addressArray.length; i++ ) {
				if ( addressArray[ i ].types[0] && 'country' === addressArray[ i ].types[0] ) {
					country['long_name'] = addressArray[ i ].long_name;
					country['short_name'] = addressArray[ i ].short_name;
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
	getArea = ( addressArray ) => {
		let area = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0]  ) {
				for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
					if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
						area = addressArray[ i ].long_name;
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
	getState = ( addressArray ) => {
		let state = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			for( let i = 0; i < addressArray.length; i++ ) {
				if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
					state = addressArray[ i ].long_name;
					return state;
				}
			}
		}
	};
	/**
	 * And function for city,state and address input
	 * @param event
	 */
	onChange = ( event ) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = ( event ) => {

	};

	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
	onMarkerDragEnd = ( event ) => {
		let newLat = event.latLng.lat(),
		    newLng = event.latLng.lng();

		Geocode.fromLatLng( newLat , newLng ).then(
			response => {
				const address = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components,
				      city = this.getCity( addressArray ),
				      area = this.getArea( addressArray ),
				      state = this.getState( addressArray ),
					  country = this.getCountry(addressArray)['short_name'];
				this.setState( {
					address: ( address ) ? address : '',
					area: ( area ) ? area : '',
					city: ( city ) ? city : '',
					state: ( state ) ? state : '',
					country: (country) ? country : '',
					markerPosition: {
						lat: newLat,
						lng: newLng
					},
					mapPosition: {
						lat: newLat,
						lng: newLng
					},
				} )
				this.props.handleState(this.state);
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
	onPlaceSelected = ( place ) => {
		console.log( 'plc', place );
		const address = place.formatted_address,
		      addressArray =  place.address_components,
		      city = this.getCity( addressArray ),
		      area = this.getArea( addressArray ),
		      state = this.getState( addressArray ),
			  country = this.getCountry(addressArray)['short_name'],
		      latValue = place.geometry.location.lat(),
		      lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.setState({
			address: ( address ) ? address : '',
			area: ( area ) ? area : '',
			city: ( city ) ? city : '',
			state: ( state ) ? state : '',
			country: (country) ? country: '',
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
		})
		this.props.handleState(this.state);
	};


	render(){
		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
					<>
						<GoogleMap google={ this.props.google }
								   defaultZoom={ this.props.zoom }
								   defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
								   defaultOptions={{
									   disableDefaultUI: true,
								   }}
						>
							{/*Marker*/}
							<Marker google={this.props.google}
									name={'Dolores park'}
									draggable={true}
									onDragEnd={ this.onMarkerDragEnd }
									position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
							/>
							<Marker />

							{/* For Auto complete Search Box */}
							<div className="search-input-container">
								<Autocomplete
									style={{
										width: '100%',
									}}
									className={`form-control bg-white ${this.props.searchInputClass}`}
									onPlaceSelected={ this.onPlaceSelected }
									types={['(regions)']}
									placeholder="Type address"
									// value="india"
								/>
								<InfoWindow
									onClose={this.onInfoWindowClose}
									position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
								>
									<div>
										<span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
									</div>
								</InfoWindow>
							</div>

						</GoogleMap>
					</>
				)
			)
		);
		let map;
		if( this.props.center.lat !== undefined ) {
			map =   <div>
					<AsyncMap
						googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places`}
						loadingElement={
							<div style={{ height: `100%` }} />
						}
						containerElement={
							<div style={{ height: this.props.height, position: this.props.containerPosition }} />
						}
						mapElement={
							<div className={this.props.mapContainer} style={{ height: `100%`, borderRadius: this.props.mapRadius }} />
						}
					/>
					</div>
		} else {
			map = <div style={{height: this.props.height}} />
		}
		return( map )
	}
}
export default Map