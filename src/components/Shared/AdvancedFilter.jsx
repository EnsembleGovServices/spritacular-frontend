import "../../assets/scss/component/advancedFilter.scss";
import { Button, Card, CardBody, Col, Collapse, FormGroup, Label, Row } from "reactstrap";
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Images from "../../static/images";
import moment from "moment";
import PropTypes from "prop-types";
// Date-time-picker 
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/colors/red.css";
import "../../assets/scss/styles/editors.css"
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import transition from "react-element-popper/animations/transition"
import opacity from "react-element-popper/animations/opacity"
import highlightWeekends from "react-multi-date-picker/plugins/highlight_weekends";

const AdvancedFilter = (props) => {
    const { selectedFilterVertical, handleFilterOpen, handleFilterValue, resetFilters, handleFilterInput } = props;
    const [isDateTimeOpen, setIsDateTimeOpen] = useState(true);
    const [date, setDate] = useState(["dd/mm/yyy"]);
    const [time, setTime] = useState([new Date().toLocaleTimeString().toUpperCase()]);
    const [dateValue, setDateValue] = useState({
        obs_start_date: null,
        obs_end_date: null,
        obs_start_time: null,
        obs_end_time: null,
    });

    function handleChange(props) {
        console.log(props);
        // console.log(props[0]?.format("DD/MM/YYYY"));
        // setDate([props[0]?.format("DD/MM/YYYY")])

        // console.log(props?.value[0]?.format());
        // console.log(props.value?.format("DD/MM/YYYY"));
        // console.log(props.value?.format());

        // const combineObj = { target: { name: props.name, value: props.value?.format("DD/MM/YYYY") } }
        // console.log(combineObj);

        //your modification on passed value ....
        // setDate(props.value?.format())
        // setTime([props?.value[0]?.format()])

    }

    const resetAll = () => {
        console.log(date, time);
        setDate(["dd/mm/yyy"]);
        setTime([new Date().toLocaleTimeString().toUpperCase()]);
        resetFilters();
    }

    useEffect(() => {
        console.log("UseEffect Data ", date, time);
    }, [])


    return (
        <div className='advanced-filter d-flex flex-column'>
            <Row className="h-100 py-2">
                <Col xs={12} className='d-flex justify-content-end d-md-none'>
                    <Button className="close-icon bg-transparent shadow-none border-0 rounded-0"
                        onClick={() => handleFilterOpen()}>
                        <img src={Images.Modalcloseicon} alt="close-icon" />
                    </Button>
                </Col>
                <div className="inner-wrapper">
                    <Col xs={12}>
                        <FormGroup>
                            <Button
                                color="primary"
                                onClick={() => setIsDateTimeOpen(!isDateTimeOpen)}
                                className={`collapse-btn fw-bold text-uppercase bg-transparent w-100 mb-0 rounded-0 border-0 shadow-none text-black p-0 d-flex justify-content-between align-items-center ${isDateTimeOpen ? 'open' : ''}`}
                            >
                                Observation Date/time
                                <Icon icon="ci:chevron-down" color="black" />
                            </Button>
                            <Collapse isOpen={isDateTimeOpen}>
                                <Card className='border-0 rounded-0 pt-3'>
                                    <CardBody className='p-0'>
                                        <Row>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label className='fw-normal text-black'>From</Label>
                                                    <div className='d-flex justify-content-between date-time_row'>
                                                        <div className="position-relative date-box w-100">
                                                            <DatePicker
                                                                render={<CustomDateTimeInput name={'obs_start_date'} dateState={date} selectedFilterVertical={selectedFilterVertical} handleValueChange={handleChange} />}
                                                                className="red"
                                                                format="DD/MM/YYYY"
                                                                name="obs_start_date"
                                                                editable={false}
                                                                scrollSensitive={false}
                                                                onOpenPickNewDate={false}
                                                                onPropsChange={(props) => handleChange(props)}
                                                                // value={date}
                                                                plugins={[
                                                                    <Toolbar
                                                                        position="bottom"
                                                                        sort={["deselect", "close", "today"]}
                                                                    />,
                                                                    highlightWeekends()
                                                                ]}
                                                                animations={[
                                                                    opacity({ from: 0.5, to: 1 }),
                                                                    transition({ from: 25, duration: 500 })
                                                                ]}

                                                            />
                                                        </div>

                                                        <div className="position-relative time-box w-100">
                                                            <DatePicker
                                                                render={<CustomTimeInput name={"obs_start_time"} timeState={time} selectedFilterVertical={selectedFilterVertical} handleValueChange={handleChange} />}
                                                                disableDayPicker
                                                                name="obs_start_time"
                                                                format="hh:mm:ss A"
                                                                plugins={[
                                                                    <TimePicker style={{ minWidth: "180px" }} />,
                                                                    <Toolbar
                                                                        position="bottom"
                                                                        names={{
                                                                            close: "Close",
                                                                            today: "Current",
                                                                        }}
                                                                        sort={["close", "today"]}
                                                                    />
                                                                ]}
                                                                // value={time}
                                                                // onChange={e => handleChange(e)}
                                                                scrollSensitive={false}
                                                                onPropsChange={(props) => handleChange(props)}
                                                            />
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label className='fw-normal text-black'>To</Label>
                                                    <div className='d-flex justify-content-between date-time_row'>
                                                        {/* <div className="position-relative date-box">
                                                            <input className="form-control"
                                                                type="date"
                                                                name="obs_end_date"
                                                                value={selectedFilterVertical?.obs_end_date === null ? "" : selectedFilterVertical?.obs_end_date}
                                                                max={moment(new Date()).format('Y-MM-DD')}
                                                                onChange={(e) => handleFilterInput(e)} />
                                                        </div>
                                                        <div className="position-relative time-box">
                                                            <input className="form-control"
                                                                type="time"
                                                                name="obs_end_time"
                                                                value={selectedFilterVertical?.obs_end_time === null ? "" : selectedFilterVertical?.obs_end_time}
                                                                onChange={(e) => handleFilterInput(e)} />
                                                        </div> */}
                                                        <div className="position-relative date-box w-100">
                                                            <DatePicker
                                                                render={<CustomDateTimeInput name={'obs_end_date'} dateState={date} selectedFilterVertical={selectedFilterVertical} handleValueChange={handleChange} />}
                                                                className="red"
                                                                format="DD/MM/YYYY"
                                                                name="obs_end_date"
                                                                // value={date}
                                                                // onChange={handleChange}
                                                                editable={false}
                                                                onOpenPickNewDate={false}
                                                                scrollSensitive={false}
                                                                onPropsChange={(props) => handleChange(props)}
                                                                plugins={[
                                                                    // <TimePicker position="bottom" />,
                                                                    <Toolbar
                                                                        position="bottom"
                                                                        sort={["deselect", "close", "today"]}
                                                                    />
                                                                ]}
                                                                animations={[
                                                                    opacity({ from: 0.5, to: 1 }),
                                                                    transition({ from: 25, duration: 500 })
                                                                ]}

                                                            />
                                                        </div>
                                                        <div className="position-relative time-box w-100">
                                                            <DatePicker
                                                                render={<CustomTimeInput name={"obs_end_time"} timeState={time} selectedFilterVertical={selectedFilterVertical} handleValueChange={handleChange} />}
                                                                disableDayPicker
                                                                name="obs_end_time"
                                                                format="hh:mm:ss A"
                                                                plugins={[
                                                                    <TimePicker style={{ minWidth: "180px" }} />,
                                                                    <Toolbar
                                                                        position="bottom"
                                                                        names={{
                                                                            close: "Close",
                                                                            today: "Current",
                                                                        }}
                                                                        sort={["close", "today"]}
                                                                    />
                                                                ]}
                                                                // value={time}
                                                                // onChange={(e) => handleChange(e)}
                                                                scrollSensitive={false}
                                                                onPropsChange={(props) => handleChange(props)}
                                                            />
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </FormGroup>
                    </Col>
                </div>
            </Row>
            <Row className="py-2">
                <Col>
                    <div className="d-flex align-items-center justify-content-between">
                        <button onClick={() => handleFilterValue('filter', 'filter')}
                            className="btn btn-primary w-100 me-1">Filter
                        </button>
                        <button onClick={() => resetAll()} className="btn btn-dark w-100">Reset</button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

AdvancedFilter.propTypes = {
    handleFilterValue: PropTypes.func,
    resetFilters: PropTypes.func,
    handleFilterInput: PropTypes.func,
};


function CustomDateTimeInput({ openCalendar, name, value, dateState, handleValueChange, selectedFilterVertical }) {
    // console.log(name, dateState);
    return (
        <input
            className="form-control"
            name={name}
            onFocus={openCalendar}
            // value={selectedFilterVertical?.obs_start_date === null ? "dd/mm/yyy" : selectedFilterVertical?.obs_start_date}
            value={value === "" ? dateState[0] : value[0]}
            onChange={handleValueChange}
            max={moment(new Date()).format('Y-MM-DD')}
        />
    )
}
function CustomTimeInput({ openCalendar, name, value, timeState, handleValueChange, selectedFilterVertical }) {
    // console.log(name, value);
    return (
        <InputIcon
            className="form-control"
            name={name}
            onFocus={openCalendar}
            value={value === "" ? timeState[0] : value[0]}
            onChange={handleValueChange}
        />
    )
}


export default AdvancedFilter;