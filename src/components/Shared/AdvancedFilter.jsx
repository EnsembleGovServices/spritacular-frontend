import "../../assets/scss/component/advancedFilter.scss";
import {
    Button,
    Card,
    CardBody,
    Col,
    Collapse,
    FormGroup,
    Label,
    Row,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from "reactstrap";
import {useState} from 'react';
import {Icon} from '@iconify/react';
import Images from "../../static/images";
import moment from "moment";
import PropTypes from "prop-types";

const AdvancedFilter = (props) => {
    const {
        selectedFilterVertical,
        handleFilterOpen,
        isFilterOpen,
        setIsFilterOpen,
        handleFilterValue,
        resetFilters,
        handleFilterInput
    } = props;
    const [isDateTimeOpen, setIsDateTimeOpen] = useState(true);
    const [isEquipmentDetailsOpen, setIsEquipmentDetailsOpen] = useState(true);
    return (
        <div className='advanced-filter d-flex flex-column'>
            <Row className=" overflow-auto">
                <Col xs={12} className='d-flex justify-content-end d-md-none'>
                    <Button className="close-icon bg-transparent shadow-none border-0 rounded-0"
                            onClick={() => handleFilterOpen()}>
                        <img src={Images.Modalcloseicon} alt="close-icon"/>
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
                                                        <div className="position-relative date-box">
                                                            <input className="form-control"
                                                                   type="date"
                                                                   name="obs_start_date"
                                                                   value={selectedFilterVertical?.obs_start_date === null ? "" : selectedFilterVertical?.obs_start_date}
                                                                   max={moment(new Date()).format('Y-MM-DD')}
                                                                   onChange={(e) => handleFilterInput(e)}/>
                                                        </div>
                                                        <div className="position-relative time-box">
                                                            <input className="form-control"
                                                                   type="time"
                                                                   name="obs_start_time"
                                                                   value={selectedFilterVertical?.obs_start_time === null ? "" : selectedFilterVertical?.obs_start_time}
                                                                   onChange={(e) => handleFilterInput(e)}/>
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
                                                                   onChange={(e) => handleFilterInput(e)}/>
                                                        </div>
                                                        <div className="position-relative time-box">
                                                            <input className="form-control"
                                                                   type="time"
                                                                   name="obs_end_time"
                                                                   value={selectedFilterVertical?.obs_end_time === null ? "" : selectedFilterVertical?.obs_end_time}
                                                                   onChange={(e) => handleFilterInput(e)}/>
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
                    <Col xs={12}>
                        <div>
                            <Button
                                color="primary"
                                onClick={() => setIsEquipmentDetailsOpen(!isEquipmentDetailsOpen)}
                                className={`collapse-btn fw-bold text-uppercase bg-transparent w-100 mb-0 rounded-0 border-0 shadow-none text-black p-0 d-flex justify-content-between align-items-center ${isEquipmentDetailsOpen ? 'open' : ''}`}
                            >
                                Equipment Details
                                <Icon icon="ci:chevron-down" color="black"/>
                            </Button>
                            <Collapse isOpen={isEquipmentDetailsOpen}>
                                <Card className='border-0 rounded-0 pt-3'>
                                    <CardBody className='p-0'>
                                        <Row>
                                            <Col xs={12}>
                                                <FormGroup className="m-0 d-inline-block form-group w-100">
                                                    <Label htmlFor="CameraType">Camera Type</Label>
                                                    <input className="form-control"
                                                           type="text"
                                                           name="camera_type"
                                                           placeholder="Canon"
                                                           value={selectedFilterVertical?.camera_type}
                                                           onChange={(e) => handleFilterInput(e)}/>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup className="m-0 d-inline-block form-group w-100">
                                                    <Label htmlFor="FrameRate">Frame Rate</Label>
                                                    <Dropdown className="dropdown-with-search"
                                                              toggle={() => setIsFilterOpen({
                                                                  ...isFilterOpen,
                                                                  isRateOpen: !isFilterOpen.isRateOpen
                                                              })} isOpen={isFilterOpen.isRateOpen}>
                                                        <DropdownToggle
                                                            className="px-2 px-xl-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100">
                                                        <span
                                                            className="text-truncate">{(selectedFilterVertical.fps) ? selectedFilterVertical.fps : 'All'}</span>
                                                            <Icon icon="fe:arrow-down" className="down-arrow ms-1"/>
                                                        </DropdownToggle>
                                                        <DropdownMenu className="py-0 shadow">
                                                            <DropdownItem value='24 FPS'
                                                                          onClick={(e) => handleFilterInput(e)}
                                                                          name="fps"
                                                                          className="px-2 fw-normal">24
                                                                FPS</DropdownItem>
                                                            <DropdownItem value='30 FPS'
                                                                          onClick={(e) => handleFilterInput(e)}
                                                                          name="fps"
                                                                          className="px-2 fw-normal">30
                                                                FPS</DropdownItem>
                                                            <DropdownItem value='50 FPS'
                                                                          onClick={(e) => handleFilterInput(e)}
                                                                          name="fps"
                                                                          className="px-2 fw-normal">50
                                                                FPS</DropdownItem>
                                                            <DropdownItem value='60 FPS'
                                                                          onClick={(e) => handleFilterInput(e)}
                                                                          name="fps"
                                                                          className="px-2 fw-normal">60
                                                                FPS</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label className='fw-normal text-black'>ISO</Label>
                                                    <input className="form-control"
                                                           type="number"
                                                           name="iso"
                                                           value={selectedFilterVertical.iso}
                                                           onChange={(e) => handleFilterInput(e)}/>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup className="m-0 d-inline-block form-group w-100">
                                                    <Label htmlFor="FOV">FOV (Field of View)</Label>
                                                    <Dropdown className="dropdown-with-search"
                                                              toggle={() => setIsFilterOpen({
                                                                  ...isFilterOpen,
                                                                  isFOVOpen: !isFilterOpen.isFOVOpen
                                                              })} isOpen={isFilterOpen.isFOVOpen}>
                                                        <DropdownToggle
                                                            className="px-2 px-xl-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100">
                                                        <span
                                                            className="text-truncate">{(selectedFilterVertical.fov) ? selectedFilterVertical.fov : 'All'}</span>
                                                            <Icon icon="fe:arrow-down" className="down-arrow ms-1"/>
                                                        </DropdownToggle>
                                                        <DropdownMenu className="py-0 shadow">
                                                            <DropdownItem value='10 mm'
                                                                          onClick={(e) => handleFilterInput(e)}
                                                                          name="fov"
                                                                          className="px-2 fw-normal">10
                                                                mm</DropdownItem>
                                                            <DropdownItem value='11 mm'
                                                                          onClick={(e) => handleFilterInput(e)}
                                                                          name="fov"
                                                                          className="px-2 fw-normal">11
                                                                mm</DropdownItem>
                                                            <DropdownItem value='12 mm'
                                                                          onClick={(e) => handleFilterInput(e)}
                                                                          name="fov"
                                                                          className="px-2 fw-normal">12
                                                                mm</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup>
                                                    <Label className='fw-normal text-black'>Shutter Speed</Label>
                                                    <input className="form-control"
                                                           type="text"
                                                           name="shutter_speed"
                                                           value={selectedFilterVertical.shutter_speed}
                                                           onChange={(e) => handleFilterInput(e)}/>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={12}>
                                                <FormGroup className="m-0 d-inline-block form-group w-100">
                                                    <Label htmlFor="LensType">Lens Type</Label>
                                                    <Dropdown className="dropdown-with-search"
                                                              toggle={() => setIsFilterOpen({
                                                                  ...isFilterOpen,
                                                                  isLensTypeOpen: !isFilterOpen.isLensTypeOpen
                                                              })} isOpen={isFilterOpen.isLensTypeOpen}>
                                                        <DropdownToggle
                                                            className="px-2 px-xl-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100">
                                                        <span
                                                            className="text-truncate">{(selectedFilterVertical.lens_type) ? selectedFilterVertical.lens_type : 'All'}</span>
                                                            <Icon icon="fe:arrow-down" className="down-arrow ms-1"/>
                                                        </DropdownToggle>
                                                        <DropdownMenu className="py-0 shadow">
                                                            <DropdownItem value='Wide angle'
                                                                          onClick={(e) => handleFilterInput(e)}
                                                                          name="lens_type" className="px-2 fw-normal">Wide
                                                                angle</DropdownItem>
                                                            <DropdownItem value='Standard'
                                                                          onClick={(e) => handleFilterInput(e)}
                                                                          name="lens_type"
                                                                          className="px-2 fw-normal">Standard</DropdownItem>
                                                            <DropdownItem value='Short telephoto'
                                                                          onClick={(e) => handleFilterInput(e)}
                                                                          name="lens_type" className="px-2 fw-normal">Short
                                                                telephoto</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </div>
                    </Col>
                </div>
            </Row>
            <Row className="mt-auto">
                <Col className="pt-3">
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