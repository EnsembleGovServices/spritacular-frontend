import LazyLoad from 'react-lazy-load';
import {Col, Row} from "reactstrap";
import BlogListCardContent from "../BlogListCardContent";


const BlogRestLists = (props) => {
    const {articleItems} = props;

    return (
        <>
            <Row className="g-4">
                {articleItems?.map((item, index) => {
                    return (
                        <Col key={index} sm={6} md={4} xl={4}>
                            <div className="position-relative">
                                <LazyLoad
                                    height={263}
                                    offsetTop={100}
                                    debounce={true}
                                    onContentVisible={() => console.log('look ma I have been lazy!')}>
                                    <BlogListCardContent item={item}/>
                                </LazyLoad>
                            </div>
                        </Col>
                    )
                })}
            </Row>

        </>
    )
}
export default BlogRestLists;