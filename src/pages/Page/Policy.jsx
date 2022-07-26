import "../../assets/scss/component/blog.scss";
import {baseURL} from "../../helpers/url";
import DynamicPageEditor from "../../components/Static/DynamicPageEditor";
import PageMeta from "../../meta/PageMeta";


const Policy = () => {

    return (
        <>
            <PageMeta
                title="Policy"
                description="This document describes in detail how the project will use and protect your contributions. The terms outlined here are subject to modification without any direct prior notice to users."
            />
            <DynamicPageEditor
                title="Spritacular Policy"
                endpoint={baseURL.static_policy}
            />
        </>
    )
}
export default Policy;