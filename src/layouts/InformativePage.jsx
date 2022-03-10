import { Outlet } from "react-router-dom";

const InformativePage = (props) => {
    const {setAuthValue} = props;
    
    setAuthValue(true);

    return (
        <Outlet />
    );
}

export default InformativePage;