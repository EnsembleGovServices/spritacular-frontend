import {Link} from "react-router-dom";

const BlogListCardContent = (props) => {
    const {item, large} = props;
    return (
        <Link to={`${item?.id ? item?.id : ''}`} className={`${large ? "main-blog" : 'blog-small'} d-block`}>
            <img src={item?.thumbnail_image} alt={item?.title}/>
            <div className="blog-text">
                <p className="text-uppercase">{item?.category_name}</p>
                <h3>
                    {item?.title}
                </h3>
                <p>{item?.description}</p>
            </div>
        </Link>
    )
}
export default BlogListCardContent;