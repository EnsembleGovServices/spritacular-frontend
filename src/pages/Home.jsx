import { Suspense, lazy } from 'react';
import "../assets/scss/component/home.scss";
import Loader from "../components/Shared/Loader";

const HomeBanner = lazy(()=> import('../components/Home/HomeBanner'))
const HomeCounter = lazy(()=> import('../components/Home/HomeCounter'))
const HomeMapSection = lazy(()=> import('../components/Home/HomeMapSection'))
const GetStarted = lazy(()=> import('../components/Home/GetStarted'))



const Home = (props) => {
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
