import "../../assets/scss/component/advancedFilter.scss";
import { Button, Card, CardBody, Col, Collapse, FormGroup, Label, Row } from "reactstrap";
import { useState } from 'react';
import { Icon } from '@iconify/react';
import Images from "../../static/images";
import moment from "moment";
import PropTypes from "prop-types";

const AdvancedFilter = (props) => {
    const { selectedFilterVertical, handleFilterOpen, handleFilterValue, resetFilters, handleFilterInput } = props;
    const [isDateTimeOpen, setIsDateTimeOpen] = useState(true);

    return (
        <div className='advanced-filter d-flex flex-column'>
            <Row className=" overflow-auto">
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
                                                        <div className="position-relative date-box">
                                                            <input className="form-control"
                                                                type="date"
                                                                name="obs_start_date"
                                                                value={selectedFilterVertical?.obs_start_date === null ? "" : selectedFilterVertical?.obs_start_date}
                                                                max={moment(new Date()).format('Y-MM-DD')}
                                                                onChange={(e) => handleFilterInput(e)} />
                                                        </div>
                                                        <div className="position-relative time-box">
                                                            <input className="form-control"
                                                                type="time"
                                                                name="obs_start_time"
                                                                value={selectedFilterVertical?.obs_start_time === null ? "" : selectedFilterVertical?.obs_start_time}
                                                                onChange={(e) => handleFilterInput(e)} />
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label className='fw-normal text-black'>To</Label>
                                                    <div className='d-flex justify-content-between date-time_row'>
                                                        <div className="position-relative date-box">
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
            <Row>
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

export default AdvancedFilter;