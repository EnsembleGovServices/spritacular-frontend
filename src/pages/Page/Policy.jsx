import "../../assets/scss/component/blog.scss";
import {baseURL} from "../../helpers/url";
import DynamicPageEditor from "../../components/Static/DynamicPageEditor";


const Policy = () => {

    return (
        <DynamicPageEditor
            title="Spritacular Policy"
            endpoint={baseURL.static_policy}
        />
    )
}
export default Policy;