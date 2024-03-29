import { Badge, CardSubtitle, CardTitle, FormGroup } from "reactstrap";
import { Icon } from "@iconify/react";
import moment from 'moment';
import { createRef, useEffect } from "react";
import CardImageCarousel from "../../components/Shared/CardImageCarousel";
import ReactCountryFlags from "../../components/ReactCountryFlag";
import { cdn } from "../../helpers/url";

const ObservationListRow = (props) => {
    const { cardItems, cardData, allChecked, setCheckedIds, index, getAllChecked, checkedIds, handleClick, loadMore } = props;
    const childInput = createRef();

    const setChecked = (id) => {
        if (allChecked && loadMore) {
            return id;
        }
        else {
            return !!(checkedIds.includes(id));
        }
    }

    const handleChecked = (e, id) => {
        let checked = e.target.checked;
        if (checked) {
            if (checkedIds.length > 0) {
                setCheckedIds([...checkedIds, id]);
            }
            else {
                setCheckedIds([id]);
            }
        } else {
            let ids = [...checkedIds];
            ids = ids.filter((item, index) => {
                return item !== id;
            })
            setCheckedIds(ids);
        }
    }

    useEffect(() => {
        getAllChecked(childInput.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allChecked, loadMore]);

    return (
        <>
            <th valign="middle" className="check-box">
                <FormGroup check className="mb-0">
                    <input type="checkbox"
                        data-id={cardItems.id}
                        id={cardItems.id}
                        ref={childInput}
                        name={`is_other_${cardItems.id}`}
                        className="me-0 form-check-input"
                        checked={setChecked(cardItems.id)}
                        disabled={!!allChecked}
                        onChange={(e) => handleChecked(e, cardItems.id)}
                    />
                </FormGroup>
            </th>
            <td valign="middle" className="observationCard-box">
                <div className="h-100 position-relative" style={{ cursor: 'pointer' }}>
                    {cardItems?.image_type === 3 && <div className="multiple-image_icon"><Icon icon="codicon:list-filter" color="black" /></div>}
                    {cardItems?.is_verified && <div className="verify-card"><Icon icon="mdi:check-decagram" color="#27ae60" width="13" height="13" /></div>}
                    {cardItems?.image_type === 3 ?
                        <CardImageCarousel handleClick={handleClick} handleIndex={index} carouselData={cardItems?.images} />
                        : <img
                            alt="Card cap"
                            src={(cardData.compressed_image) ? cardData?.compressed_image : cardData?.image}
                            className="img-fluid card-img"
                            onClick={(e) => {
                                handleClick(index);
                            }}
                        />
                    }
                </div>
            </td>
            <td valign="middle" className="observationType-box">
                <div className="observation_type d-flex align-items-start justify-content-start flex-wrap flex-column">
                    {cardItems?.category_data?.map((item, index) => {
                        let image = `${cdn.url}/category/${item?.name?.toLowerCase().replaceAll(" ", "")}.png`;
                        return (
                            <div key={index} className="mb-2">
                                <i className="fst-normal rounded-circle me-2 d-inline-block">
                                    <img src={image} alt={item?.name} className="rounded-circle w-100 h-100" />
                                </i>
                                <span>{item?.name}</span>
                            </div>
                        )
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
                    <CardTitle className="font-bold">{(cardData?.obs_date_time_as_per_utc) ? moment.utc(moment(cardData?.obs_date_time_as_per_utc).utc()).format("MMM DD, YYYY") : (cardData?.obs_date) ? cardData?.obs_date : null}</CardTitle>
                    <CardSubtitle className="d-flex align-items-center">{(cardData?.obs_date_time_as_per_utc) ? moment.utc(moment(cardData?.obs_date_time_as_per_utc).utc()).format("hh:mm:ss A") : (cardData?.obs_time) ? cardData?.obs_time : null} <Badge className="bg-black text-white ms-1">{(cardData?.obs_date_time_as_per_utc) ? 'UTC' : (cardData?.obs_time) ? "UTC" : ''}</Badge></CardSubtitle>
                </div>
            </td>
            <td valign="middle"><h6 className="mb-0 text-center">{cardData?.azimuth}</h6></td>
            <td valign="middle"><h4 className="mb-0 location-value">{parseFloat(cardData?.latitude).toFixed(1)}</h4></td>
            <td valign="middle"><h4 className="mb-0 location-value">{parseFloat(cardData?.longitude).toFixed(1)}</h4></td>
        </>
    )
}
export default ObservationListRow;