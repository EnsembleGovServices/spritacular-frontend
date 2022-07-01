import "../../assets/scss/component/blog.scss";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import { routeUrls } from '../../helpers/url';
import DynamicPageEditor from "../../components/Static/DynamicPageEditor";

const SpritacularGoogleGroup = () => {
    return (
        <DynamicPageEditor
            title="Spritacular Google Group"
            pageContent={`
                <h4>Spritacular Google Group</h4>
                <p>Spritacular google group is created to facilitate community discussion among
                    storm chasers, atmospheric and space electricity researchers, night sky
                    photographers, and anyone interested in participating. It is an email discussion
                    group which will also be used to disseminate project related news and
                    information.</p>
                <p>To participate, please join the <a href="https://groups.google.com/g/spritacular" target="_blank"> Spritacular Google Group.</a> 
                By participating in Spritacular google group, you are agreeing to abide by the Code of Conduct outlined under
                
                <Link to={/${routeUrls.policy}} className="d-inline-block" title="Policy">&nbsp;Policy</Link>. Group members are expected to comply with the standards of professional and ethical behavior.</p>

                <p className="my-4">
                    This group is moderated by Spritacular team members. If you have any questions or comments please email us at
                    <a href="mailto:info.spritacular@gmail.com"> info.spritacular@gmail.com</a>
                </p>

                <button class="text-center">
                    <a href="https://groups.google.com/g/spritacular" className="btn btn-secondary btn-lg px-md-5 px-3 get-start" rel="noreferrer" target="_blank">Join Spritacular Google Group</a>
                </button>
            `}
        />
        // <div className="blog_page">
        //     <div className="common-banner"></div>
        //     <section className="blog-main">
        //         <div className="container">
        //             <h2 className="text-center">Spritacular Google Group</h2>
        //             <Row className="">
        //                 <Col md={12}>
        //                     <Card className="border-0 shadow-sm">
        //                         <CardBody className="p-md-5 p-4">
        //                             <h4 className="mb-3">Spritacular Google Group</h4>
        //                             <p>Spritacular google group is created to facilitate community discussion among
        //                                 storm chasers, atmospheric and space electricity researchers, night sky
        //                                 photographers, and anyone interested in participating. It is an email discussion
        //                                 group which will also be used to disseminate project related news and
        //                                 information.</p>
        //                             <p>To participate, please join the <a href="https://groups.google.com/g/spritacular" target="_blank"> Spritacular Google Group.</a> By participating in Spritacular google group, you are agreeing to abide by the Code of Conduct outlined under
        //                                 <Link to={`/${routeUrls.policy}`} className="d-inline-block" title="Policy">&nbsp;Policy</Link>. Group members are expected to comply with the standards of professional and ethical behavior.</p>

        //                             <p className="my-4">
        //                                 This group is moderated by Spritacular team members. If you have any questions or comments please email us at
        //                                 <a href="mailto:info.spritacular@gmail.com"> info.spritacular@gmail.com</a>
        //                             </p>

        //                             <div className="text-center">
        //                                 <a href="https://groups.google.com/g/spritacular" className="btn btn-secondary btn-lg px-md-5 px-3 get-start" rel="noreferrer" target="_blank">Join Spritacular Google Group</a>
        //                             </div>


        //                         </CardBody>
        //                     </Card>
        //                 </Col>
        //             </Row>
        //         </div>
        //     </section>
        // </div>
    )
}

export default SpritacularGoogleGroup;