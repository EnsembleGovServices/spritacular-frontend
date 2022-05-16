import {Link} from "react-router-dom";

const TutorialListCardContent = (props) => {
    const {item} = props;
    return (
        <Link to={`${item?.slug ? item?.slug : ''}`} className={`d-inline-block`}>
            <div className='tutorial-img'>
                <img src={item?.thumbnail_image} alt={item?.title}/>
            </div>
            <h3>
                {item?.title}
            </h3>
            <p>{item?.description}</p>
        </Link>
    )
}
export default TutorialListCardContent;