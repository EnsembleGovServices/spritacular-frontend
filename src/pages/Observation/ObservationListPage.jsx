import Masonry from 'react-masonry-component';
import ObservationCard from "../../components/Shared/ObservationCard";

const ObservationListPage = (props) => {
    const {
        observationList,
        isObservationDetailModal,
        setSelectedObservationId,
        setObservationDetailModal,
        activeType,
    } = props;


    // Masonry Options
    // const masonryOptions = masonryConfig('.photo-list', 1, 0, false, 10);

    // Masonry Options
    const masonryOptions = {
        columnWidth: 1,
        gutter: 0,
        itemSelector: ".photo-item",
        fitWidth: false,
        transitionDuration: 600,
    };

    const handleObservationDetailModal = (id) => {
        setObservationDetailModal(!isObservationDetailModal);
        setSelectedObservationId(id);
    };
    return (
        <>
            <Masonry
                className={"photo-list p-0"}
                options={masonryOptions}
                enableResizableChildren={true}
            >
                {observationList && observationList?.map((cardItems, index) => {
                    return (
                        <div key={index} className="photo-item mb-4">
                            <ObservationCard cardItems={cardItems} cardData={cardItems?.images?.[0]} index={index}
                                             userProfile={cardItems.user_data}
                                             handleClick={handleObservationDetailModal}
                                             activeType={activeType}/>
                        </div>
                    )
                })
                }
            </Masonry>
        </>
    )
}
export default ObservationListPage;