import LazyLoad from 'react-lazy-load';
import { Col, Row } from "reactstrap";
import TutorialListCardContent from "../TutorialListCardContent";

const TutorialRestLists = (props) => {
    const { articleItems } = props;

    return (
        <Row className="g-4">
            {articleItems?.map((item, index) => {
                return (
                    <Col key={index} sm={6} md={4} xl={3}>
                        <div className="position-relative card border-0 h-100">
                            <LazyLoad
                                height={330}
                                offsetTop={100}
                            >
                                <TutorialListCardContent item={item} />
                            </LazyLoad>
                        </div>
                    </Col>
                )
            })}
        </Row>
    )
}
export default TutorialRestLists;