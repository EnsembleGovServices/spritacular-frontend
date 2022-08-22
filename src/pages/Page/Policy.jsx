import "../../assets/scss/component/blog.scss";
import {baseURL} from "../../helpers/url";
import DynamicPageEditor from "../../components/Static/DynamicPageEditor";
import PageMeta from "../../meta/PageMeta";
import {useState} from "react";


const Policy = () => {
    const [pageTitle, setPageTitle] = useState('Spritacular Community Policy')
    return (
        <>
            <PageMeta
                title={pageTitle}
                description="This document describes in detail how the project will use and protect your contributions. The terms outlined here are subject to modification without any direct prior notice to users."
            />
            <DynamicPageEditor
                setPageTitle={setPageTitle}
                endpoint={baseURL.static_policy}
            />
        </>
    )
}
export default Policy;