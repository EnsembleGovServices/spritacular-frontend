import {Col, Row} from "reactstrap";
import {lazy, Suspense} from "react";
import Loader from "../../../components/Shared/Loader";

const TutorialListCardContent = lazy(() => import('../TutorialListCardContent'))

const TutorialRestLists = (props) => {
    const {articleItems} = props;
    return (
        <Row className="g-4">
            {articleItems?.map((item, index) => {
                return (
                    <Col key={index} sm={6} md={4}>
                        <Suspense fallback={<Loader fixContent={true}/>}>
                            <TutorialListCardContent item={item}/>
                        </Suspense>
                    </Col>
                )
            })}
        </Row>
    )
}
export default TutorialRestLists;