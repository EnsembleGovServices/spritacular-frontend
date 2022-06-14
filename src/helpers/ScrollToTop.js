import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        console.log("hiiii");
        window.scrollTo(0, 0);
        document
            .getElementsByClassName("main-content")[0]
            ?.scroll({ top: 0, behavior: "smooth" })
    }, [pathname]);

    return null;
}