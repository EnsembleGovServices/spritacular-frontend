import {Col, Row} from "reactstrap";
import BlogListCardContent from "../BlogListCardContent";

const BlogRestLists = (props) => {
    const {articleItems} = props;
    return (
        <Row className="g-4">
            {articleItems?.map((item, index) => {
                return (
                    <Col key={index} md={2} xl={4}>
                        <BlogListCardContent item={item}/>
                    </Col>
                )
            })}
        </Row>
    )
}
export default BlogRestLists;