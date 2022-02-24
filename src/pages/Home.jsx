import { Suspense, lazy } from 'react';

import "../assets/scss/component/home.scss";

const HomeBanner = lazy(()=> import('../components/Home/HomeBanner'))
const HomeCounter = lazy(()=> import('../components/Home/HomeCounter'))
const HomeMapSection = lazy(()=> import('../components/Home/HomeMapSection'))
const GetStarted = lazy(()=> import('../components/Home/GetStarted'))

const Home = () => {
  return (
    <>
        <Suspense fallback={<div>Loading...</div>}>
            <HomeBanner />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
            <HomeCounter />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
            <HomeMapSection />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
            <GetStarted />
        </Suspense>

    </>
  );
};

export default Home;
