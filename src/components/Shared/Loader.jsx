import "../../assets/scss/component/loader.scss";
import { useLayoutEffect } from 'react';

const Loader = (props) => {
    const { loaderClass, fixContent } = props;

    //To scroll to top before this component is mounted in DOM.
    useLayoutEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

    return (
        <>
            <div className={fixContent ? 'loader_wrapper ' : 'loader_position ' + loaderClass}>
                <div className="loader">Loading...</div>
            </div>
        </>
    )
}

export default Loader;