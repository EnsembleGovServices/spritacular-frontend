import {Suspense, lazy, useEffect, useState} from 'react';
import "../assets/scss/component/home.scss";
import Loader from "../components/Shared/Loader";
import axios from "../api/axios";
import {baseURL} from "../helpers/url";

import useObservationsData from "../hooks/useObservationsData";
const HomeBanner = lazy(()=> import('../components/Home/HomeBanner'))
const HomeCounter = lazy(()=> import('../components/Home/HomeCounter'))
const HomeMapSection = lazy(()=> import('../components/Home/HomeMapSection'))
const GetStarted = lazy(()=> import('../components/Home/GetStarted'))

const Home = (props) => {

    const { setRecentObservation } = useObservationsData();
    const getHomeData = () => {
      return axios.get(baseURL.api+'/observation/home/')
          .then(response => {
              setRecentObservation(response?.data?.data)
          })
          .catch(error => {
              console.log(error)
          })
    }

    useEffect(()=> {
        getHomeData().then(r=>r)
    }, [])

    return (
    <>
        <Suspense fallback={<Loader fixContent={true} />}>
            <HomeBanner />
        </Suspense>

        <Suspense fallback={''}>
            <HomeCounter />
        </Suspense>

        <Suspense fallback={''}>
            <HomeMapSection />
        </Suspense>

        <Suspense fallback={''}>
            <GetStarted />
        </Suspense>

    </>
  );
};

export default Home;
