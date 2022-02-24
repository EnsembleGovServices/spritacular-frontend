import "../../assets/scss/component/loader.scss";

const Loader = (props) => {
    return(
        <>
            <div className={props.fixContent ? 'loader_wrapper' : 'loader_position'}>
                <div className="loader">Loading...</div>
            </div>
        </>
    )
}

export default Loader;