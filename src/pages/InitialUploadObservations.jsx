import { Container, Form, FormGroup, Label } from "reactstrap";
import { Icon } from "@iconify/react";
import "../assets/scss/component/initialUploadobservations.scss";
import Images from "../static/images";
import { Link } from "react-router-dom";
import { routeUrls } from './../helpers/url';
const InitialUploadObservations = () => {
  return (
    <>
      <section className="upload-observation-main">
        <Container>
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
                    <Link to={'/'+routeUrls.observationsAdd} className="btn btn-secondary">
                      <Icon icon="heroicons-outline:upload"  width="25" height="22" /> Upload
                      Observation
                    </Link>
                  </div>
                </Label>
              </FormGroup>
            </Form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default InitialUploadObservations;
