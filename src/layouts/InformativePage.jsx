import { useEffect } from 'react';
import { Outlet } from "react-router-dom";

const InformativePage = (props) => {
    const {setAuthValue} = props;
    
    useEffect(()=>{
        setAuthValue(true);
    }, [setAuthValue])

    return (
        <Outlet />
    );
}

export default InformativePage;