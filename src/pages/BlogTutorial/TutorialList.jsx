import "../../assets/scss/component/tutorials.scss";
import {Container} from "reactstrap"
import {useEffect, useState, lazy, Suspense} from "react";
import {baseURL, routeUrls} from "../../helpers/url";
import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Shared/Loader";
import {Link} from "react-router-dom";
import NotFound from "../../components/Common/NotFound";

// To render a dynamic import as a regular component for showing loader till it loads.
const TutorialRestLists = lazy(() => import('./List/TutorialRestLists'))

const TutorialList = () => {
    const {auth} = useAuth();
    const [tutorials, setTutorials] = useState([]);
    const [hasData, setHasData] = useState(true);
    const admin = auth?.user?.is_superuser;

    const getTutorials = async () => {
        await axios.get(`${baseURL.get_blog}2`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            // console.log(response?.data)
            if (response?.data?.data?.length > 0) {
                setHasData(true);
            } else {
                setHasData(false);
            }
            setTutorials({
                list: response?.data?.data
            })
        }).catch(error => {
            console.log('error', error)
        })
    }

    useEffect(() => {
        document.getElementById("user_tut")?.scroll({top: 0, behavior: "smooth"});
        getTutorials().then(r => r)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="tutorial_page position-relative">
                <div className="common-banner"></div>
                <section className="tutorial-main">
                    <Container>
                        <div className="mb-5 d-flex align-items-center justify-content-between">
                            <h2 className="mb-0" id="user_tut">User Tutorials</h2>
                            {auth?.user && admin &&
                                <Link
                                    to={`${routeUrls.dashboard}/${routeUrls.dashTutorial.list}/${routeUrls.dashBlog.create}`}
                                    className="btn btn-primary px-4">Create Tutorial</Link>
                            }
                        </div>
                        {hasData ? (
                            <Suspense fallback={<Loader fixContent={true}/>}>
                                <TutorialRestLists articleItems={tutorials?.list}/>
                            </Suspense>
                        ) : (
                            <NotFound/>
                        )}
                    </Container>
                </section>
            </div>
        </>
    )
}
export default TutorialList;