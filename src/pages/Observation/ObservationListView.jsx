import { FormGroup, Input, Table } from "reactstrap";
import ObservationListRow from "./ObservationListRow";
import "../../assets/scss/component/observationList.scss";

const ObservationListView = (props) => {
    const { observationList } = props;
    return(
        <>
            <Table className="list-view" borderless>
                <thead>
                    <tr>
                        <th valign="middle" className="check-box">
                            <FormGroup className="mb-0" check>
                                <Input type="checkbox" name="is_other" className="me-0" />
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
                            <ObservationListRow cardItems={cardItems} cardData={cardItems?.images[0]} index={index} />
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default ObservationListView;