import { Suspense, lazy } from 'react';
import "../assets/scss/component/home.scss";
// import  GoogleMapWrapper  from '../components/GoogleMapWrapper';
import Notification from "../Notification";

const HomeBanner = lazy(()=> import('../components/Home/HomeBanner'))
const HomeCounter = lazy(()=> import('../components/Home/HomeCounter'))
const HomeMapSection = lazy(()=> import('../components/Home/HomeMapSection'))
const GetStarted = lazy(()=> import('../components/Home/GetStarted'))

const Home = (props) => {
    // this.props = props;
    return (
    <>
   
        <Suspense fallback={''}>
            <HomeBanner />
            <Notification />
        </Suspense>

        <Suspense fallback={''}>
            <HomeCounter />
        </Suspense>

        <Suspense fallback={''}>
        {/*    /!*<div style={{ margin: '100px' }}>*!/*/}
            <HomeMapSection />
		{/*	/!*</div>*!/*/}
        </Suspense>

        <Suspense fallback={''}>
            <GetStarted />
        </Suspense>

    </>
  );
};

export default Home;
