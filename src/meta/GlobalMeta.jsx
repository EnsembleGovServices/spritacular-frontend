import {Helmet} from "react-helmet";
import {meta} from "../helpers/meta";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {baseURL} from "../helpers/url";

const GlobalMeta = () => {
    const currentRoute = window.location.href;
    const [currentLocation, setCurrentLocation] = useState(currentRoute);
    const location = useLocation();

    useEffect(() => {
        setCurrentLocation(currentRoute)
        return () => {
            setCurrentLocation(currentRoute)
        };
    }, [location]);


    return (
        <Helmet>
            <meta charSet="utf-8"/>
            <meta content="width=device-width, initial-scale=1" name="viewport"/>
            <meta name="theme-color" content={meta.themeColor}/>
            <meta name='language' content={meta.language}/>
            <meta name='distribution' content={meta.distribution}/>
            <meta name="author" content={meta.author}/>
            <meta name="copyright" content={meta.copyright}/>
            <meta name='coverage' content={meta.coverage}/>
            <meta name='revisit-after' content='2 days'/>
            <meta name='target' content='all'/>
            <meta name="keywords" content="spritacular, observations, nasa, space, galaxy, universe, earth"/>

            <meta name='og:title' content={meta.appName}/>
            <meta name='og:type' content={meta.type}/>
            <meta name='og:url' content={currentRoute}/>
            <meta name='og:site_name' content={meta.appName}/>
            <meta name='og:country-name' content={meta.country}/>

            <meta name='apple-mobile-web-app-capable' content='yes'/>
            <meta name='apple-touch-fullscreen' content='yes'/>
            <meta name='apple-mobile-web-app-status-bar-style' content='white'/>
            <meta name='format-detection' content='telephone=no'/>

            <meta http-equiv='Expires' content='0'/>
            <meta http-equiv='Pragma' content='no-cache'/>
            <meta http-equiv='Cache-Control' content='no-cache'/>
            <meta http-equiv='imagetoolbar' content='no'/>
            <meta http-equiv='x-dns-prefetch-control' content='on'/>

            <link rel="canonical" href={currentLocation}/>
            <meta name="google-site-verification" content="uDbTtX7fyRm7gzkwCo170FDnYRLouDPvZC7ixuDM2NM"/>
            <link href={`${baseURL.base}/favicon.ico`} rel="icon"/>
        </Helmet>
    )
}
export default GlobalMeta;