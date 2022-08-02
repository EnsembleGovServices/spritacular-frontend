import {useEffect, useState} from 'react';
import "../../assets/scss/component/home.scss";
import axios from "../../api/axios";
import {baseURL} from "../../helpers/url";

import HomeBanner from "../../components/Home/HomeBanner";
import HomeCounter from "../../components/Home/HomeCounter";
import HomeMapSection from "../../components/Home/HomeMapSection";
import GetStarted from "../../components/Home/GetStarted";
import PageMeta from "../../meta/PageMeta";

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [recent, setRecent] = useState(null);

    // To get four latest observations for home page.
    const getHomeData = async () => {
        await axios.get(baseURL.api + '/observation/home/')
            .then((response) => {
                setRecent(response?.data?.data)
                setLoading(false);
            })
            .catch(error => {
                process.env.NODE_ENV === "development" && console.log('HomeData Error:', error.message)
            })
    }

    // For getHomeData func call after mount
    useEffect(() => {
        getHomeData().then(r => r)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <PageMeta
                title="Explore Observations"
                description="Join the chase of Transient Luminous Events (TLEs) from the ground, engage with a global community of observers, and contribute your observations of TLEs for NASA Science!"
                imageLink={recent?.latest_observation[0]?.images[0]?.image}
            />
            <HomeBanner/>
            <section className="counter-main">
                <HomeCounter loading={loading} counter={recent}/>
            </section>
            <HomeMapSection recent={recent}/>
            <GetStarted/>
        </>
    );
};

export default HomePage;
