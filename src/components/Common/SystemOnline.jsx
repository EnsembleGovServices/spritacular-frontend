const SystemOnline = (props) => {
    const {status} = props;
    if (!status) {
        return (
            <div className="offline">
                <div className="text-center">
                    <h2>Connection lost</h2>
                    <p>Please check your internet.</p>
                </div>
            </div>
        )
    } else {
        return true;
    }
}
export default SystemOnline;