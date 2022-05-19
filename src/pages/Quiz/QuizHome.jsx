import { Button, Col, Container, Form, Label, Row } from "reactstrap";
import "../../assets/scss/component/quiz.scss";
import TopimageQuiz from "../../assets/images/banner.png";
const QuizHome = () => {
  return (
    <>
      <div className="quiz-main">
        <Container>
          <Row>
            <Col xs={12}>
              <h2 className="text-center">Start Your Quiz</h2>
              <div className="card">
                <div className="card-top-image">
                  <img src={TopimageQuiz} />
                </div>
                <div className="card-body">
                  <Form>
                    <h5 className="card-title">
                      1. Which of these walks reaches the highest altitude?
                    </h5>
                    <div className="mcq-main">
                      <Row>
                        <Col md={6}>
                          <div className="checkbox-group">
                            <input
                              id="option1"
                              name="option1"
                              type="checkbox"
                            />
                            <Label for="option1">Option One</Label>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="checkbox-group">
                            <input
                              id="option2"
                              name="option2"
                              type="checkbox"
                            />
                            <Label for="option2">Option Two</Label>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="checkbox-group">
                            <input
                              id="option3"
                              name="option3"
                              type="checkbox"
                            />
                            <Label for="option3">Option Three</Label>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="checkbox-group">
                            <input
                              id="option4"
                              name="option4"
                              type="checkbox"
                            />
                            <Label for="option4">Option Four</Label>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="bottom-btn-group">
                      <Button className="prev-btn">Prev</Button>
                      <Button>Next</Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default QuizHome;
