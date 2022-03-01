import { Suspense, lazy } from 'react';
import "../assets/scss/component/home.scss";
// import  GoogleMapWrapper  from '../components/GoogleMapWrapper';

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
        </Suspense>

        <Suspense fallback={''}>
            <HomeCounter />
        </Suspense>

        <Suspense fallback={''}>
        <div style={{ margin: '100px' }}>
				{/* <HomeMapSection
					google={props.google}
					center={{lat: 18.5204, lng: 73.8567}}
					height='300px'
					zoom={15}
				/> */}
			</div>
            {/* <HomeMapSection google={window.google}/> */}
        </Suspense>

        <Suspense fallback={''}>
            <GetStarted />
        </Suspense>

    </>
  );
};

export default Home;
