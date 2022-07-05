import ReactCountryFlag from "react-country-flag";

const ReactCountryFlags = ({country}) => {
    return(
        <ReactCountryFlag
            countryCode={country}
            svg
            style={{
                width: '1.5em',
                height: '1.5em',
            }}
            title={country}
        />
    );
}
export default ReactCountryFlags;