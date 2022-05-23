import {Col, Row} from "reactstrap";
import Loader from "../Shared/Loader";

const QuizCard = (props) => {
    const {
        options,
        quizControl,
        singleAnswer,
        handleNextPrev,
        activeQuestion,
        handleTleCheck,
        handleQuizSubmit,
        disable,
        loading,
        answers
    } = props;


    return (
        <>
            <div className="card">
                {loading &&
                    <Loader loaderClass="quiz-loading"/>
                }
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
                                            checked={(answers?.find(list => list === item?.id) === item?.id)}
                                            onChange={() => handleTleCheck(item.id)}
                                        />
                                        <label htmlFor={item.id}>{item?.title}</label>
                                    </div>
                                </Col>
                            })}
                            <Col sm={12} className="mt-5">
                                <div className="d-flex align-items-center justify-content-between">
                                    <button type="button" value="prev"
                                            disabled={disable?.prevBtn}
                                            onClick={(e) => handleNextPrev(e.target.value)}
                                            className="btn px-5 btn-outline-dark">Prev
                                    </button>

                                    {quizControl?.activeIndex === 14 ? (
                                        <button type="submit"
                                                onClick={handleQuizSubmit}
                                                className="btn px-5 btn-primary">Submit
                                        </button>
                                    ) : (
                                        <button type="button"
                                                value="next"
                                                disabled={disable?.nextBtn}
                                                onClick={(e) => handleNextPrev(e.target.value)}
                                                className="btn px-5 btn-primary">Next
                                        </button>
                                    )}


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