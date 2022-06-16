import "../../assets/scss/component/advancedFilter.scss";
import { Button, Card, CardBody, Col, Collapse, FormGroup, Label, Row } from "reactstrap";
import { useState } from 'react';
import { Icon } from '@iconify/react';
import Images from "../../static/images";
import moment from "moment";
import PropTypes from "prop-types";
// Date-time-picker 
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/colors/red.css";
import "../../assets/scss/styles/editors.css"
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import transition from "react-element-popper/animations/transition"
import opacity from "react-element-popper/animations/opacity"
import highlightWeekends from "react-multi-date-picker/plugins/highlight_weekends";
import { array } from "prop-types";

const AdvancedFilter = (props) => {
    const { selectedFilterVertical, handleFilterOpen, handleFilterValue, resetFilters, handleFilterInput } = props;
    const [isDateTimeOpen, setIsDateTimeOpen] = useState(true);
    const [dateValue, setDateValue] = useState({
        value: "",
        format: "DD/MM/YYYY HH:mm:ss A",
        onChange: (date) => console.log(date.format()),
    });
    const [timeValue, setTimeValue] = useState({
        onChange: (date) => console.log(date.format()),
    });

    function handleChange(value) {
        console.log(new DateObject({ value, format: "DD/MM/YYYY" }).format(),);

        console.log(value.format());
        //your modification on passed value ....
        // setDateValue(value)
    }

    return (
        <div className='advanced-filter d-flex flex-column'>
            <Row className="h-100 overflow-auto">
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
                                                    <div className='d-flex justify-content-between date-time_row w-100'>
                                                        <div className="position-relative w-100">
                                                            {/* <input className="form-control"
                                                                type="date"
                                                                name="obs_start_date"
                                                                value={selectedFilterVertical?.obs_start_date === null ? "" : selectedFilterVertical?.obs_start_date}
                                                                max={moment(new Date()).format('Y-MM-DD')}
                                                                onChange={(e) => handleFilterInput(e)} /> */}
                                                            <DatePicker
                                                                render={<CustomDateTimeInput className="w-100" name={'obs_start_date'} value={dateValue} selectedFilterVertical={selectedFilterVertical} handleFilterInput={handleChange} onPC={setDateValue} />}
                                                                // render={<InputIcon />}

                                                                className="w-100 red form-control"
                                                                format="DD/MM/YYYY              HH:mm:ss A"
                                                                plugins={[
                                                                    <TimePicker position="bottom" />,
                                                                    <Toolbar position="bottom" sort={["deselect", "close", "today"]} />,
                                                                    highlightWeekends()
                                                                ]}
                                                                animations={[opacity({ from: 0.5, to: 1 }), transition({ from: 25, duration: 500 })]}
                                                                onOpenPickNewDate={false}
                                                                // {...dateValue}
                                                                // value={dateValue.value === "" ? "dd/mm/yyy                            --:-- --" : dateValue.value}
                                                                // onPropsChange={setTimeValue}
                                                            />
                                                        </div>

                                                        {/* <div className="position-relative time-box">
                                                            <input className="form-control"
                                                                type="time"
                                                                name="obs_start_time"
                                                                value={selectedFilterVertical?.obs_start_time === null ? "" : selectedFilterVertical?.obs_start_time}
                                                                onChange={(e) => handleFilterInput(e)} />
                                                        </div> */}
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
                                                        <div className="position-relative w-100">
                                                            <DatePicker
                                                                render={<CustomDateTimeInput className="w-100" name={'obs_end_date'} value={timeValue} selectedFilterVertical={selectedFilterVertical} handleValueChange={handleChange} />}
                                                                className="w-100 red"
                                                                format="DD/MM/YYYY              HH:mm:ss A"
                                                                plugins={[
                                                                    <TimePicker position="bottom" />,
                                                                    <Toolbar
                                                                        position="bottom"
                                                                        sort={["deselect", "close", "today"]}
                                                                    />
                                                                ]}
                                                                animations={[
                                                                    opacity({ from: 0.5, to: 1 }),
                                                                    transition({ from: 25, duration: 500 })
                                                                ]}
                                                                onOpenPickNewDate={false}
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
            <Row className="">
                <Col>
                    <div className="d-flex align-items-center justify-content-between">
                        <button onClick={() => handleFilterValue('filter', 'filter')}
                            className="btn btn-primary w-100 me-1">Filter
                        </button>
                        <button onClick={() => resetFilters()} className="btn btn-dark w-100">Reset</button>
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


function CustomDateTimeInput({ openCalendar, name, value, handleValueChange, selectedFilterVertical }) {
    // console.log(value);
    return (
        <InputIcon
            className="form-control"
            name={name}
            onFocus={openCalendar}
            // value={selectedFilterVertical?.obs_start_date === null ? "dd/mm/yyy               --:-- --" : selectedFilterVertical?.obs_start_date}
            value={value === "" ? "dd/mm/yyy                            --:-- --" : value[0]}
            onChange={handleValueChange}
            max={moment(new Date()).format('Y-MM-DD')}
        />
    )
}

export default AdvancedFilter;