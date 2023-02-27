import { Container, Row, Col } from "reactstrap";
import { useState, useLayoutEffect } from 'react';
import Skeleton from "react-loading-skeleton";
import { cdn } from "../../helpers/url";
import Counter from "../../helpers/counter";

const HomeCounter = (props) => {
    const { loading, counter } = props;
    const userCount = counter?.observation_user_count,
        observationCount = counter?.observation_count,
        countriesCount = counter?.observation_country_count;

    const [internalLoading, setInternalLoading] = useState(loading);

    // For showing pre-loader initially.
    useLayoutEffect(() => {
        if (loading) {
            setTimeout(function () {
                setInternalLoading(false);
            }, 1000)
        }
    }, [loading]);

    return (
        <Container>
            {(!loading && userCount && observationCount && countriesCount) && (<Row>
                <Col md={4} sm={6}>
                    <div className="counter-inner">
                        {internalLoading &&
                            <div className="counter-loader">
                                <Skeleton height={80} />
                            </div>
                        }
                        <div className="left-image">
                            <img width={50} height={50} src={`${cdn.url}/users.png`} alt="Users" />
                        </div>
                        <div className="right-counter">
                            <Counter end={userCount} speed={1} />
                            <p>Volunteers</p>
                        </div>
                    </div>
                </Col>
                <Col md={4} sm={6}>
                    <div className="counter-inner">
                        {internalLoading &&
                            <div className="counter-loader">
                                <Skeleton height={80} />
                            </div>
                        }
                        <div className="left-image">
                            <img width={50} height={50} src={`${cdn.url}/submit.png`} alt="observations" />
                        </div>
                        <div className="right-counter">
                            <Counter end={observationCount} speed={1} />
                            <p>Observations</p>
                        </div>
                    </div>
                </Col>
                <Col md={4} sm={12}>
                    <div className="counter-inner">
                        {internalLoading &&
                            <div className="counter-loader">
                                <Skeleton height={80} />
                            </div>
                        }
                        <div className="left-image">
                            <img width={50} height={50} src={`${cdn.url}/country.png`} alt="country" />
                        </div>
                        <div className="right-counter">
                            <Counter end={countriesCount} speed={1} />
                            <p>Countries</p>
                        </div>
                    </div>
                </Col>
            </Row>)}
        </Container>
    );
};
export default HomeCounter;
