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
    const [singleAnswer, setSingleAnswer] = useState({que: null, ans: []});
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState({
        success: {},
        error: {}
    });
    const [loading, setLoading] = useState(false);

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
        console.log('calling here ', baseURL.quiz_submit)
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
                    score: response?.data?.details
                }
            });
            // setLoading(false);
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
                                              quizControl={quizControl}
                                              handleNextPrev={handleNextPrev}
                                              handleTleCheck={handleTleCheck}
                                              handleSubmit={submitFinalAnswers}
                                    />
                                ) : (
                                    <>
                                        <div className="card quiz-submitted">
                                            <div className="card-body">
                                                <h3>{result?.success?.message}</h3>
                                                <h3 className="text-submitted text-success">
                                                    {result?.success?.score}
                                                </h3>
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
