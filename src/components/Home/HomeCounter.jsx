import {Container, Row, Col} from "reactstrap";
import {Suspense, lazy, useState, useLayoutEffect} from 'react';

import Skeleton from "react-loading-skeleton";
import {cdn} from "../../helpers/url";

const Counter = lazy(() => import('../../helpers/counter'))


const HomeCounter = (props) => {
    const {loading, counter} = props;
    const userCount = counter?.observation_user_count,
        observationCount = counter?.observation_count,
        countriesCount = counter?.observation_country_count;

    const [internalLoading, setInternalLoading] = useState(loading);

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
        <Container>
            <Row>
                <Col md={4} sm={6}>
                    <div className="counter-inner">
                        {internalLoading &&
                            <div className="counter-loader">
                                <Skeleton height={80}/>
                            </div>
                        }

                        <div className="left-image">
                            <img width={50} height={50} src={`${cdn.url}/users.png`} alt="Users"/>
                        </div>
                        <div className="right-counter">
                            <Suspense fallback={<div></div>}>
                                <Counter end={userCount} speed={1}/>
                            </Suspense>
                            <p>Volunteers</p>
                        </div>
                    </div>
                </Col>
                <Col md={4} sm={6}>
                    <div className="counter-inner">
                        {internalLoading &&
                            <div className="counter-loader">
                                <Skeleton height={80}/>
                            </div>
                        }
                        <div className="left-image">
                            <img width={50} height={50} src={`${cdn.url}/submit.png`} alt="observations"/>
                        </div>
                        <div className="right-counter">
                            <Suspense fallback={<div></div>}>
                                <Counter end={observationCount} speed={1}/>
                            </Suspense>
                            <p>Observations</p>
                        </div>
                    </div>
                </Col>
                <Col md={4} sm={12}>
                    <div className="counter-inner">
                        {internalLoading &&
                            <div className="counter-loader">
                                <Skeleton height={80}/>
                            </div>
                        }
                        <div className="left-image">
                            <img width={50} height={50} src={`${cdn.url}/country.png`} alt="country"/>
                        </div>
                        <div className="right-counter">
                            <Suspense fallback={<div></div>}>
                                <Counter end={countriesCount} speed={1}/>
                            </Suspense>
                            <p>Countries</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
export default HomeCounter;
