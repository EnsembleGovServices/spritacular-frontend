const getCity = ( addressArray ) => {
    let city = '';
    for( let i = 0; i < addressArray.length; i++ ) {
        if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
            city = addressArray[ i ].long_name;
            return city;
        }
    }
};

export default getCity;

export const getState = ( addressArray ) => {
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

export const getArea = ( addressArray ) => {
    let area = '';
    for( let i = 0; i < addressArray.length; i++ ) {
        if ( addressArray[ i ].types[0]  ) {
            for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
                if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] || 'colloquial_area' === addressArray[ i ].types[j] ) {
                    area = addressArray[ i ].long_name;
                    return area;
                }
            }
        }
    }
};

export const getPostalCode = ( addressArray ) => {
    let postalCode = '';
    for( let i = 0; i < addressArray.length; i++ ) {
        for( let i = 0; i < addressArray.length; i++ ) {
            if ( addressArray[ i ].types[0] && '"postal_code"' === addressArray[ i ].types[0] ) {
                postalCode['long_name'] = addressArray[ i ].long_name;
                
                return postalCode;
            }
        }
    }
};

export const getCountry = ( addressArray ) => {
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
