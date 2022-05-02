import "../../assets/scss/component/observationList.scss";
import {useState, useRef, useEffect} from "react";
import { FormGroup, Table } from "reactstrap";
import ObservationListRow from "./ObservationListRow";
import useObservationsData from "../../hooks/useObservationsData";

const ObservationListView = (props) => {
    const { observationList, isObservationDetailModal, setObservationDetailModal, setSelectedObservationId } = props;
    const [allChecked,setAllChecked] = useState(false);
    const childFunc = useRef(null);
    const [checkedIds,setCheckedIds] = useState([]);
    const {observationCSVId, setObservationCSVId} = useObservationsData();

    const downloadCSV = (ids) => {
        checkedIds.filter((val,id,array) => array.indexOf(val) === id);
    }
    const handleObservationDetailModal = (id) => {
        setObservationDetailModal(!isObservationDetailModal);
        setSelectedObservationId(id);
    };

    useEffect(()=> {
        setObservationCSVId((prev) => {
            return {
                ...prev,
                data: {
                    observation: checkedIds
                },
                all: false
            }
        })
    }, [checkedIds, setObservationCSVId])

    return(
        <>
            <div className="table-responsive mb-4">
                <Table className="list-view" borderless>
                    <thead>
                        <tr>
                            <th valign="middle" className="check-box">
                                <FormGroup className="mb-0" check>
                                    <input
                                        type="checkbox"
                                        name="all_csv"
                                        className="me-0 form-check-input"
                                        onChange={(e) => {setAllChecked(e.target.checked); if(e.target.checked === false){childFunc.current()} }} />
                                </FormGroup>
                            </th>
                            <th valign="middle">Observation</th>
                            <th valign="middle">Type</th>
                            <th valign="middle">Location</th>
                            <th valign="middle">Date/Time</th>
                            <th valign="middle" className="text-center">Azimuth</th>
                            <th valign="middle">Lat</th>
                            <th valign="middle">Lon</th>
                        </tr>
                    </thead>
                    <tbody>
                        {observationList.length > 0 && observationList?.map((cardItems, index)=>{
                            return(
                                <tr key={index}>
                                    <ObservationListRow
                                        index={index}
                                        cardItems={cardItems}
                                        cardData={cardItems?.images[0]}
                                        allChecked={allChecked}
                                        childFunc={childFunc}
                                        setCheckedIds={setCheckedIds}
                                        checkedIds={checkedIds}
                                        handleClick={handleObservationDetailModal}
                                    />
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ObservationListView;