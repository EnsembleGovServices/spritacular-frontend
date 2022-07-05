import "../../assets/scss/component/blog.scss";
import {baseURL} from "../../helpers/url";
import DynamicPageEditor from "../../components/Static/DynamicPageEditor";


const BecomeAnAmbassador = () => {

    return (
        <DynamicPageEditor
            title="Become an Ambassador"
            endpoint={baseURL.static_ambassador}
        />
    )
}

export default BecomeAnAmbassador;