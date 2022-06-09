import "../../assets/scss/component/blog.scss";
import {Card, CardBody, Col, Row} from "reactstrap";
import {useEffect, useRef} from "react";
import {useSearchParams} from "react-router-dom";
const Policy = () => {
  let searchParams, codeOfConduct, scrollToRef, executeScroll;
  [searchParams] = useSearchParams();
  codeOfConduct = useRef(null);
  scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop + 120);
  executeScroll = () => {
    scrollToRef(codeOfConduct);
  };
  useEffect(() => {
    let code = searchParams.get('code');
    if (code) {
      setTimeout(function () {
        executeScroll();
      }, 100)
    }
  }, [searchParams])
  return(
      <div className="blog_page">
        <div className="common-banner"></div>
        <section className="blog-main">
          <div className="container">
            <h2 className="text-center">Spritacular Policy</h2>
            <Row  className="g-4">
              <Col md={12}>
                <Card className="border-0 shadow-sm">
                  <CardBody className="p-md-5 p-4">
                    <h4>User Agreement</h4>
                    <p>
                      This document describes in detail how the project will use and protect your contributions.
                      The terms outlined here are subject to modification without any direct prior notice to users. <br />
                      <i>Utility of Spritacular website and its contents constitute your binding acceptance of these terms, including any modifications.</i>
                    </p>
                    <p>
                      Spritacular project strives to establish a diverse global community working together towards a common
                      goal - advancement of scientific knowledge of TLEs. Our goal is to create and maintain a welcoming, safe,
                      collaborative, and supportive environment for everybody, regardless of scholarly or professional background,
                      gender identity and expression, sexual orientation, ability, physical appearance, race, age, economic background,
                      country of origin or employment, religion, and other differences. Spritacular community members are expected to
                      comply with the standards of professional and ethical behavior.
                      <i> By participating in Spritacular project,
                        you are agreeing to abide by the following Code of Conduct.</i>
                    </p>

                    <ul className="list-numbered" ref={codeOfConduct}>
                      <li>
                        <div className="heading">
                          <h6>We listen</h6>
                          <p>
                            We begin interactions by remembering that we are part of a community with common goals.
                          </p>
                        </div>
                        <ul className="list-bullet">
                          <li>We listen to each other.</li>
                          <li>For active listening, we ask questions first, instead of making statements.</li>
                          <li>We give people time and space to respond.</li>
                        </ul>
                      </li>

                      <li>
                        <div className="heading">
                          <h6>We make efforts to converge in a common space.</h6>
                          <p>
                            We all need to make efforts to maintain respectful communication in all directions.
                          </p>
                        </div>
                        <ul className="list-bullet">
                          <li>We encourage you to not use all capital letters when communicating or internet acronyms (such as 'LOL') as they may not be globally understood.</li>
                          <li>Strive to use simple language while explaining scientific concepts</li>
                          <li>Be concise and clear in your inquiries.</li>
                          <li>In group email communications, do not send spurious one-line responses that can effectively "spam" hundreds of people.</li>
                        </ul>
                      </li>

                      <li>
                        <div className="heading">
                          <h6>We follow guidelines of online community behavior.</h6>
                          <p>
                            Online modes of interaction involve large numbers of people without the helpful presence of gestural, expression, and tonal cues regarding consent.
                          </p>
                        </div>
                        <ul className="list-bullet">
                          <li>Treat everyone with respect.</li>
                          <li>Do not use aggressive, disrespectful, mocking, and off-color tones in your posts.</li>
                          <li>Communicate openly and thoughtfully with others.</li>
                          <li>Be considerate of the multitude of views and opinions that are different from yours.</li>
                          <li>Be respectful and thoughtful in your critique of ideas.</li>
                          <li>Speak your own narrative, from your own unique experiences. Do not speak for others.</li>
                        </ul>
                      </li>


                      <li>
                        <div className="heading">
                          <h6>We do not tolerate harassment or shaming in any form.</h6>
                          <p>
                            Online modes of interaction involve large numbers of people without the helpful presence of gestural, expression, and tonal cues regarding consent.
                          </p>
                        </div>
                        <ul className="list-bullet">
                          <li>Harassment and intimidation, including any verbal or written conduct that threatens, intimidates, or coerces a community member.</li>
                          <li>Discrimination based on gender or gender identity, sexual orientation, age, ability, physical appearance, body size, race, religion, national origin, or culture.</li>
                          <li>Verbal abuse of any community member.</li>
                          <li>Use of nudity and/or inappropriate images on the website. </li>
                          <li>Uploading photos of others on the website without their consent.</li>
                          <li>Disrespectful disruption of a discussion.</li>
                        </ul>
                      </li>


                      <li>
                        <div className="heading">
                          <h6>Project Contributions by Registered Users</h6>
                          <p>
                            One of the major project goals of Spritacular is to utilize volunteer contributions (including images) for the advancement of scientific research. Therefore, if you contribute to this project:
                          </p>
                        </div>
                        <ul className="list-bullet">
                          <li>
                            You grant us and our collaborators in various scientific communities permission to use your contributions towards furthering the project goal stated above, trusting us to be responsible with your data.
                          </li>
                          <li>
                            You still retain full ownership of the individual contributions you make, therefore, you have the rights of use, distribution and/or modification of your data. However, you do not possess ownership of the dataset produced by Spritacular project.
                          </li>
                          <li>Do not submit data that you do not own!</li>
                        </ul>
                      </li>

                      <li>
                        <div className="heading">
                          <h6>Project Data Usage for Research Purposes</h6>
                          <p>
                            Spritacular project is developed and managed by a dedicated team and its value primarily derived from volunteer contributions to the platform. Any researcher using Spritacular database in their scientific research is required to:
                          </p>
                        </div>
                        <ul className="list-bullet">
                          <li>Contact the Spritacular team to discuss credit and, if the results substantially depend on the project database, authorship.</li>
                          <li>Give appropriate credit to volunteers who have contributed.</li>
                        </ul>
                        <p className="mt-4">
                          We believe that together, we can better understand these magnificent atmospheric phenomena and in turn the world around us. We thank you for your participation!
                        </p>
                        <p>
                          Please feel free to contact us with any questions/comments at <a href="mailto:info.spritacular@gmail.com" rel="noreferrer" target="_blank" referrerPolicy="no-referrer"> info.spritacular@gmail.com</a>
                        </p>
                      </li>
                    </ul>

                    <h5 className="mt-5">
                      References
                    </h5>
                    <p className="mb-0">
                      The Code of Conduct has been developed by the Spritacular team and largely drawn from other Codes of Conduct, including those by the
                      <a href="https://citizenscience.org/home/events/conferences/citsci2019/code-of-conduct/" rel="noreferrer" target="_blank" referrerPolicy="no-referrer">Citizen Science Association</a>,
                      <a href="https://openhardware.science/gosh-2017/gosh-code-of-conduct/" rel="noreferrer" target="_blank" referrerPolicy="no-referrer">
                        Gathering for Open Science Hardware
                      </a>,
                      <a href="https://conbio.org/mini-sites/imcc-2016/registration-participation/code-of-conduct/" rel="noreferrer" target="_blank" referrerPolicy="no-referrer"> International Congress of Marine Conservation 2016</a>,
                      <a href="https://publiclab.org/conduct" rel="noreferrer" target="_blank" referrerPolicy="no-referrer">Public Lab</a>, and <a
                        href="https://www.transhack.org/" rel="noreferrer" target="_blank" referrerPolicy="no-referrer">TransH4CK</a>. The user agreement on project contributions is developed following the best practices from
                      <a href="https://www.aurorasaurus.org/" rel="noreferrer" target="_blank" referrerPolicy="no-referrer"> Aurorasaurus</a> project.
                    </p>

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </section>
      </div>
  )
}
export default Policy;