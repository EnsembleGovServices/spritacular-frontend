import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Button, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import { routeUrls } from "../../helpers/url";
import Images from './../../static/images';

const FilterSelectMenu = (props) =>{
    const {filterShow, handleFilterOpen,dashboardFilter} =  props;
    return (
        <>
            <div className="observation-filter_wrapper">
                <Container>
                    <Row>
                        <Col sm={12} md={8} className="d-flex align-items-center">
                            {dashboardFilter && <FormGroup className={`m-0 d-flex align-items-center h-100 form-group p-0 ${filterShow ? 'filter-open' : ''}`}>
                                <Button onClick={()=>handleFilterOpen()} className="border-0 rounded-0 bg-transparent text-black shadow-none text-start w-100">
                                    <img src={Images.Filter} alt="Filter" /> {filterShow && <span className="ms-3" >Advanced Filter</span> }</Button>
                            </FormGroup>}
                            <FormGroup className="m-0 d-inline-block form-group">
                                <Label className="text-uppercase" htmlFor="Country">Country</Label>
                                <Input id="Country" type="select" name="timezone" className="bg-transparent p-0 custom-select" defaultValue="" >
                                    <option disabled defaultValue>
                                    All countries
                                    </option>
                                    <option>Country 1</option>
                                    <option>Country 2</option>
                                    <option>Country 3</option>
                                    <option>Country 4</option>
                                </Input>
                            </FormGroup>  
                            <FormGroup className="m-0 d-inline-block form-group">
                                <Label className="text-uppercase" htmlFor="TransientLuminousEvent">Transient Luminous Event</Label>
                                <Input id="TransientLuminousEvent" type="select" name="timezone" className="bg-transparent p-0 custom-select" defaultValue="" >
                                    <option disabled defaultValue>
                                    All types
                                    </option>
                                    <option>Types 1</option>
                                    <option>Types 2</option>
                                    <option>Types 3</option>
                                    <option>Types 4</option>
                                </Input>
                            </FormGroup>  
                            <FormGroup className="m-0 d-inline-block form-group">
                                <Label className="text-uppercase" htmlFor="ObservationStatus">Observation Status</Label>
                                <Input id="ObservationStatus" type="select" name="timezone" className="bg-transparent p-0 custom-select" defaultValue="" >
                                    <option disabled defaultValue>
                                    All status
                                    </option>
                                    <option>Status 1</option>
                                    <option>Status 2</option>
                                    <option>Status 3</option>
                                    <option>Status 4</option>
                                </Input>
                            </FormGroup>               
                        </Col>
                        <Col sm={12} md={4} className="text-end">
                            <div className="d-flex align-items-center justify-content-end h-100 ">
                                {dashboardFilter &&
                                    <>
                                        <div className="view-switch-wrap">
                                            <Button className="bg-transparent rounded-0 border-0 p-0 shadow-none"><Icon icon="mdi:view-grid-outline" /></Button>
                                            <Button className="bg-transparent rounded-0 border-0 p-0 shadow-none ms-3"><Icon icon="ic:sharp-list" /></Button>
                                        </div>
                                        <div className="border-start ps-3 ms-3">
                                            <Button className="btn btn-secondary shadow-none" disabled>
                                                <Icon icon="heroicons-outline:download"  width="25" height="22" /> 
                                                Download CSV
                                            </Button>
                                        </div>
                                    </>
                                }
                                {!dashboardFilter && <Link to={'/'+routeUrls.observationsAdd} className="btn btn-secondary shadow-none mt-2 mt-md-0">
                                    <Icon icon="heroicons-outline:upload"  width="16" height="20" /> Upload
                                    Observation
                                </Link>}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default FilterSelectMenu;