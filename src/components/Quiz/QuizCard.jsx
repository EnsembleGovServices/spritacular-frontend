import {Col, Row} from "reactstrap";

const QuizCard = (props) => {
    const {options, quizControl, singleAnswer, handleNextPrev, activeQuestion, handleTleCheck} = props;
    return (
        <>
            <div className="card">
                <div className="card-top-image">
                    <img src={activeQuestion?.image_url} alt={activeQuestion?.id}/>
                </div>
                <div className="card-body">
                    <h5 className="card-title mb-4">
                        Choose the correct Transient Luminous Event (TLE) type of this image
                    </h5>
                    <div className="mcq-main">
                        <Row>
                            {options?.map((item, index) => {
                                return <Col md={6} key={item.id + index}>
                                    <div className="checkbox-group">
                                        <input
                                            id={item.id}
                                            name="tle_type"
                                            type="checkbox"
                                            value={item.id}
                                            onChange={() => handleTleCheck(item.id)}
                                        />
                                        <label htmlFor={item.id}>{item?.title}</label>
                                    </div>
                                </Col>
                            })}
                            <Col sm={12} className="mt-5">
                                <div className="d-flex align-items-center justify-content-between">
                                    <button type="button" value="prev"
                                            onClick={(e) => handleNextPrev(e.target.value)}
                                            className="btn px-5 btn-outline-dark">Prev
                                    </button>
                                    <button type="button"
                                            value="next"
                                            onClick={(e) => handleNextPrev(e.target.value)}
                                            className="btn px-5 btn-primary">Next
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuizCard;