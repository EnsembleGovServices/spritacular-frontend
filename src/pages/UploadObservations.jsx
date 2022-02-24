import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { Icon } from "@iconify/react";
import "../assets/scss/component/uploadobservations.scss";
import Images from "../static/images";
const UploadObservations = () => {
  return (
    <>
      <section className="upload-observation-main">
        <Container>
          <div className="upload-ob-inner">
            <Form>
              <FormGroup>
                <Label for="UploadFile">
                  <div className="upload-info">
                    <img
                      src={Images.UploadPlaceholder}
                      alt="UploadPlaceholder"
                    />
                    <p>No observations yet.</p>
                    <span className="btn btn-secondary">
                      <Icon icon="bx:upload" width="25" height="22" /> Upload
                      Observation
                    </span>
                  </div>
                </Label>
                <Input type="file" name="file" id="UploadFile" />
              </FormGroup>
            </Form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default UploadObservations;
