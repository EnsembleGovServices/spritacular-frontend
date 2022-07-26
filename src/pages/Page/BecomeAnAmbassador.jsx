import "../../assets/scss/component/blog.scss";
import {baseURL} from "../../helpers/url";
import DynamicPageEditor from "../../components/Static/DynamicPageEditor";
import PageMeta from "../../meta/PageMeta";


const BecomeAnAmbassador = () => {

    return (
        <>
            <PageMeta
                title="Become an Ambassador"
                description="We are seeking volunteer Ambassadors to promote Spritacular in their communities and help shape the future of this project."
            />
            <DynamicPageEditor
                title="Become an Ambassador"
                endpoint={baseURL.static_ambassador}
            />
        </>
    )
}

export default BecomeAnAmbassador;