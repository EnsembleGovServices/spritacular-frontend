import "../../assets/scss/component/blog.scss";
import {Container} from "reactstrap"
import {useEffect, useState, lazy, Suspense} from "react";
import {baseURL, routeUrls} from "../../helpers/url";
import axios from "../../api/axios";

import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Shared/Loader";
import {Link} from "react-router-dom";
import NotFound from "../../components/Common/NotFound";
import PageMeta from "../../meta/PageMeta";

// To render a dynamic import as a regular component for showing loader till it loads.
// const BlogFeatured = lazy(() => import('./Featured/BlogFeatured'))
const BlogGrid4 = lazy(() => import('./Grid/BlogGrid4'))
const BlogRestLists = lazy(() => import('./List/BlogRestLists'))


const BlogList = () => {
    const {auth} = useAuth();
    const [articles, setArticles] = useState([]);
    const [hasData, setHasData] = useState(true);
    const admin = auth?.user?.is_superuser;


    const getArticles = async () => {
        await axios.get(`${baseURL.get_blog}`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (response?.data?.data?.length > 0) {
                setHasData(true);
            } else {
                setHasData(false);
            }

            setArticles({
                // featured: response?.data?.data[0] ? response?.data?.data[0] : null,
                grid4: response?.data?.data?.slice(0, 4),
                list: response?.data?.data?.slice(4),
                all: response?.data?.data
            });

        }).catch(error => {
            process.env.NODE_ENV === "development" && console.log('getArticle BlogListPage: ', error)
        })
    }

    useEffect(() => {
        getArticles().then(r => r)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <PageMeta
                title="Blog"
                description="Read Blogs about TLE Observations on spritacular. Discover more about the elusive phenomena in the space"
            />
            <div className="blog_page position-relative">
                <div className="common-banner"></div>
                <section className="blog-main">
                    <Container>
                        <div className="mb-5 d-flex align-items-center justify-content-between">
                            <h2 className="mb-0">Spritacular Blog</h2>
                            {auth?.user && admin &&
                                <Link
                                    to={`${routeUrls.dashboard}/${routeUrls.dashBlog.list}/${routeUrls.dashBlog.create}`}
                                    className="btn btn-primary px-4">Create Blog</Link>
                            }
                        </div>

                        {hasData ? (
                            <>
                                <Suspense fallback={<Loader fixContent={true}/>}>
                                    <BlogGrid4 articleItems={articles?.grid4}/>
                                </Suspense>
                                <div className="mt-4">
                                    <Suspense fallback={<Loader fixContent={true}/>}>
                                        <BlogRestLists articleItems={articles?.list}/>
                                    </Suspense>
                                </div>
                            </>
                        ) : (
                            <>
                                <NotFound/>
                            </>
                        )}
                    </Container>
                </section>
            </div>
        </>

    )
}
export default BlogList;