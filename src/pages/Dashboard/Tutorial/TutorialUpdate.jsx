import "../../../assets/scss/component/blog.scss"
import {Suspense, lazy} from "react";

const CreateUpdateBlogTutorial = lazy(() => import('../BlogTutorial/CreateUpdateBlogTutorial'))

const TutorialUpdate = () => {
    return (
        <>
            <div className="blog_page position-relative">
                <div className="common-banner"></div>
                <section className="blog-main">
                    <div className="container">
                        <Suspense fallback={<div>Please wait...</div>}>
                            <CreateUpdateBlogTutorial
                                type="tutorial"
                                update={true}
                            />
                        </Suspense>
                    </div>
                </section>
            </div>
        </>
    )
}
export default TutorialUpdate;