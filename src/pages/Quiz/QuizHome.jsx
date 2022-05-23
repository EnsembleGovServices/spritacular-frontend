import "../../assets/scss/component/quiz.scss";
import {Col, Container, Row, UncontrolledAlert} from "reactstrap";
import QuizCard from "../../components/Quiz/QuizCard";

import axios from "../../api/axios";
import {useEffect, useState} from "react";
import {baseURL} from "../../helpers/url";
import useAuth from "../../hooks/useAuth";


const QuizHome = () => {
    const {auth} = useAuth();
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState({});
    const [quizControl, setQuizControl] = useState({active: 1, activeIndex: 0});
    const [buttonType, setButtonType] = useState();
    const [singleAnswer, setSingleAnswer] = useState({que: null, ans: []});
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState({
        // success: {
        //     message: 'Quiz submitted successfully',
        //     score: 'Your score 25%'
        // },
        success: {},
        error: {}
    });
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState({
        prevBtn: true,
        nextBtn: true
    });
    const [startAgain, setStartAgain] = useState(false);

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
            console.log(response?.data)
            setResult({
                error: {},
                success: {
                    message: response?.data?.success,
                    score: response?.data?.details
                }
            });
            setLoading(false);
            setAnswers([]);
        }).catch(error => {
            setResult({
                success: {},
                error: {
                    message: error?.response?.data?.details,
                    status: error?.response?.statusText
                }
            });
            setLoading(false);
        })
    }

    // Re-start quiz
    const startQuizAgain = () => {
        setStartAgain(true);
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
        console.log('current', current)

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


    }, [answers?.[quizControl?.activeIndex]?.ans, singleAnswer?.ans])

    return (
        <>
            <section className="quiz-main">
                <Container>
                    <form onSubmit={submitFinalAnswers}>
                        <Row className="align-items-center">
                            {/*<Col sm={12}>*/}
                            {/*    <QuizProgressBar/>*/}
                            {/*</Col>*/}
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
                                {!result?.success?.score ? (
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
                                                <h3>{result?.success?.message}</h3>
                                                <h3 className="text-submitted text-success my-4">
                                                    {result?.success?.score}
                                                </h3>

                                                <button onClick={startQuizAgain}
                                                        className="px-4 py-2 fw-bolder btn btn-warning">Re-attempt
                                                    Quiz
                                                </button>
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
