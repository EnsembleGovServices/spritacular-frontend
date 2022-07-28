import LazyLoad from 'react-lazy-load';
import {Col, Row} from "reactstrap";

import BlogListCardContent from "../BlogListCardContent";

const BlogRestLists = (props) => {
    const {articleItems} = props;

    return (
        <Row>
            {articleItems?.map((item, index) => {
                return (
                    <Col key={index} sm={6} md={4} xl={3}>
                        <BlogListCardContent item={item}/>
                    </Col>
                )
            })}
        </Row>
    )
}
export default BlogRestLists;