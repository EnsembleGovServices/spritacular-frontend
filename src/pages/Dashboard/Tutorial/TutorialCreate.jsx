import "../../../assets/scss/component/blog.scss"
import {Suspense, lazy} from "react";

// To render a dynamic import as a regular component for showing loader till it loads.
const CreateUpdateBlogTutorial = lazy(() => import('../BlogTutorial/CreateUpdateBlogTutorial'))

const TutorialCreate = () => {
    return (
        <div className="blog_page position-relative">
            <div className="common-banner"></div>
            <section className="blog-main">
                <div className="container">
                    <Suspense fallback={<div>Please wait...</div>}>
                        <CreateUpdateBlogTutorial
                            type="tutorial"
                        />
                    </Suspense>
                </div>
            </section>
        </div>
    )
}
export default TutorialCreate;