import { Container, Form, FormGroup, Label } from "reactstrap";
import { Icon } from "@iconify/react";
import "../assets/scss/component/initialUploadobservations.scss";
import Images from "../static/images";
import {Link, useNavigate} from "react-router-dom";
import { routeUrls } from './../helpers/url';
import useObservations from "../hooks/useObservations";
import {useEffect, useState} from "react";
const InitialUploadObservations = () => {
  const navigate = useNavigate();
  const {setObservationImages, setObservationSteps, setObservationData} = useObservations();
  const [isCleanUp, setIsCleanUp] = useState(false);

  const handleObvAdd = (e) => {
    e.preventDefault();
    setIsCleanUp(true);
    return navigate('/'+routeUrls.observationsAdd);
  }


  useEffect(()=> {
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
  }, [isCleanUp])


  return (
    <>
      <section className="upload-observation-main">
        <div className="upload-ob-inner">
          <Form>
            <FormGroup>
              <Label htmlFor="UploadFile">
                <div className="upload-info">
                  <img
                    src={Images.UploadPlaceholder}
                    alt="UploadPlaceholder"
                  />
                  <p>No observations yet.</p>
                  <button onClick={(e)=> handleObvAdd(e)} className="btn btn-secondary">
                    <Icon icon="heroicons-outline:upload"  width="25" height="22" /> Upload
                    Observation
                  </button>
                </div>
              </Label>
            </FormGroup>
          </Form>
        </div>
      </section>
    </>
  );
};

export default InitialUploadObservations;
