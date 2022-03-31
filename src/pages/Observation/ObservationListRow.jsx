import { Badge, CardSubtitle, CardTitle, FormGroup, Input } from "reactstrap";
import { Icon } from "@iconify/react";
import ReactCountryFlags from "../../components/ReactCountryFlag";
import moment from 'moment';
import CardImageCarousel from "../../components/Shared/CardImageCarousel";

const ObservationListRow = (props) => {
    const { cardItems, cardData, index } = props;
    return (
        <>
            <tr key={index}>
                <th valign="middle" className="check-box">
                    <FormGroup check className="mb-0">
                        <Input type="checkbox" name="is_other" className="me-0" />
                    </FormGroup>
                </th>
                <td valign="middle" className="observationCard-box">
                    <div className="h-100 position-relative">
                        { cardItems?.image_type === 3 && <div className="multiple-image_icon"><Icon icon="codicon:list-filter" color="black" /></div>}
                        {cardItems?.is_verified && <div className="verify-card"><Icon icon="mdi:check-decagram" color="#27ae60" width="13" height="13" /></div>}
                        {/* <img alt="Card cap" src={cardData?.image} className="img-fluid card-img" /> */}
                        <CardImageCarousel carouselData={cardData?.image} />
                    </div>
                </td>
                <td valign="middle" className="observationType-box">
                    <div className="observation_type d-flex align-items-start justify-content-start flex-wrap flex-column">
                        {cardItems?.category_data.length > 0 && cardItems?.category_data.map((item, index) => {
                            let image = `/assets/images/category/${item?.toLowerCase().replaceAll(" ", "")}.png`;
                            return (<div className="mb-2"><i key={index} className="fst-normal rounded-circle me-2 d-inline-block">
                                <img src={image} alt={item} className="rounded-circle w-100 h-100" /> 
                            </i><span>{item}</span></div>)
                        })}
                    </div>
                </td>
                <td valign="middle" className="location-box">
                    <div className="observation_country">
                        <ReactCountryFlags country={cardData?.country_code} className="me-2" />
                        <span className="ms-1">{cardData?.location}</span>
                    </div>
                </td>
                <td valign="middle" className="date-time-box">
                    <div className="card_desc">
                        <CardTitle className="font-bold">{(cardData?.obs_date_time_as_per_utc) ? moment.utc(moment(cardData?.obs_date_time_as_per_utc).utc()).format("MMM DD, YYYY") : (cardData?.obs_date) ? cardData?.obs_date : null }</CardTitle> 
                        <CardSubtitle className="d-flex align-items-center">{(cardData?.obs_date_time_as_per_utc) ? moment.utc(moment(cardData?.obs_date_time_as_per_utc).utc()).format("hh:mm:ss A"): (cardData?.obs_time) ? cardData?.obs_time : null} <Badge className="bg-black text-white ms-1">{(cardData?.obs_date_time_as_per_utc)  ? 'UTC': (cardData?.obs_time) ?  "UTC" : ''}</Badge></CardSubtitle>
                    </div>
                </td>
                <td valign="middle"><h6 className="mb-0 text-center">{cardData.azimuth}</h6></td>
                <td valign="middle"><h4 className="mb-0 location-value">{parseFloat(cardData.latitude).toFixed(1)}</h4></td>
                <td valign="middle"><h4 className="mb-0 location-value">{parseFloat(cardData.longitude).toFixed(1)}</h4></td>
            </tr>
        </>
    )
}
export default ObservationListRow;