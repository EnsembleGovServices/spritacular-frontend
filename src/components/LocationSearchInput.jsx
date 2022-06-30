/* eslint-disable no-undef */
import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { Input,FormFeedback } from "reactstrap";
import Loader from "../components/Shared/Loader";

import getCity, { getState , getCountry} from '../helpers';


class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: this.props.address};
  }
  
  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = (address,placeId,suggestion) => {
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
      let city = getCity(place.address_components);
      let state = getState(place.address_components);
      let country = getCountry(place.address_components);

       let Addresses = [city,state,country['long_name']].filter(x => x !== undefined && x !== null );
       let addressArray = [];
       addressArray['address'] = Addresses.join(', ');//place.formatted_address;
       addressArray['lat'] = place.geometry.location.lat();
       addressArray['lng'] = place.geometry.location.lng();
       addressArray['placeId'] = placeId;
       addressArray['countryCode'] = country['short_name'];
       this.props.handleLocations(addressArray);
       this.setState({ addressArray });
    });
  };

  render() {    
    return (
      <PlacesAutocomplete
        value={this.state.address ?? ''}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="position-relative setplaceholdersize">
            <Input
              {...getInputProps({
                placeholder: "Enter name of your city or country of residence",
                className: "location-search-input form-control",
              })}
              value={this.state.address ?? ''}
              invalid ={this.props.error?.data?.location}
              required
            />
            <FormFeedback>{this.props.error?.data?.location}</FormFeedback>
            <div className="autocomplete-dropdown-container">
              {loading && <Loader fixContent={false} />}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? "suggestion-item suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? { backgroundColor: "#ffebeb",color: "#990000", cursor: "pointer" }
                  : { backgroundColor: "transparent",color: "#000", cursor: "pointer" };
                  const suggesionClick = () => {
                    this.setState({address: suggestion.description });
                  
                  }
                return (
                  <div key={index}
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
