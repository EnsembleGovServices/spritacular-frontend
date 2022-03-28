import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import { routeUrls } from "../../helpers/url";

const FilterSelectMenu = () =>{
    return (
        <>
            <div className="observation-filter_wrapper">
                <Container>
                    <Row>
                    <Col sm={12} md={8}>
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
                        <Link to={'/'+routeUrls.observationsAdd} className="btn btn-secondary shadow-none mt-2 mt-md-0">
                            <Icon icon="heroicons-outline:upload"  width="16" height="20" /> Upload
                            Observation
                        </Link>
                        </div>
                    </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default FilterSelectMenu;