import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Label } from 'reactstrap';
import { routeUrls } from '../../helpers/url';
const SortByFilter = (props) => {
    const { getObservationData } = props;
    const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
    return (
        <>
            <FormGroup className="form-group sort-by-select">
                <Label className="text-uppercase" htmlFor="SortBy">Sort by</Label>
                <Dropdown id="SortBy" className="dropdown-with-search" toggle={() => setIsTimezoneOpen(!isTimezoneOpen)} isOpen={isTimezoneOpen}>
                    <DropdownToggle className="shadow-none border-0 text-black fw-normal text-start d-flex justify-content-between align-items-center w-100">
                        <span className="text-truncate">Recent observations</span>
                        <Icon icon="fe:arrow-down" className="down-arrow ms-1"/>
                    </DropdownToggle>
                    <DropdownMenu onChange={(e) => {getObservationData(e)}} className="shadow">
                        <DropdownItem  className="fw-normal" value='recent'>Recent observations</DropdownItem>
                        <DropdownItem  className="fw-normal" value='1'>1 week ago observations</DropdownItem>
                        <DropdownItem  className="fw-normal" value='2'>2 week ago observations</DropdownItem>
                        <DropdownItem  className="fw-normal" value='3'>3 week ago observations</DropdownItem>
                        <DropdownItem  className="fw-normal" value='4'>4 week ago observations</DropdownItem>
                        <DropdownItem  className="fw-normal" value='1'>1 months ago observations</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </FormGroup>  
        </>
    )
}

export default SortByFilter;