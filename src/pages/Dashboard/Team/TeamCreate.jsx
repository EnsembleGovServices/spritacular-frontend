import "../../../assets/scss/component/blog.scss"
import {Suspense, lazy} from "react";

// To render a dynamic import as a regular component for showing loader till it loads.
const CreateUpdateTeam = lazy(() => import('./CreateUpdateTeam'))

const TeamCreate = () => {
    return (
        <div className="blog_page position-relative">
            <div className="common-banner"></div>
            <section className="blog-main">
                <div className="container">
                    <Suspense fallback={<div>Please wait...</div>}>
                        <CreateUpdateTeam
                            type="team"
                        />
                    </Suspense>
                </div>
            </section>
        </div>
    )
}
export default TeamCreate;