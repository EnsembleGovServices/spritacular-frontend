import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
const UploadObservations = () => {
  return (
    <>
      <section className="upload-observation-main">
        <Container>
          <div className="upload-ob-inner">
            <Form>
              <FormGroup>
                <Label for="exampleFile">
                  <Button>Upload Observation</Button>
                </Label>
                <Input type="file" name="file" id="exampleFile" />
              </FormGroup>
            </Form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default UploadObservations;
