import TeamContentEditor from "../Dashboard/Team/TeamContentEditor";
import useAuth from "../../hooks/useAuth";
import {Link} from "react-router-dom";
import {routeUrls} from "../../helpers/url";

const TeamList = (props) => {
    const {teams} = props;
    const {auth} = useAuth();
    const admin = auth?.user?.is_superuser;
    return (
        teams?.map((item, index) => {
            console.log('item', item)
            return (
                <div className="team-card-box card" key={index}>
                    {admin &&
                        <div className="edit">
                            <Link to={`${routeUrls.dashboard}/${routeUrls.dashTeams.list}/${item?.id}/edit`}
                                  className="btn btn-primary px-4">Edit</Link>
                        </div>
                    }
                    <div className="card-body">
                        <div className="u-info">
                            <div className="img">
                                <img src={item?.thumbnail_image} alt={item?.title}/>
                            </div>
                            <div className="info">
                                <h3>
                                    {item?.url ? <a href={item?.url} target="_blank"
                                                    rel="noreferrer">{item?.title}</a> : item?.title}
                                </h3>
                                <p className="card-text">{item?.role}</p>
                                <p className="card-text">{item?.organization}</p>
                            </div>
                        </div>
                        <div className="content">
                            <TeamContentEditor dynamicPageProps={true} data={item?.content}/>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export default TeamList;