import { Row, Col, FormGroup,Button, Input,Label } from "reactstrap";
import Images from "../../static/images";
import useObservations from "../../hooks/useObservations";

const ObservationUploadImg = (props) =>{
    const {multiple}=props;
    const {setObservationImages} = useObservations();

    const handleObservationUploadImage = (e) => {
        const file = multiple ? e.target.files : e.target.files[0];
        console.log(file);
        setObservationImages(file);
    };

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
                          multiple={multiple}
                          onChange={(e)=> handleObservationUploadImage(e)}
                        />
                      </FormGroup>
                  </div>
                </div>
                <Button disabled className="cnt-btn">Continue</Button>
              </Col>
            </Row>
        </>
    )
}
export default ObservationUploadImg;