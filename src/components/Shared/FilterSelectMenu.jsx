import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Button, Col, Container, FormGroup, Input, Label, Row,Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { routeUrls } from "../../helpers/url";
import Images from './../../static/images';

const FilterSelectMenu = (props) =>{
    const {filterShow, handleFilterOpen, galleryFilter,isCountryOpen,selectedCountry,searchCountry,countries,setIsCountryOpen,findCountry,setSelectedCountry,handleFilterValue,dashboardFilter, handleListView, handleGridView, listView, gridView,setIsTypeOpen,isTypeOpen,category,selectedCategory,setSelectedCategory,isStatusOpen,setIsStatusOpen,selectedStatus,observationStatus,setSelectedStatus} =  props;
    return (
        <>
            <div className="observation-filter_wrapper">
                <Container>
                    <Row>
                        <Col sm={12} md={8} className="d-flex align-items-center">
                            {dashboardFilter && <FormGroup className={`m-0 d-flex align-items-center h-100 form-group p-0 ${filterShow ? 'filter-open' : ''}`}>
                                <Button onClick={()=>handleFilterOpen()} className="border-0 rounded-0 bg-transparent text-black shadow-none text-start w-100 d-flex align-items-center">
                                    <img src={Images.Filter} alt="Filter" /> {filterShow && <span className="ms-3" >Advanced Filter</span> }</Button>
                            </FormGroup>}
                            { galleryFilter && 
                            <FormGroup className="m-0 d-inline-block form-group">
                                <Label className="text-uppercase" htmlFor="Country">Country</Label>
                                <Dropdown className="dropdown-with-search" toggle={() => setIsCountryOpen(!isCountryOpen)} isOpen={isCountryOpen} >
                                    <DropdownToggle className="px-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100">
                                        <span className="text-truncate">{selectedCountry.name}</span>
                                        <Icon icon="fe:arrow-down" className="down-arrow ms-1"/>
                                    </DropdownToggle>
                                    <DropdownMenu className="py-0 shadow">
                                        <DropdownItem header className="mb-0 position-sticky start-0 top-0 end-0 p-2 bg-white"><Input type="text" className="p-2"  placeholder="Search Timezone" onChange={(e)=> findCountry(e)} /></DropdownItem>
                                        {countries?.filter(item => {
                                            return item.name.toLowerCase().indexOf(searchCountry.toLowerCase()) !== -1;
                                        }).map((item, index) => {
                                            return <DropdownItem  name="timezone" className="px-2 fw-normal" key={index} value={item.name} onClick={(e) => {setSelectedCountry(item); handleFilterValue(item,'country');}}>{item.name}</DropdownItem>
                                        })}
                                    </DropdownMenu>
                                </Dropdown>
                          </FormGroup> }
                            {galleryFilter && 
                            <FormGroup className="m-0 d-inline-block form-group">
                            <Label className="text-uppercase" htmlFor="TransientLuminousEvent">Transient Luminous Event</Label>
                            <Dropdown className="dropdown-with-search" toggle={() => setIsTypeOpen(!isTypeOpen)} isOpen={isTypeOpen} >
                                <DropdownToggle className="px-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100">
                                <span className="text-truncate">{selectedCategory}</span>
                                    <Icon icon="fe:arrow-down" className="down-arrow ms-1"/>
                                </DropdownToggle>
                                <DropdownMenu className="py-0 shadow">
                                    
                                    {category?.map((item, index) => {
                                        return <DropdownItem  name="timezone" className="px-2 fw-normal" key={index} value ={item.name} onClick={(e) => {setSelectedCategory(e.target.value); handleFilterValue(e.target.value,'category');}} >{item.name}</DropdownItem>
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                          </FormGroup>  }
                           {galleryFilter &&  
                           <FormGroup className="m-0 d-inline-block form-group">
                           <Label className="text-uppercase" htmlFor="ObservationStatus">Observation Status</Label>
                           <Dropdown className="dropdown-with-search" toggle={() => setIsStatusOpen(!isStatusOpen)} isOpen={isStatusOpen} >
                               <DropdownToggle className="px-3 shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100">
                                   <span className="text-truncate">{selectedStatus}</span>
                                   <Icon icon="fe:arrow-down" className="down-arrow ms-1"/>
                               </DropdownToggle>
                               <DropdownMenu className="py-0 shadow">
                                   
                                   {observationStatus?.map((item, index) => {
                                       return <DropdownItem  name="timezone" className="px-2 fw-normal" key={index} value={item} onClick={(e) => {setSelectedStatus(e.target.value); handleFilterValue(e.target.value,'status');}} >{item}</DropdownItem>
                                   })}
                               </DropdownMenu>
                           </Dropdown>
                         </FormGroup> }
                        </Col>
                        <Col sm={12} md={4} className="text-end">
                            <div className="d-flex align-items-center justify-content-end h-100 ">
                                {dashboardFilter &&
                                    <>
                                        <div className="view-switch-wrap">
                                            <Button onClick={()=> handleGridView()} className="bg-transparent rounded-0 border-0 p-0 shadow-none"><Icon icon="mdi:view-grid-outline" color={gridView ? '#900' : '#000'} /></Button>
                                            <Button onClick={()=> handleListView()} className="bg-transparent rounded-0 border-0 p-0 shadow-none ms-3"><Icon icon="ic:sharp-list" color={listView ? '#900' : '#000'} /></Button>
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