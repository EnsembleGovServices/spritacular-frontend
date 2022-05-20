import "../../assets/scss/component/quiz.scss";
import {Col, Container, Row} from "reactstrap";
import QuizCard from "../../components/Quiz/QuizCard";
import QuizProgressBar from "../../components/Quiz/QuizProgressBar";

import axios from "../../api/axios";
import {useEffect, useLayoutEffect, useState} from "react";
import {baseURL} from "../../helpers/url";
import useAuth from "../../hooks/useAuth";
import {number} from "prop-types";


const QuizHome = () => {
    const {auth} = useAuth();
    const [buttonType, setButtonType] = useState('next');
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState({});
    const [quizControl, setQuizControl] = useState({active: 1});
    const [singleAnswer, setSingleAnswer] = useState({question: number, answers: []});
    const [answers, setAnswers] = useState([]);

// Local Variables
    const existingAnswers = {...singleAnswer};
    const updatedData = [existingAnswers];

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
    }

    const handleTleCheck = (id) => {
        if (singleAnswer?.answers.includes(id)) {
            const filterValue = singleAnswer?.answers?.filter((item) => item !== id)
            setSingleAnswer((prev) => {
                return {
                    ...prev,
                    answers: filterValue,
                }
            })
        } else {
            let optionSelected = [...singleAnswer?.answers, id];
            setSingleAnswer((prev) => {
                return {
                    ...prev,
                    answers: optionSelected,
                }
            })
        }
    }

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
        setSingleAnswer((prev) => {
            return {
                ...prev,
                question: activeQuestion?.id,
                answers: []
            }
        });

    }, [activeQuestion?.id])

    useEffect(() => {
        const existing = {...singleAnswer};
        const updated = [existing];
        if (singleAnswer?.question || answers?.length < 1) {
            setAnswers([...updated])
        }
    }, [singleAnswer?.answers]);


    return (
        <>
            <section className="quiz-main">
                <Container>
                    <form method="POST">
                        <Row>
                            {/*<Col sm={12}>*/}
                            {/*    <QuizProgressBar/>*/}
                            {/*</Col>*/}
                            <Col sm={12}>
                                <QuizCard singleAnswer={singleAnswer}
                                          activeQuestion={activeQuestion}
                                          options={options}
                                          quizControl={quizControl}
                                          handleNextPrev={handleNextPrev}
                                          handleTleCheck={handleTleCheck}
                                />
                            </Col>
                        </Row>
                    </form>
                </Container>
            </section>
        </>
    );
};

export default QuizHome;
