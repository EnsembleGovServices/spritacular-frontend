import {Progress} from "reactstrap";
import {useEffect, useRef, useState} from "react";

const QuizProgressBar = (props) => {
    const {quizControl, activeQuestion} = props;
    const [progress, setProgress] = useState();
    const progressTotal = useRef(null);

    useEffect(() => {
        let percentage = quizControl?.active ? quizControl?.active * 100 / quizControl?.total : 6.67;
        setProgress(percentage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizControl?.active, activeQuestion])


    useEffect(() => {
        if (progress > 51) {
            progressTotal.current.classList.add('text-white')
        } else {
            progressTotal.current.classList.remove('text-white')
        }
    }, [progress])

    return (
        <div className="quiz-progress">
            <div className="total" ref={progressTotal}>
                {quizControl?.active} / {quizControl?.total}
            </div>
            <Progress
                animated
                value={progress}
            />
        </div>
    )
}

export default QuizProgressBar;