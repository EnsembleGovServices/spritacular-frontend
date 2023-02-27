import "../../assets/scss/component/quiz.scss";
import {Col, Container, Modal, ModalBody, Row, UncontrolledAlert} from "reactstrap";
import {Icon} from '@iconify/react';
import axios from "../../api/axios";
import {useEffect, useState} from "react";
import {baseURL, cdn} from "../../helpers/url";
import useAuth from "../../hooks/useAuth";
import BlurImage from "../../components/Common/BlurImage";
import QuizCard from "../../components/Quiz/QuizCard";
import PageMeta from "../../meta/PageMeta";

const QuizHome = (props) => {
    const {auth} = useAuth();
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState({});
    const [quizControl, setQuizControl] = useState({active: 1, activeIndex: 0});
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
    const [fullScreen, setFullScreen] = useState(false);
    const [fullImage, setFullImage] = useState("");
    const score = result?.success?.score;

    // Fetch quiz questions from db
    const getQuizQuestions = async () => {
        return axios.get(baseURL.quiz_question, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token?.access}`,
            },
        }).then((response) => {
            setOptions(response?.data?.option_list)
            setQuestions(response?.data?.question_list)
        }).catch((error) => {
            process.env.NODE_ENV === "development" && console.log('QuizQue:', error)
        })
    }

    const goNext = (quizControl.active < quizControl?.total ? quizControl.active + 1 : quizControl.active);
    const goPrev = (quizControl.active > 1 ? quizControl.active - 1 : quizControl.active);

    // For prev/next button
    const handleNextPrev = (value) => {
        window.scrollTo(0, 0);
        setQuizControl((prev) => {
            return {
                ...prev,
                active: value === "next" ? goNext : goPrev
            }
        });
    };

    // For ans checkbox 
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
                    score: response?.data?.score,
                    correct: response?.data?.correct_answers
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

    // Handle Full Screen
    const goFullScreenImage = (image) => {
        setFullImage(image);
        setFullScreen(true);
    }
    const closeFullScreen = () => {
        setFullScreen(false);
        setFullImage("");
    }

    // For prev/next question
    useEffect(() => {
        setQuizControl((prev) => {
            return {
                ...prev,
                activeIndex: quizControl?.active - 1
            }
        })
    }, [quizControl?.active])

    // For quiz questions function call
    useEffect(() => {
        getQuizQuestions().then(r => r);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // For current question
    useEffect(() => {
        setActiveQuestion(questions?.[quizControl.active - 1]);
        setQuizControl((prev) => {
            return {
                ...prev,
                total: questions?.length
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questions]);

    // For last question and submit
    useEffect(() => {
        // eslint-disable-next-line
        let activeQuest = questions?.filter((item, index) => {
            if (index === quizControl?.active - 1) {
                return item;
            }
        }).map((item) => {
            return item;
        });
        setActiveQuestion(activeQuest[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizControl?.active])

    // To store ans of individual que
    useEffect(() => {
        setSingleAnswer({
            que: activeQuestion?.id,
            ans: answers[quizControl.activeIndex]?.ans ? answers[quizControl.activeIndex]?.ans : []
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeQuestion?.id])

    useEffect(() => {
        let single = {...singleAnswer};

        if (activeQuestion?.id) {
            answers[quizControl.activeIndex] = single;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [singleAnswer.ans])

    // To disable/enable next button
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answers?.[quizControl?.activeIndex]?.ans, singleAnswer?.ans]);

    return (
        <>
            <PageMeta
                title="Get Trained"
                description="Take part in quiz and get an opportunity to validate observations."
            />
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
                                              goFullScreenImage={goFullScreenImage}
                                    />
                                ) : (
                                    <>
                                        <div className="card quiz-submitted">
                                            <div className="card-body">
                                                <div className="result-image">
                                                    {score < 75 ? (
                                                        <img className="img-fluid success-img"
                                                             src={`${cdn.url}/failed.svg`}
                                                             alt="success"/>
                                                    ) : (
                                                        <img className="img-fluid success-img"
                                                             src={`${cdn.url}/success.svg`}
                                                             alt="success"/>
                                                    )}
                                                </div>
                                                <h6 className="title">{result?.success?.message}</h6>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <div
                                                        className={score > 75 ? 'score pass fw-bolder' : 'score fail fw-bolder'}>
                                                        <span>{result?.success?.correct}</span>
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

            {fullScreen &&
                <Modal
                    className="fullScreen-quiz-image-modal"
                    isOpen={fullScreen}
                    backdrop={false}
                    centered
                    fullscreen
                    toggle={closeFullScreen}
                >
                    <ModalBody>
                        <button className="close-icon" type="button" onClick={() => closeFullScreen()}>
                            <Icon color="#fff" width={30} height={30} icon="clarity:close-line"/>
                        </button>
                        <div className="fc-image-wrapper">
                            <div className="fc-image-adjust">
                                <BlurImage adjustImage="contain" preview={fullImage} image={fullImage}/>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            }
        </>
    );
};

export default QuizHome;
