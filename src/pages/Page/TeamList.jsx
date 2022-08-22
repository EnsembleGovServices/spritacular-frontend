const TeamList = (props) => {
    const {teams} = props;
    return (
        <>
            {teams?.map((item, index) => {
                return (
                    <div key={index}>
                        <div className="col-sm-12 col-md-4">
                            <div className="img">
                                <img src={item?.thumbnail_image} alt={item?.title}/>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-8">

                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default TeamList;