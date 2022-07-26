import {Helmet} from "react-helmet";
import {meta} from "../helpers/meta";

const PageMeta = (props) => {
    const {title, description, imageLink, noIndex = false} = props;
    const shouldIndex = meta.seoIndexing === "true";


    return (
        <Helmet>
            <title>{`${title} - ${meta.appName}`}</title>
            <meta name='description' content={description}/>
            <meta name='og:image'
                  content={imageLink ? imageLink : 'https://d1kndubu51u47k.cloudfront.net/assets/logo.png'}/>
            <meta name="apple-mobile-web-app-title" content={title}/>

            {shouldIndex ? (
                noIndex ? <meta name="robots" content="noindex,nofollow"/> :
                    <meta name="robots" content="index,follow"/>
            ) : (
                <meta name="robots" content="noindex,nofollow"/>
            )}

        </Helmet>
    )
}

export default PageMeta;