import "../../assets/scss/component/blog.scss";
import {lazy, Suspense} from "react";
import {baseURL} from "../../helpers/url";

const DynamicPageEditor = lazy(() => import('../../components/Static/DynamicPageEditor'));

const BecomeAnAmbassador = () => {

    return (
        <Suspense fallback={''}>
            <DynamicPageEditor
                title="Become an Ambassador"
                endpoint={baseURL.static_ambassador}
            />
        </Suspense>
    )
}

export default BecomeAnAmbassador;