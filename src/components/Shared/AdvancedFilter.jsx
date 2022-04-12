import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button, Card, CardBody, Col, Collapse, FormGroup, Input, Label, Row, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import "../../assets/scss/component/advancedFilter.scss";
import Images from "../../static/images";

const AdvancedFilter = (props) => {
    const {
        selectedFilters,setSelectedFilters, handleFilterOpen, isFilterOpen,setIsFilterOpen, handleFilterValue
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
                {/* <Col xs={12}>
                    <FormGroup>
                        <Label className='fw-normal text-black'>User ID</Label>
                        <Input type="text"  onChange={(e) => {setSelectedFilters({...selectedFilters,userId:e.target.value}); // handleFilterValue(e.target.value,'country');
                        }}/>
                    </FormGroup>
                </Col> */}
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
                                                    <div className="position-relative date-box">
                                                        <Input type="date"
                                                        onChange={(e) => {setSelectedFilters({...selectedFilters,obs_start_date:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                        }}/>
                                                    </div>
                                                    <div className="position-relative time-box">
                                                        <Input type="time"
                                                        onChange={(e) => {setSelectedFilters({...selectedFilters,obs_start_time:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                        }}/>
                                                    </div>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col xs={12}>
                                            <FormGroup>
                                                <Label className='fw-normal text-black'>To</Label>
                                                <div className='d-flex justify-content-between date-time_row'>
                                                    <div className="position-relative date-box">
                                                        <Input type="date"
                                                        onChange={(e) => {setSelectedFilters({...selectedFilters,obs_end_date:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                        }}/>
                                                    </div>
                                                    <div className="position-relative time-box">
                                                        <Input type="time"
                                                        onChange={(e) => {setSelectedFilters({...selectedFilters,obs_end_time:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                        }}/>
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
                                                {/* <Input id="FrameRate" type="select" name="timezone" className="custom-select w-100" defaultValue="" onChange={(e) => {setSelectedFilters({...selectedFilters,fps:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                }}>
                                                    <option disabled defaultValue>All</option>
                                                    <option>24 FPS</option>
                                                    <option>30 FPS</option>
                                                    <option>50 FPS</option>
                                                    <option>60 FPS</option>
                                                </Input> */}
                                                <Dropdown className="dropdown-with-search" toggle={() => setIsFilterOpen({...isFilterOpen,isRateOpen:!isFilterOpen.isRateOpen})} isOpen={isFilterOpen.isRateOpen} >
                                                    <DropdownToggle className="px-2 px-xl-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100">
                                                    <span className="text-truncate">{(selectedFilters.fps) ? selectedFilters.fps: 'All' }</span>
                                                    <Icon icon="fe:arrow-down" className="down-arrow ms-1"/>
                                                </DropdownToggle>
                                                <DropdownMenu className="py-0 shadow">
                                                    {/* {auth.categoryList !== undefined  && auth?.categoryList?.map((item, index) => {
                                                        return <DropdownItem  name="timezone" className="px-2 fw-normal" key={index} value ={item.name} onClick={(e) => {setSelectedFilters({...selectedFilters,type:e.target.value}); handleFilterValue(e.target.value,'category');}} >{item.name}</DropdownItem>
                                                    })} */}
                                                    <DropdownItem value='24 FPS' onClick={(e) => {setSelectedFilters({...selectedFilters,fps:e.target.value}); handleFilterValue(e.target.value,'fps');}} name="timezone" className="px-2 fw-normal" >24 FPS</DropdownItem>
                                                    <DropdownItem value='30 FPS' onClick={(e) => {setSelectedFilters({...selectedFilters,fps:e.target.value}); handleFilterValue(e.target.value,'fps');}} name="timezone" className="px-2 fw-normal" >30 FPS</DropdownItem>
                                                    <DropdownItem value='50 FPS' onClick={(e) => {setSelectedFilters({...selectedFilters,fps:e.target.value}); handleFilterValue(e.target.value,'fps');}} name="timezone" className="px-2 fw-normal" >50 FPS</DropdownItem>
                                                    <DropdownItem value='60 FPS' onClick={(e) => {setSelectedFilters({...selectedFilters,fps:e.target.value}); handleFilterValue(e.target.value,'fps');}} name="timezone" className="px-2 fw-normal" >60 FPS</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
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
                                                {/* <Input id="FOV" type="select" name="timezone" className="custom-select w-100" defaultValue="" onChange={(e) => {setSelectedFilters({...selectedFilters,fov:e.target.value});
                                                }}>
                                                    <option disabled defaultValue>All</option>
                                                    <option>10 mm</option>
                                                    <option>11 mm</option>
                                                    <option>12 mm</option>

                                                </Input> */}
                                                <Dropdown className="dropdown-with-search" toggle={() => setIsFilterOpen({...isFilterOpen,isFOVOpen:!isFilterOpen.isFOVOpen})} isOpen={isFilterOpen.isFOVOpen} >
                                                    <DropdownToggle className="px-2 px-xl-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100">
                                                    <span className="text-truncate">{(selectedFilters.fov) ? selectedFilters.fov: 'All' }</span>
                                                    <Icon icon="fe:arrow-down" className="down-arrow ms-1"/>
                                                </DropdownToggle>
                                                <DropdownMenu className="py-0 shadow">
                                                    {/* {auth.categoryList !== undefined  && auth?.categoryList?.map((item, index) => {
                                                        return <DropdownItem  name="timezone" className="px-2 fw-normal" key={index} value ={item.name} onClick={(e) => {setSelectedFilters({...selectedFilters,type:e.target.value}); handleFilterValue(e.target.value,'category');}} >{item.name}</DropdownItem>
                                                    })} */}
                                                    <DropdownItem value='10 mm' onClick={(e) => {setSelectedFilters({...selectedFilters,fov:e.target.value}); handleFilterValue(e.target.value,'fov');}} name="timezone" className="px-2 fw-normal" >10 mm</DropdownItem>
                                                    <DropdownItem value='11 mm' onClick={(e) => {setSelectedFilters({...selectedFilters,fov:e.target.value}); handleFilterValue(e.target.value,'fov');}} name="timezone" className="px-2 fw-normal" >11 mm</DropdownItem>
                                                    <DropdownItem value='12 mm' onClick={(e) => {setSelectedFilters({...selectedFilters,fov:e.target.value}); handleFilterValue(e.target.value,'fov');}} name="timezone" className="px-2 fw-normal" >12 mm</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
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
                                                {/* <Input id="LensType" type="select" name="timezone" className="custom-select w-100" defaultValue="" onChange={(e) => {setSelectedFilters({...selectedFilters,lens_type:e.target.value}); // handleFilterValue(e.target.value,'country');
                                                }}>
                                                    <option disabled defaultValue>All</option>
                                                    <option>Wide angle</option>
                                                    <option>Standard</option>
                                                    <option>Short telephoto</option>
                                                </Input> */}
                                                 <Dropdown className="dropdown-with-search" toggle={() => setIsFilterOpen({...isFilterOpen,isLensTypeOpen:!isFilterOpen.isLensTypeOpen})} isOpen={isFilterOpen.isLensTypeOpen} >
                                                    <DropdownToggle className="px-2 px-xl-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100">
                                                    <span className="text-truncate">{(selectedFilters.lens_type) ? selectedFilters.lens_type: 'All' }</span>
                                                    <Icon icon="fe:arrow-down" className="down-arrow ms-1"/>
                                                </DropdownToggle>
                                                <DropdownMenu className="py-0 shadow">
                                                    {/* {auth.categoryList !== undefined  && auth?.categoryList?.map((item, index) => {
                                                        return <DropdownItem  name="timezone" className="px-2 fw-normal" key={index} value ={item.name} onClick={(e) => {setSelectedFilters({...selectedFilters,type:e.target.value}); handleFilterValue(e.target.value,'category');}} >{item.name}</DropdownItem>
                                                    })} */}
                                                    <DropdownItem value='Wide angle' onClick={(e) => {setSelectedFilters({...selectedFilters,lens_type:e.target.value}); handleFilterValue(e.target.value,'lens_type');}} name="timezone" className="px-2 fw-normal" >Wide angle</DropdownItem>
                                                    <DropdownItem value='Standard' onClick={(e) => {setSelectedFilters({...selectedFilters,lens_type:e.target.value}); handleFilterValue(e.target.value,'lens_type');}} name="timezone" className="px-2 fw-normal" >Standard</DropdownItem>
                                                    <DropdownItem value='Short telephoto' onClick={(e) => {setSelectedFilters({...selectedFilters,lens_type:e.target.value}); handleFilterValue(e.target.value,'lens_type');}} name="timezone" className="px-2 fw-normal" >Short telephoto</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
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