import "../../assets/scss/component/blog.scss";
import {baseURL} from "../../helpers/url";
import DynamicPageEditor from "../../components/Static/DynamicPageEditor";
import PageMeta from "../../meta/PageMeta";
import {useState} from "react";


const BecomeAnAmbassador = () => {
    const [pageTitle, setPageTitle] = useState('Get Involved')

    return (
        <>
            <PageMeta
                title={pageTitle}
                description="We are seeking volunteer Ambassadors to promote Spritacular in their communities and help shape the future of this project."
            />
            <DynamicPageEditor
                setPageTitle={setPageTitle}
                endpoint={baseURL.static_ambassador}
            />
        </>
    )
}

export default BecomeAnAmbassador;