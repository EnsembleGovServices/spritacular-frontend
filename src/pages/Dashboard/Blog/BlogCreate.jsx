import "../../../assets/scss/component/blog.scss"
import {Suspense, lazy} from "react";

const CreateUpdateBlogTutorial = lazy(() => import('../BlogTutorial/CreateUpdateBlogTutorial'))

const BlogCreate = () => {
    return (
        <>
            <div className="blog_page position-relative">
                <div className="common-banner"></div>
                <section className="blog-main">
                    <div className="container">
                        <Suspense fallback={<div>Please wait...</div>}>
                            <CreateUpdateBlogTutorial
                                type="blog"
                            />
                        </Suspense>
                    </div>
                </section>
            </div>
        </>
    )
}

export default BlogCreate;