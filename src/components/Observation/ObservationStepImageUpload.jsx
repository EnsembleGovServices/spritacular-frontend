import { Row, Col, FormGroup,Button, Input,Label } from "reactstrap";
import ObservationImages from "./ObservationImages";
import Images from "../../static/images";
// import "../../assets/scss/component/uploadobservationform.scss";
const ObservationStepImageUpload = () =>{
    return (
        <>
            <Row>
              <Col sm="12">
                <div className="upload-observation-main">
                  <div className="upload-ob-inner">
                      <FormGroup>
                        <Label htmlFor="UploadFile">
                          <div className="upload-info">
                            <img
                              src={Images.UploadPlaceholder}
                              alt="UploadPlaceholder"
                            />
                            <p>
                              Drag and drop images or click to upload
                            </p>
                            <span>Max. Image Size: 5MB</span>
                            <ul>
                              <li>
                                Common Image File Formats (JPEG or
                                JPG, PNG, TIFF)
                              </li>
                            </ul>
                          </div>
                        </Label>
                        <Input
                          type="file"
                          name="file"
                          id="UploadFile"
                        />
                      </FormGroup>
                  </div>
                </div>
                <Button disabled className="cnt-btn">Continue</Button>
              </Col>
              <Col sm="12">
                <div className="upload-multiple-observation">
                    <ObservationImages />
                </div>
              </Col>
            </Row>
        </>
    )
}
export default ObservationStepImageUpload;