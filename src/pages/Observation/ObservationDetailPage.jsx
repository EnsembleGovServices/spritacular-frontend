import ObservationCard from "../../components/Shared/ObservationCard";
import Masonry from 'react-masonry-component';

const ObservationDetailPage = (props) => {
  const {observationList, isObservationDetailModal, setSelectedObservationId, setObservationDetailModal, activeType} = props;


  // Masonry Options
  const masonryOptions = {
    columnWidth: 1,
    gutter: 0,
    itemSelector: ".photo-item",
    fitWidth: false,
    transitionDuration: 10,
  };

  const handleObservationDetailModal = (id) => {
    setObservationDetailModal(!isObservationDetailModal);
    setSelectedObservationId(id);
  };
  return(
      <Masonry
          className={"photo-list p-0"}
          elementType={"ul"}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={true}
      >
          {observationList?.length > 0 && observationList?.map((cardItems, index)=> {
              return(
                  <li key={index} className="photo-item mb-4">
                      <ObservationCard cardItems={cardItems} cardData={cardItems?.images?.[0]} index={index} userProfile={cardItems.user_data} handleClick={handleObservationDetailModal} activeType={activeType} />
                  </li>
              )
          })
          }
      </Masonry>
  )
}
export default ObservationDetailPage;