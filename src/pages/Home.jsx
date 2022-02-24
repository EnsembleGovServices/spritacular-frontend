import "../assets/scss/component/home.scss";
import HomeBanner from "../components/Home/HomeBanner";
import HomeCounter from "../components/Home/HomeCounter";
import HomeMapSection from "../components/Home/HomeMapSection";
import GetStarted from "../components/Home/GetStarted";

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

      {/* -----  GetStarted Section Start----- */}
      <GetStarted />
      {/* ----- How It Works Section End----- */}
    </>
  );
};

export default Home;
