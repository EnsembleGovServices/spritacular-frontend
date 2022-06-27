import {Outlet} from "react-router-dom";
import {useState, useEffect, createContext, lazy, Suspense} from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const Header = lazy(() => import('../components/Common/Header'))
const Footer = lazy(() => import('../components/Common/Footer'))

export const observationViewContext = createContext({});

const PersistLogin = (props) => {
    const {persistValue} = props;
    const [categoryList, setCategoryList] = useState([]);
    const refresh = useRefreshToken();
    const {auth, persist, setPersist} = useAuth();
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

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                if (persist && localStorage.getItem('refresh')) {
                    await refresh();
                }
            } catch (err) {
                if (err?.response?.status === 401) {
                    localStorage.setItem('persist', false);
                    localStorage.removeItem('refresh');
                    setPersist(false);
                }
            } finally {
                isMounted && setIsLoading(false);
            }
        }
        !auth?.token?.access ? verifyRefreshToken() : setIsLoading(false);
        return () => isMounted = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth?.token?.access]);

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
                }
            }>
                {!persist ? (
                    <>
                        <Suspense fallback={<div></div>}>
                            <Header/>
                        </Suspense>
                        <div className="main-content" id="main-content">
                            <Outlet/>
                        </div>
                        <Suspense fallback={<div></div>}>
                            <Footer/>
                        </Suspense>
                    </>
                ) : isLoading ? <div/> : (
                    <>
                        <Suspense fallback={<div></div>}>
                            <Header/>
                        </Suspense>
                        <div className="main-content" id="main-content">
                            <Outlet/>
                        </div>
                        <Suspense fallback={<div></div>}>
                            {persistValue && <Footer/>}
                        </Suspense>
                    </>
                )}
            </observationViewContext.Provider>
        </>
    )
}

export default PersistLogin;