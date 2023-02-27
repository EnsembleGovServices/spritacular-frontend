import "../../assets/scss/component/loader.scss";

const Loader = (props) => {
    const {loaderClass, fixContent} = props;
    return (
        <>
            <div className={fixContent ? 'loader_wrapper ' : 'loader_position ' + loaderClass}>
                <div className="loader">Loading...</div>
            </div>
        </>
    )
}

export default Loader;