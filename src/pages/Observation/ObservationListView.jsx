import "../../assets/scss/component/observationList.scss";
import {useState, useEffect} from "react";
import {FormGroup, Table} from "reactstrap";
import ObservationListRow from "./ObservationListRow";
import useObservationsData from "../../hooks/useObservationsData";

const ObservationListView = (props) => {
    const {observationList, isObservationDetailModal, setObservationDetailModal, setSelectedObservationId} = props;
    const [allChecked, setAllChecked] = useState(false);
    const [checkedIds, setCheckedIds] = useState([]);

    const {setObservationCSVId} = useObservationsData();

    const handleObservationDetailModal = (id) => {
        setObservationDetailModal(!isObservationDetailModal);
        setSelectedObservationId(id);
    };


    const handleAllChecked = (e) => {
        setAllChecked(e.target.checked);
    }

    const allCheckedItem = []

    const getAllChecked = (selector) => {
        let id = parseFloat(selector?.id);
        return allCheckedItem.push(id);
    }

    useEffect(() => {
        if (allChecked) {
            setCheckedIds(allCheckedItem)
        } else {
            setCheckedIds([]);
        }
    }, [allChecked, observationList?.length]);


    useEffect(() => {
        setObservationCSVId((prev) => {
            return {
                ...prev,
                data: {
                    observation: checkedIds
                }
            }
        })
    }, [checkedIds, setObservationCSVId])

    return (
        observationList?.length > 0 && <div className="table-responsive mb-4">
            <Table className="list-view" borderless>
                <thead>
                <tr>
                    <th valign="middle" className="check-box">
                        <FormGroup className="mb-0" check>
                            <input
                                type="checkbox"
                                name="all_csv"
                                className="me-0 form-check-input"
                                onChange={(e) => handleAllChecked(e)}/>
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
                {observationList?.map((cardItems, index) => {
                    return (
                        <tr key={index}>
                            <ObservationListRow
                                index={index}
                                cardItems={cardItems}
                                cardData={cardItems?.images[0]}
                                allChecked={allChecked}
                                setAllChecked={setAllChecked}
                                getAllChecked={getAllChecked}
                                setCheckedIds={setCheckedIds}
                                checkedIds={checkedIds}
                                loadMore={observationList?.length}
                                handleClick={handleObservationDetailModal}
                            />
                        </tr>
                    )
                })
                }
                </tbody>
            </Table>
        </div>
    )
}

export default ObservationListView;