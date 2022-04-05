import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button, Card, CardBody, Col, Collapse, FormGroup, Input, Label, Row } from "reactstrap";
import "../../assets/scss/component/advancedFilter.scss";
import Images from "../../static/images";

const AdvancedFilter = (props) => {
    const {
        selectedFilters,setSelectedFilters, handleFilterOpen
    } = props;
    const [isDateTimeOpen, setIsDateTimeOpen] = useState(true);
    const [isEquipmentDetailsOpen, setIsEquipmentDetailsOpen] = useState(true);
    return (
        <div className='advanced-filter'>
            <Row>
                <Col xs={12} className='d-flex justify-content-end d-md-none'>
                    <Button className="close-icon bg-transparent shadow-none border-0 rounded-0" onClick={()=>handleFilterOpen()}>
                        <img src={Images.Modalcloseicon} alt="close-icon" />
                    </Button>
                </Col>
                <Col xs={12}>
                    <FormGroup>
                        <Label className='fw-normal text-black'>User ID</Label>
                        <Input type="text"  onChange={(e) => {setSelectedFilters({...selectedFilters,userId:e.target.value}); // handleFilterValue(e.target.value,'country');
                        }}/>
                    </FormGroup>
                </Col>
                <Col xs={12}>
                    <FormGroup>
                        <Button
                            color="primary"
                            onClick={()=>setIsDateTimeOpen(!isDateTimeOpen)}
                            
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
                                                    <Input type="date" 
                                                    onChange={(e) => {setSelectedFilters({...selectedFilters,obs_start_date:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                }}/>
                                                    <Input type="time" 
                                                    onChange={(e) => {setSelectedFilters({...selectedFilters,obs_start_time:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                }}/>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={12}>
                                            <FormGroup>
                                                <Label className='fw-normal text-black'>To</Label>
                                                <div className='d-flex justify-content-between date-time_row'>
                                                    <Input type="date" 
                                                    onChange={(e) => {setSelectedFilters({...selectedFilters,obs_end_date:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                }}/>
                                                    <Input type="time" 
                                                    onChange={(e) => {setSelectedFilters({...selectedFilters,obs_end_time:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                }}/>
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
                    <FormGroup>
                        <Button
                            color="primary"
                            onClick={()=>setIsEquipmentDetailsOpen(!isEquipmentDetailsOpen)}
                            className={`collapse-btn fw-bold text-uppercase bg-transparent w-100 mb-0 rounded-0 border-0 shadow-none text-black p-0 d-flex justify-content-between align-items-center ${isEquipmentDetailsOpen ? 'open' : ''}`}
                        >
                            Equipment Details
                            <Icon icon="ci:chevron-down" color="black" />
                        </Button>
                        <Collapse isOpen={isEquipmentDetailsOpen}>
                            <Card className='border-0 rounded-0 pt-3'>
                                <CardBody className='p-0'>
                                    <Row>
                                        <Col xs={12}>
                                            <FormGroup className="m-0 d-inline-block form-group w-100">
                                                <Label htmlFor="CameraType">Camera Type</Label>
                                                <Input  
                                                    type="text"
                                                    name="camera_type"
                                                    placeholder="Canon"
                                                    onChange={(e) => {setSelectedFilters({...selectedFilters,camera_type:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                }}
                                                    />
                                            </FormGroup> 
                                        </Col>
                                        <Col xs={12}>
                                            <FormGroup className="m-0 d-inline-block form-group w-100">
                                                <Label htmlFor="FrameRate">Frame Rate</Label>
                                                <Input id="FrameRate" type="select" name="timezone" className="custom-select w-100" defaultValue="" onChange={(e) => {setSelectedFilters({...selectedFilters,fps:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                }}>
                                                    <option disabled defaultValue>All</option>
                                                    <option>24 FPS</option>
                                                    <option>30 FPS</option>
                                                    <option>50 FPS</option>
                                                    <option>60 FPS</option>
                                                </Input>
                                            </FormGroup> 
                                        </Col>
                                        <Col xs={12}>
                                            <FormGroup>
                                                <Label className='fw-normal text-black'>ISO</Label>
                                                <Input type="text" onChange={(e) => {setSelectedFilters({...selectedFilters,iso:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                }} />
                                            </FormGroup>
                                        </Col>
                                        <Col xs={12}>
                                            <FormGroup className="m-0 d-inline-block form-group w-100">
                                                <Label htmlFor="FOV">FOV (Field of View)</Label>
                                                <Input id="FOV" type="select" name="timezone" className="custom-select w-100" defaultValue="" onChange={(e) => {setSelectedFilters({...selectedFilters,fov:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                }}>
                                                    <option disabled defaultValue>All</option>
                                                    <option>10 mm</option>
                                                    <option>11 mm</option>
                                                    <option>12 mm</option>
                                                </Input>
                                            </FormGroup> 
                                        </Col>
                                        <Col xs={12}>
                                            <FormGroup>
                                                <Label className='fw-normal text-black'>Shutter Speed</Label>
                                                <Input type="text"  onChange={(e) => {setSelectedFilters({...selectedFilters,shutter_speed:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                }}/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={12}>
                                            <FormGroup className="m-0 d-inline-block form-group w-100">
                                                <Label htmlFor="LensType">Lens Type</Label>
                                                <Input id="LensType" type="select" name="timezone" className="custom-select w-100" defaultValue="" onChange={(e) => {setSelectedFilters({...selectedFilters,lens_type:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                }}>
                                                    <option disabled defaultValue>All</option>
                                                    <option>Wide angle</option>
                                                    <option>Standard</option>
                                                    <option>Short telephoto</option>
                                                </Input>
                                            </FormGroup> 
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </FormGroup>
                </Col>
            </Row>
        </div>
    )
}

export default AdvancedFilter;