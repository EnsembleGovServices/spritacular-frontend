import "../../assets/scss/component/blog.scss";
import {baseURL} from "../../helpers/url";
import DynamicPageEditor from "../../components/Static/DynamicPageEditor";
import PageMeta from "../../meta/PageMeta";


const SpritacularGoogleGroup = () => {
    return (
        <>
            <PageMeta
                title="Google Group"
                description="Spritacular google group is created to facilitate community discussion among storm chasers, atmospheric and space electricity researchers, night sky photographers, and anyone interested in participating."
            />
            <DynamicPageEditor
                title="Spritacular Google Group"
                endpoint={baseURL.static_google_group}
            />
        </>
    )
}

export default SpritacularGoogleGroup;