import BlogListCardContent from "../BlogListCardContent";

const BlogFeatured = (props) => {
    const {articleItems} = props;
    return (
        articleItems ? <BlogListCardContent large={true} item={articleItems}/> : ''
    )
}
export default BlogFeatured;