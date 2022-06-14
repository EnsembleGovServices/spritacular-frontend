import { useLayoutEffect } from "react";
import "../../assets/scss/component/getstarted.scss";
import HomeHowItWorks from "../../components/Home/HomeHowItWorks";

const GetStarted = () => {
  //To scroll to top before this component is mounted in DOM.
  useLayoutEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);

  return (
    <>
      {/* ----- How It Work Section Start----- */}
      <HomeHowItWorks />
      {/* ----- How IT Work Section End----- */}
    </>
  );
};

export default GetStarted;
