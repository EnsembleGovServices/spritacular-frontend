import {Suspense, lazy, useEffect, useState} from 'react';
import "../assets/scss/component/home.scss";
import axios from "../api/axios";
import {baseURL} from "../helpers/url";

import useObservationsData from "../hooks/useObservationsData";

const HomeBanner = lazy(() => import('../components/Home/HomeBanner'))
const HomeCounter = lazy(() => import('../components/Home/HomeCounter'))
const HomeMapSection = lazy(() => import('../components/Home/HomeMapSection'))
const GetStarted = lazy(() => import('../components/Home/GetStarted'))

const Home = () => {
    const [loading, setLoading] = useState(true);
    const {setRecentObservation, recentObservation} = useObservationsData();

    const getHomeData = () => {
        return axios.get(baseURL.api + '/observation/home/')
            .then(response => {
                setRecentObservation(response?.data?.data)
                setLoading(false);
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        setLoading(true);
        getHomeData().then(r => r)
    }, [])

    return (
        <>
            <Suspense fallback={''}>
                <HomeBanner/>
            </Suspense>

            <Suspense fallback={''}>
                <section className="counter-main">
                    <HomeCounter loading={loading} counter={recentObservation}/>
                </section>
            </Suspense>

            <Suspense fallback={''}>
                <HomeMapSection loading={loading}/>
            </Suspense>

            <Suspense fallback={''}>
                <GetStarted/>
            </Suspense>
        </>
    );
};

export default Home;
