import "../../assets/scss/component/advancedFilter.scss";
import "../../assets/scss/styles/editors.css"
import {cdn} from "../../helpers/url";
import {Button, Card, CardBody, Col, Collapse, FormGroup, Label, Row} from "reactstrap";
import {useState, useEffect} from 'react';
import {Icon} from '@iconify/react';
import PropTypes from "prop-types";

// Date-time-picker 
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/colors/red.css";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import highlightWeekends from "react-multi-date-picker/plugins/highlight_weekends";

const AdvancedFilter = (props) => {
    const {selectedFilterVertical, handleFilterOpen, handleFilterValue, resetFilters, handleFilterInput} = props;
    const [isDateTimeOpen, setIsDateTimeOpen] = useState(true);


    const handleDateTimeChange = (e) => {
        console.log(e)
        console.log(e.format())
    }

    const resetAll = () => {
        resetFilters();
    }

    return (
        <div className='advanced-filter d-flex flex-column'>
            <Row className="h-100 py-2">
                <Col xs={12} className='d-flex justify-content-end d-md-none'>
                    <Button className="close-icon bg-transparent shadow-none border-0 rounded-0"
                            onClick={() => handleFilterOpen()}>
                        <img src={`${cdn.url}/close-icon.svg`} alt="close-icon"/>
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
                                <Icon icon="ci:chevron-down" color="black"/>
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
                                                                className="red"
                                                                inputClass="form-control"
                                                                format="DD/MM/YYYY"
                                                                placeholder="DD/MM/YYYY"
                                                                name="obs_start_date"
                                                                editable={false}
                                                                scrollSensitive={false}
                                                                onOpenPickNewDate={false}
                                                                onChange={(e) => handleDateTimeChange(e)}
                                                                plugins={[
                                                                    <Toolbar
                                                                        position="bottom"
                                                                        sort={["deselect", "close", "today"]}
                                                                    />,
                                                                    highlightWeekends()
                                                                ]}
                                                            />
                                                        </div>

                                                        <div className="position-relative time-box w-100">
                                                            <DatePicker
                                                                disableDayPicker
                                                                className="red"
                                                                inputClass="form-control"
                                                                name="obs_start_time"
                                                                format="hh:mm:ss A"
                                                                placeholder="Select Time"
                                                                onChange={(e) => handleDateTimeChange(e)}
                                                                plugins={[
                                                                    <TimePicker/>,
                                                                    <Toolbar
                                                                        position="bottom"
                                                                        names={{
                                                                            close: "Close",
                                                                            today: "Current",
                                                                        }}
                                                                        sort={["close", "today"]}
                                                                    />
                                                                ]}
                                                                scrollSensitive={false}
                                                            />
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label className='fw-normal text-black'>To</Label>
                                                    <div className='d-flex justify-content-between date-time_row'>

                                                        <div className="position-relative date-box w-100">
                                                            <DatePicker
                                                                className="red"
                                                                inputClass="form-control"
                                                                format="DD/MM/YYYY"
                                                                placeholder="DD/MM/YYYY"
                                                                name="obs_end_date"
                                                                editable={false}
                                                                onOpenPickNewDate={false}
                                                                scrollSensitive={false}
                                                                plugins={[
                                                                    <Toolbar
                                                                        position="bottom"
                                                                        sort={["deselect", "close", "today"]}
                                                                    />
                                                                ]}
                                                            />
                                                        </div>
                                                        <div className="position-relative time-box w-100">
                                                            <DatePicker
                                                                disableDayPicker
                                                                className="red"
                                                                inputClass="form-control"
                                                                name="obs_end_time"
                                                                format="hh:mm:ss A"
                                                                placeholder="Select Time"
                                                                plugins={[
                                                                    <TimePicker style={{minWidth: "180px"}}/>,
                                                                    <Toolbar
                                                                        position="bottom"
                                                                        names={{
                                                                            close: "Close",
                                                                            today: "Current",
                                                                        }}
                                                                        sort={["close", "today"]}
                                                                    />
                                                                ]}
                                                                scrollSensitive={false}
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


// function CustomDateTimeInput({openCalendar, name, value, dateState, handleValueChange, selectedFilterVertical}) {
//     // console.log(name, dateState);
//     return (
//         <input
//             className="form-control"
//             name={name}
//             onFocus={openCalendar}
//             // value={selectedFilterVertical?.obs_start_date === null ? "dd/mm/yyy" : selectedFilterVertical?.obs_start_date}
//             value={value === "" ? dateState[0] : value[0]}
//             onChange={handleValueChange}
//             max={moment(new Date()).format('Y-MM-DD')}
//         />
//     )
// }
//
// function CustomTimeInput({openCalendar, name, value, timeState, handleValueChange, selectedFilterVertical}) {
//     // console.log(name, value);
//     return (
//         <InputIcon
//             className="form-control"
//             name={name}
//             onFocus={openCalendar}
//             value={value === "" ? timeState[0] : value[0]}
//             onChange={handleValueChange}
//         />
//     )
// }


export default AdvancedFilter;