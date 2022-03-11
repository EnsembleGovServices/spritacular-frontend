/* eslint-disable no-undef */
import { array } from "prop-types";
import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Input } from "reactstrap";
import Loader from "../components/Shared/Loader";

import getCity, {getPostalCode, getState , getCountry, getArea} from '../helpers';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: this.props.address};
    // this.statelocation = {...this.state};
    // this.statelocation['address'] = this.props.address;

    // this.setState(this.statelocation);
  }
  
  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = (address,placeId,suggestion) => {
    console.log(suggestion);
    const placesService = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    let place;
    this.address = "";
    placesService.getDetails({ placeId: placeId }, results => {
      place = results;
      if (!place.geometry) {
        return;
      }
      console.log(place);
      // let area = getArea(place.address_components);
      let city = getCity(place.address_components);
      let state = getState(place.address_components);
      // let postalCode = getPostalCode(place.address_components);
      let country = getCountry(place.address_components);

     let lat = place.geometry.location.lat();
     let lng = place.geometry.location.lng();
     let Addresses = [city,state,country['long_name']].filter(x => x !== undefined && x !== null );
    let addressArray = [];
    addressArray['address'] = Addresses.toString();//place.formatted_address;
    addressArray['lat'] = place.geometry.location.lat();
    addressArray['lng'] = place.geometry.location.lng();
    addressArray['placeId'] = placeId;
    addressArray['countryCode'] = country['short_name'];
    console.log(addressArray);
    this.props.handleLocations(addressArray);
    this.setState({ addressArray });
    });
  };

  render() {    
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {/* <Input */}
            <Input
            
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input form-control",
              })}
              value={this.state.address}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <Loader fixContent={false} />}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "suggestion-item suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#ffebeb",color: "#990000", cursor: "pointer" }
                  : { backgroundColor: "transparent",color: "#000", cursor: "pointer" };
                  const suggesionClick = () => {
                    this.setState({address: suggestion.description });
                  
                  }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span onClick={suggesionClick}>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
