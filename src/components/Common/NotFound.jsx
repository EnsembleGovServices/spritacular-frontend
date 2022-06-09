import {cdn} from "../../helpers/url";

const NotFound = () => {
    return (
        <div className="data-not-found">
            <img
                src={`${cdn.url}/no-data.svg`}
                alt="No data found"
                className="mb-3"
            />

            <p>
                <b className="text-secondary fw-bold">Opps!</b> No Data
                Found
            </p>
        </div>
    )
}

export default NotFound;