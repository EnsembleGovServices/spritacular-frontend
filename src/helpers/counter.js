import {useEffect} from "react";

const Counter = (props) => {
    const {start=0, end=0, duration=1, speed=1, suffix=''} = props;

    useEffect(() => {
        let elements = document.querySelectorAll('[data-counter]')
        elements.forEach(i => {
            let data = {
                start: parseInt(i.getAttribute('data-start')),
                end: parseInt(i.getAttribute('data-end')),
                delay: parseInt(i.getAttribute('data-delay')) || 0,
                format: '{}',
                time: parseInt(i.getAttribute('data-time')) || 1,
                speed: parseInt(i.getAttribute('data-speed')) || 1
            }
            if (i.getAttribute('data-format')) {
                data.format = i.getAttribute('data-format')
            } else if (i.innerHTML !== "") {
                data.format = i.innerHTML
            }
            // console.log(data.format)
            if (data.start == null) {
                throw new Error('start is required')
            }
            if (data.end == null) {
                throw new Error('end is required')
            }
            let counter = data.start
            i.innerHTML = data.format.replace('{}', counter)
            let intervalTime = Math.ceil(data.time / (data.end - data.start))
            setTimeout(() => {
                let interval = setInterval(intervalHandler, intervalTime)
                function intervalHandler() {
                    counter += (data.end - data.start) / Math.abs(data.end - data.start) * data.speed
                    i.innerHTML = data.format.replace('{}', counter)
                    if (counter === data.end) {
                        clearInterval(interval)
                    }
                }
            }, data.delay)
        })
    })
    return(
        <span className="counter" data-counter data-start={start} data-end={end} data-delay={duration} data-speed={speed} data-format={`{}${suffix}`}/>
    )
}
export default Counter;