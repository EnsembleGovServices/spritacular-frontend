import {Col, Row} from "reactstrap";
import BlogListCardContent from "../BlogListCardContent";

const BlogGrid4 = (props) => {
    const {articleItems} = props;
    return (
        <Row>
            {articleItems?.map((item, index) => {
                return (
                    <Col key={index} sm={6} md={3}>
                        <BlogListCardContent item={item}/>
                    </Col>
                )
            })}
        </Row>
    )
}
export default BlogGrid4;