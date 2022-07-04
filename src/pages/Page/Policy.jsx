import "../../assets/scss/component/blog.scss";
import {lazy, Suspense} from "react";
import {baseURL} from "../../helpers/url";

const DynamicPageEditor = lazy(() => import('../../components/Static/DynamicPageEditor'))

const Policy = () => {

    return (
        <Suspense fallback={''}>
            <DynamicPageEditor
                title="Spritacular Policy"
                endpoint={baseURL.static_policy}
            />
        </Suspense>
    )
}
export default Policy;