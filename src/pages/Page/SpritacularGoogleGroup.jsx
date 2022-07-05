import "../../assets/scss/component/blog.scss";
import {baseURL} from "../../helpers/url";
import DynamicPageEditor from "../../components/Static/DynamicPageEditor";


const SpritacularGoogleGroup = () => {
    return (
        <DynamicPageEditor
            title="Spritacular Google Group"
            endpoint={baseURL.static_google_group}
            gBtn={true}
        />
    )
}

export default SpritacularGoogleGroup;