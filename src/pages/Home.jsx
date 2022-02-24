import { Suspense, lazy } from 'react';

import "../assets/scss/component/home.scss";

const HomeBanner = lazy(()=> import('../components/Home/HomeBanner'))
const HomeCounter = lazy(()=> import('../components/Home/HomeCounter'))
const HomeMapSection = lazy(()=> import('../components/Home/HomeMapSection'))
const GetStarted = lazy(()=> import('../components/Home/GetStarted'))

const Home = () => {
  return (
    <>
        <Suspense fallback={''}>
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
