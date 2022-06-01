import {Outlet} from "react-router-dom";
import {useState, useEffect, createContext} from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import Loader from "../components/Shared/Loader";

// const Header = lazy(()=> import('../components/Common/Header'))
// const Footer = lazy(()=> import('../components/Common/Footer'))
// const Loader = lazy(()=> import('../components/Shared/Loader'))

export const observationViewContext = createContext({});

const PersistLogin = (props) => {
    const {persistValue} = props;
    const [categoryList, setCategoryList] = useState([]);
    const refresh = useRefreshToken();
    const {auth, persist} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [observationListData, setObservationListData] = useState({
        active: {},
        activeType: ''
    });
    const [observationComments, setObservationComments] = useState({
        comment_count: 0
    });
    const [observationCSVId, setObservationCSVId] = useState({});
    const [recentObservation, setRecentObservation] = useState({});
    const [blogTutorial, setBlogTutorial] = useState();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                if (persist && localStorage.getItem('refresh')) {
                    await refresh();
                }
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        }
        !auth?.token?.access ? verifyRefreshToken() : setIsLoading(false);
        return () => isMounted = false;
    }, [auth, auth?.token?.access, persist, refresh])

    // useEffect(() => {
    //     // console.log(`isLoading: ${isLoading}`)
    //     // console.log(`aT: ${JSON.stringify(auth?.token?.access)}`)
    //     // console.log(`rT: ${JSON.stringify(auth?.token?.refresh)}`)
    // }, [auth?.token?.access, auth?.token?.refresh, isLoading])

    // useEffect(() => {
    //     setObservationListData((prev) => {
    //         return {
    //             ...prev,
    //             list: [],
    //         };
    //     });
    // }, [location])

    return (
        <>
            <observationViewContext.Provider value={
                {
                    recentObservation,
                    setRecentObservation,
                    observationListData,
                    setObservationListData,
                    observationComments,
                    setObservationComments,
                    categoryList,
                    setCategoryList,
                    observationCSVId,
                    setObservationCSVId,
                    blogTutorial,
                    setBlogTutorial
                }
            }>
                {!persist ? (
                    <>
                        <Header/>
                        <div className="main-content">
                            <Outlet/>
                        </div>
                        <Footer/>
                    </>
                ) : isLoading ? <Loader fixContent={true}/> : (
                    <>
                        <Header/>
                        <div className="main-content">
                            <Outlet/>
                        </div>
                        {persistValue && <Footer/>}

                    </>
                )}
            </observationViewContext.Provider>
        </>
    )
}

export default PersistLogin;