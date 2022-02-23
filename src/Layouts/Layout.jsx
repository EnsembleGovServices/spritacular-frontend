import { Outlet } from "react-router-dom"
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Layout = () => {
    return (
        <>

            <Header />
            <main className="App">
                <Outlet />
            </main>
            <Footer/>
        </>
    )
}

export default Layout;