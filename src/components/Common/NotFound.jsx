import Images from "../../static/images";

const NotFound = () => {
    return (
        <div className="data-not-found">
            <img
                src={Images.NoDataFound}
                alt="No data found"
                className="mb-3"
            />
            <p>
                <b className="text-secondary fw-bold">Opps!</b> No Data Found
            </p>
        </div>
    )
}

export default NotFound;