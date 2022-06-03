import {lazy, Suspense} from "react";
import {useLayoutEffect, useState} from "react";
import useObservationsData from "../../hooks/useObservationsData";
import Skeleton from "react-loading-skeleton";

import {Row, Col} from 'reactstrap';


const ObservationCard = lazy(() => import('../Shared/ObservationCard'))

const HomeObservationCard = (props) => {
    const {loading} = props;
    const [internalLoading, setInternalLoading] = useState(loading);
    const {recentObservation} = useObservationsData();

    useLayoutEffect(() => {
        return () => {
            if (loading) {
                setTimeout(function () {
                    setInternalLoading(false);
                }, 500)
            }
        }
    }, [loading])

    return (
        internalLoading ? (
            <Row>
                <Col xs={12} sm={6} lg={3}>
                    <div className="rc-card-loader">
                        <Skeleton height={300}/>
                    </div>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <div className="rc-card-loader">
                        <Skeleton height={300}/>
                    </div>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <div className="rc-card-loader">
                        <Skeleton height={300}/>
                    </div>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <div className="rc-card-loader">
                        <Skeleton height={300}/>
                    </div>
                </Col>
            </Row>
        ) : (
            <Row>
                {recentObservation?.latest_observation?.splice(0, 4)?.map((cardItems, index) => {
                    return (
                        <Col key={index} xs={12} sm={6} lg={3} className="mb-4">
                            <Suspense fallback={<div></div>}>
                                <ObservationCard cardItems={cardItems} cardData={cardItems?.images?.[0]} index={index}
                                                 userProfile={cardItems.user_data} homepage={true}
                                />
                            </Suspense>
                        </Col>
                    )
                })}
            </Row>
        )
    )
}

export default HomeObservationCard;