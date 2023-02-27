import "../../../assets/scss/component/blog.scss"
import {Suspense, lazy} from "react";

const CreateUpdateTeam = lazy(() => import('./CreateUpdateTeam'));


const TeamUserUpdate = () => {
    return (
        <div className="blog_page position-relative">
            <div className="common-banner"></div>
            <section className="blog-main">
                <div className="container">
                    <Suspense fallback={<div>Please wait...</div>}>
                        <CreateUpdateTeam
                            type="team"
                            update={true}
                        />
                    </Suspense>
                </div>
            </section>
        </div>
    )
}

export default TeamUserUpdate;