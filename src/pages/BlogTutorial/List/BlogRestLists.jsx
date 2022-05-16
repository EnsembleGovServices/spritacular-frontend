import {Col, Row} from "reactstrap";
import {lazy, Suspense} from "react";
import Loader from "../../../components/Shared/Loader";

const BlogListCardContent = lazy(() => import('../BlogListCardContent'))

const BlogRestLists = (props) => {
    const {articleItems} = props;
    return (
        <Row className="g-4">
            {articleItems?.map((item, index) => {
                return (
                    <Col key={index} sm={6} md={4} xl={4}>
                        <Suspense fallback={<Loader fixContent={true}/>}>
                            <BlogListCardContent item={item}/>
                        </Suspense>
                    </Col>
                )
            })}
        </Row>
    )
}
export default BlogRestLists;