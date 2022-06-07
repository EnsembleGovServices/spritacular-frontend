import "../../assets/scss/component/initialUploadobservations.scss";
import {Container, Form, FormGroup, Label} from "reactstrap";
import {Icon} from "@iconify/react";
import {useNavigate} from "react-router-dom";
import {routeUrls} from '../../helpers/url';
import useObservations from "../../hooks/useObservations";
import {useEffect, useState} from "react";
import UploadImageUI from "../../components/Shared/UploadImageUI";

const InitialUploadObservations = (props) => {
    const {count} = props;
    const navigate = useNavigate();
    const {setObservationImages, setObservationSteps, setObservationData} = useObservations();
    const [isCleanUp, setIsCleanUp] = useState(false);

    const handleObvAdd = (e) => {
        e.preventDefault();
        setIsCleanUp(true);
        return navigate('/' + routeUrls.observationsAdd);
    }


    useEffect(() => {
        setObservationSteps({
            total: 3,
            active: 1,
            mode: {
                update: true,
                id: false
            },

        })
        setObservationImages([])
        setObservationData(null)
    }, [isCleanUp, setObservationData, setObservationImages, setObservationSteps])


    return (
        count?.total === 0 ? (
            <section
                className="center_box">
                <Container>
                    <UploadImageUI
                        handleObvAdd={handleObvAdd}
                        defaultUploadBox={true}
                    />
                </Container>
            </section>
        ) : ('')
    );
};

export default InitialUploadObservations;
