import "../../assets/scss/component/quiz.scss";
import {Col, Container, Row, UncontrolledAlert} from "reactstrap";
import QuizCard from "../../components/Quiz/QuizCard";

import axios from "../../api/axios";
import {useEffect, useState} from "react";
import {baseURL} from "../../helpers/url";
import useAuth from "../../hooks/useAuth";
import Images from "../../static/images";


const QuizHome = (props) => {
    const {roles} = props;
    const {auth} = useAuth();
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState({});
    const [quizControl, setQuizControl] = useState({active: 1, activeIndex: 0});
    const [buttonType, setButtonType] = useState();
    const [singleAnswer, setSingleAnswer] = useState({que: null, ans: []});
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState({
        success: null,
        error: null
    });
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState({
        prevBtn: true,
        nextBtn: true
    });
    const score = result?.success?.score;

// Local Variables

    const getQuizQuestions = () => {
        return axios.get(baseURL.quiz_question, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token?.access}`,
            },
        }).then((response) => {
            setOptions(response?.data?.option_list)
            setQuestions(response?.data?.question_list)
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleNextPrev = (value) => {
        window.scrollTo(0, 0);
        setButtonType(value);
        setQuizControl((prev) => {
            return {
                ...prev,
                active: value === "next" ? (quizControl.active < quizControl?.total ? quizControl.active + 1 : quizControl.active) : (quizControl.active > 1 ? quizControl.active - 1 : quizControl.active)
            }
        });
    };

    const handleTleCheck = (id) => {

        if (singleAnswer?.ans.includes(id)) {
            const filterValue = singleAnswer?.ans?.filter((item) => item !== id)
            setSingleAnswer((prev) => {
                return {
                    ...prev,
                    ans: filterValue,
                }
            })
        } else {
            let optionSelected = [...singleAnswer?.ans, id];
            setSingleAnswer((prev) => {
                return {
                    ...prev,
                    que: activeQuestion?.id,
                    ans: optionSelected,
                }
            })
        }
    }


    // submit final answers
    const submitFinalAnswers = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(baseURL.quiz_submit, answers, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token?.access}`,
            },
        }).then(response => {
            setResult({
                error: {},
                success: {
                    message: response?.data?.success,
                    score: response?.data?.score
                }
            });
            setLoading(false);
            setAnswers([]);
            window.scrollTo(0, 0);
        }).catch(error => {
            setResult({
                success: {},
                error: {
                    message: error?.response?.data?.details,
                    status: error?.response?.statusText
                }
            });
            setLoading(false);
            window.scrollTo(0, 0);
        })
    }


    useEffect(() => {
        setQuizControl((prev) => {
            return {
                ...prev,
                activeIndex: quizControl?.active - 1
            }
        })
    }, [quizControl?.active])

    useEffect(() => {
        getQuizQuestions().then(r => r);
    }, [])

    useEffect(() => {
        setActiveQuestion(questions?.[quizControl.active - 1]);
        setQuizControl((prev) => {
            return {
                ...prev,
                total: questions?.length
            }
        })
    }, [questions]);

    useEffect(() => {
        let activeQuest = questions?.filter((item, index) => {
            if (index === quizControl?.active - 1) {
                return item;
            }
        }).map((item, index) => {
            return item;
        });
        setActiveQuestion(activeQuest[0]);
    }, [quizControl?.active])

    useEffect(() => {
        setSingleAnswer({
            que: activeQuestion?.id,
            ans: answers[quizControl.activeIndex]?.ans ? answers[quizControl.activeIndex]?.ans : []
        });
    }, [activeQuestion?.id])

    useEffect(() => {
        let single = {...singleAnswer};

        if (activeQuestion?.id) {
            answers[quizControl.activeIndex] = single;
        }

    }, [singleAnswer.ans])

    useEffect(() => {
        let current = answers?.[quizControl?.activeIndex]?.ans?.length > 0;
        if (current && singleAnswer?.ans?.length > 0) {
            setDisable({
                ...disable,
                nextBtn: false,
                prevBtn: (quizControl?.activeIndex === 0 || singleAnswer?.ans?.length < 1)
            });
        } else {
            setDisable({
                ...disable,
                nextBtn: true,
                prevBtn: quizControl?.activeIndex === 0
            });
        }


    }, [answers?.[quizControl?.activeIndex]?.ans, singleAnswer?.ans]);

    useEffect(() => {

    }, [])

    return (
        <>
            <section className="quiz-main">
                <Container>
                    <form onSubmit={submitFinalAnswers}>
                        <Row className="align-items-center">
                            <Col sm={12}>
                                {result?.error?.message &&
                                    <div className="error-card">
                                        <UncontrolledAlert color="danger" data-dismiss="alert" dismissible="true">
                                            {result?.error?.message}
                                        </UncontrolledAlert>
                                    </div>
                                }
                            </Col>
                            <Col sm={12}>
                                {!result?.success ? (
                                    <QuizCard singleAnswer={singleAnswer}
                                              activeQuestion={activeQuestion}
                                              options={options}
                                              loading={loading}
                                              answers={answers?.[quizControl?.activeIndex]?.ans}
                                              quizControl={quizControl}
                                              disable={disable}
                                              handleNextPrev={handleNextPrev}
                                              handleTleCheck={handleTleCheck}
                                              handleSubmit={submitFinalAnswers}
                                    />
                                ) : (
                                    <>
                                        <div className="card quiz-submitted">
                                            <div className="card-body">
                                                <div className="result-image">
                                                    {score < 75 ? (
                                                        <img className="img-fluid success-img"
                                                             src={Images.failedImage}
                                                             alt="success"/>
                                                    ) : (
                                                        <img className="img-fluid success-img"
                                                             src={Images.successImage}
                                                             alt="success"/>
                                                    )}
                                                </div>
                                                <h6 className="title">{result?.success?.message}</h6>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <div
                                                        className={score > 75 ? 'score pass fw-bolder' : 'score fail fw-bolder'}>
                                                        <span>1</span>
                                                        <span className="score-text">Correct Answer</span>
                                                    </div>
                                                    <div
                                                        className={score > 75 ? 'score pass fw-bolder' : 'score fail fw-bolder'}>
                                                        <span className="d-block">{score?.toFixed(0)}%</span>
                                                        <span className="score-text">Total Score</span>
                                                    </div>
                                                </div>

                                                {score < 75 ? (
                                                    <button type="button"
                                                            onClick={() => window.location.reload(false)}
                                                            className="px-4 py-2 mb-4 fw-bolder btn btn-primary">Re-attempt
                                                        Quiz
                                                    </button>
                                                ) : (
                                                    <div className="px-4 py-2 mb-4 fw-bolder">
                                                        <h5 className="mb-0">
                                                            <span
                                                                className="text-success">Congratulations! </span>
                                                            <span>Your account has been upgraded.</span>
                                                        </h5>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </>
                                )}
                            </Col>
                        </Row>
                    </form>
                </Container>
            </section>
        </>
    );
};

export default QuizHome;
