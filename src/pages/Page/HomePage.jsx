import { useEffect, useState } from 'react';
import "../../assets/scss/component/home.scss";
import axios from "../../api/axios";
import { baseURL } from "../../helpers/url";

import HomeBanner from "../../components/Home/HomeBanner";
import HomeCounter from "../../components/Home/HomeCounter";
import HomeMapSection from "../../components/Home/HomeMapSection";
import GetStarted from "../../components/Home/GetStarted";

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [recent, setRecent] = useState(null);

    const getHomeData = async () => {
        await axios.get(baseURL.api + '/observation/home/')
            .then((response) => {
                setRecent(response?.data?.data)
                setLoading(false);
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        getHomeData().then(r => r)
    }, [])

    return (
        <>
            <HomeBanner />
            <section className="counter-main">
                <HomeCounter loading={loading} counter={recent} />
            </section>
            <HomeMapSection recent={recent} />
            <GetStarted />
        </>
    );
};

export default HomePage;
