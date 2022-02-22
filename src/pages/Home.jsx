import "../assets/scss/component/home.scss";
import HomeBanner from "../components/HomeComponent/HomeBanner";
import HomeCounter from "../components/HomeComponent/HomeCounter";
import HomeMapSection from "../components/HomeComponent/HomeMapSection";
import HomeHowItWorks from "../components/HomeComponent/HomeHowItWorks";

const Home = () => {
  return (
    <>
      {/* ----Home Banner Start---- */}
      <HomeBanner />
      {/* ----Home Banner End---- */}
      {/* ----Home Banner Start---- */}
      <HomeCounter />
      {/* ----Home Banner End---- */}
      {/* ----- Map Section Start----- */}
      <HomeMapSection />
      {/* ----- Map Section End----- */}
      {/* ----- How It Works Section Start----- */}
      <HomeHowItWorks />
      {/* ----- How It Works Section End----- */}
      {/* -----  GetStarted Section Start----- */}
      {/*<GetStarted />*/}
      {/* ----- How It Works Section End----- */}
    </>
  );
};

export default Home;
