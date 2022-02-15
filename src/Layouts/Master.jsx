import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Master = () => {
    return(
        <>
            <Header />
            <main role="main">
                <Outlet />
            </main>
            <Footer/>
        </>
    )
}
export default Master;