import {baseURL} from "./url";

export const meta = {
    appName: baseURL.appName,
    themeColor: '#fff',
    language: 'en-US',
    distribution: 'Global',
    author: baseURL.appName,
    copyright: baseURL.appName,
    coverage: 'Worldwide',
    country: 'USA',
    type: 'website',
    seoIndexing: process.env.REACT_APP_SEO_INDEXING
}