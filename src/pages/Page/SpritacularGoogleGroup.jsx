import "../../assets/scss/component/blog.scss";
import {lazy, Suspense} from "react";
import {baseURL} from "../../helpers/url";

const DynamicPageEditor = lazy(() => import('../../components/Static/DynamicPageEditor'));


const SpritacularGoogleGroup = () => {
    return (
        <Suspense fallback={''}>
            <DynamicPageEditor
                title="Spritacular Google Group"
                endpoint={baseURL.static_google_group}
                gBtn={true}
            />
        </Suspense>
    )
}

export default SpritacularGoogleGroup;