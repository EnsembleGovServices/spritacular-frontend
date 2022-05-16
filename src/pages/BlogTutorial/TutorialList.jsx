// import "../../assets/scss/component/blog.scss";
import "../../assets/scss/component/tutorials.scss";
import {Container, Row} from "reactstrap"
import {useEffect, useState, lazy, Suspense} from "react";
import {baseURL, routeUrls} from "../../helpers/url";
import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Shared/Loader";
import {Link} from "react-router-dom";

const TutorialRestLists = lazy(() => import('./List/TutorialRestLists'))

const TutorialList = () => {
    const {auth} = useAuth();
    const [tutorials, setTutorials] = useState([]);
    const admin = auth?.user?.is_superuser;


    const getTutorials = async () => {
        await axios.get(`${baseURL.get_blog}2`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            console.log(response?.data)
            setTutorials({
                list: response?.data?.data
            })
        }).catch(error => {
            console.log('error', error)
        })
    }

    useEffect(() => {
        getTutorials().then(r => r)
    }, [])

    return (
        <>
            <div className="tutorial_page position-relative">
                <div className="common-banner"></div>
                <section className="tutorial-main">
                    <Container>
                        <div className="mb-5 d-flex align-items-center justify-content-between">
                            <h2 className="mb-0">User Tutorials</h2>
                            {auth?.user && admin &&
                                <Link
                                    to={'/' + routeUrls.dashboard + '/' + routeUrls.dashTutorial.list + '/' + routeUrls.dashBlog.create}
                                    className="btn btn-primary px-4">Create Tutorial</Link>
                            }
                        </div>
                        <Row className='gx-5 gy-3'>
                            <Suspense fallback={<Loader fixContent={true}/>}>
                                <TutorialRestLists articleItems={tutorials?.list}/>
                            </Suspense>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    )
}
export default TutorialList;