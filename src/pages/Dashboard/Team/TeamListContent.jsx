import {Col} from "reactstrap";
import {Link} from "react-router-dom";
import {routeUrls} from "../../../helpers/url";
import DeleteTeamUser from "./DeleteTeamUser";

const TeamListContent = (props) => {
    const {teams, type} = props;

    return teams?.map((item, index) => {
        return (
            <Col key={index} sm={12} md={4} xl={3} className="mb-4">
                <div className="card h-100 text-center">
                    <div className="card-body">
                        <div className="dash-inner-card-team-list">
                            <img className="img-fluid" src={item?.thumbnail_image} alt={item?.title}/>
                        </div>
                        <div className="mt-3">
                            <h5 className="card-title">{item?.title}</h5>
                            <p className="mb-0">
                                {item?.organization}
                            </p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex flex-wrap align-items-center justify-content-center">
                            <Link className="my-1 mx-1 btn btn-sm btn-success text-white px-4"
                                  to={`${routeUrls.dashboard}/${type}/${item?.id}`}>view</Link>

                            <Link className="my-1 btn btn-sm btn-dark px-4 mx-1"
                                  to={`${routeUrls.dashboard}/${type}/${item?.id}/edit`}>Edit</Link>

                            <div className="my-1 mx-a">
                                <DeleteTeamUser id={item?.id}/>
                            </div>

                        </div>
                    </div>
                </div>
            </Col>
        )
    })
}
export default TeamListContent;