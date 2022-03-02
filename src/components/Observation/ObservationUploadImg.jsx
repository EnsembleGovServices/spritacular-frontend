import { Row, Col, FormGroup,Button, Input,Label } from "reactstrap";
import Images from "../../static/images";
import useObservations from "../../hooks/useObservations";
import "../../assets/scss/component/uploadObservationImage.scss";
import { Icon } from '@iconify/react';

const ObservationUploadImg = (props) =>{
    const {multiple, maxLimit, imageFormat}=props;
    const {setObservationImages} = useObservations();

    const handleObservationUploadImage = (e) => {
        const file = multiple ? e.target.files : e.target.files[0];
        setObservationImages(file);
        console.log(file);
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
                            <Icon icon="bx:image-alt" color="#737e96" width="42" height="42" className="mb-3" />
                            <p className="mb-1" >Drag and drop images or click to upload</p>
                            {
                              maxLimit === true ? <span className="text-black">Max. Image Size: 5MB</span> : ''
                            }
                            {
                              imageFormat === true ? (
                                <ul>
                                  <li>
                                    Common Image File Formats (JPEG or
                                    JPG, PNG, TIFF)
                                  </li>
                                </ul>
                              ) : ''
                            }
                            
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
                <Button disabled className="mt-5">Continue</Button>
              </Col>
            </Row>
        </>
    )
}
export default ObservationUploadImg;