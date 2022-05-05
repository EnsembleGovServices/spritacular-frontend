import ObservationCard from "../../components/Shared/ObservationCard";
import Masonry from 'react-masonry-component';
import {masonryConfig} from "../../helpers/observation";

const ObservationDetailPage = (props) => {
  const {observationList, isObservationDetailModal, setSelectedObservationId, setObservationDetailModal, activeType} = props;

  // Masonry Options
  const masonryOptions = masonryConfig('.photo-list', 1, 0, false, 10);

  const handleObservationDetailModal = (id) => {
    setObservationDetailModal(!isObservationDetailModal);
    setSelectedObservationId(id);
  };
  return(
      <Masonry
          className={"photo-list p-0"}
          options={masonryOptions}
          enableResizableChildren={true}
      >
          {observationList?.length > 0 && observationList?.map((cardItems, index)=> {
              return(
                  <div key={index} className="photo-item mb-4">
                      {/*<h3>image Index {cardItems.id} </h3>*/}
                      <ObservationCard cardItems={cardItems} cardData={cardItems?.images?.[0]} index={index} userProfile={cardItems.user_data} handleClick={handleObservationDetailModal} activeType={activeType} />
                  </div>
              )
          })
          }
      </Masonry>
  )
}
export default ObservationDetailPage;