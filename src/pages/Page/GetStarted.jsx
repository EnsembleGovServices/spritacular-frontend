import {useLayoutEffect} from "react";
import "../../assets/scss/component/getstarted.scss";
import HomeHowItWorks from "../../components/Home/HomeHowItWorks";
import PageMeta from "../../meta/PageMeta";

const GetStarted = () => {
    //To scroll to top before this component is mounted in DOM.
    useLayoutEffect(() => window.scrollTo({top: 0, behavior: "smooth"}), []);

    return (
        <>
            <PageMeta
                title="Get Started"
                description="Create an account to become a part of our community. Please check out our tutorials and blog to learn more."
            />
            <HomeHowItWorks/>
        </>
    );
};

export default GetStarted;
