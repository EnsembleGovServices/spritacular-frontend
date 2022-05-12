import {Col, Row} from "reactstrap";
import BlogListCardContent from "../BlogListCardContent";

const BlogGrid4 = (props) => {
    const {articleItems} = props;
    return (
        <Row className="g-4">
            {articleItems?.map((item, index) => {
                return (
                    <Col key={index} md={6}>
                        <BlogListCardContent item={item}/>
                    </Col>
                )
            })}
        </Row>
    )
}
export default BlogGrid4;