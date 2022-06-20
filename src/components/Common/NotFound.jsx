import {cdn} from "../../helpers/url";
import Images from "../../static/images";

const NotFound = () => {
    return (
        <div className="data-not-found">
            <img
                // src={`${cdn.url}/no-data.svg`}
                src={Images.NoDataFound}
                alt="No data found"
                className="mb-3"
            />

            <h3 className="mt-3">
                <b className="text-secondary fw-bold">Opps!</b> No Data
                Found
            </h3>
        </div>
    )
}

export default NotFound;