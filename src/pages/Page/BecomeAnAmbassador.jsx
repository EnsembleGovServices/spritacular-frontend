
import "../../assets/scss/component/blog.scss";
import { Card, CardBody, Col, Row } from "reactstrap";
import DynamicPageEditor from "../../components/Static/DynamicPageEditor";

const BecomeAnAmbassador = () => {

    return (
        <DynamicPageEditor
            title="Become an Ambassador"
            pageContent={`
                <h4 className="mb-3">Become an Ambassador</h4>
                <p>It is wonderful to see that you want to be more involved with Spritacular!</p>
                <p>We are seeking volunteer Ambassadors to promote Spritacular in their
                    communities and help shape the future of this project.</p>

                <p className="my-4">
                    If you are interested in becoming a Spritacular Ambassador, please send us an email at
                    <a href="mailto:info.spritacular@gmail.com"> info.spritacular@gmail.com</a> with the subject line “Ambassador” to receive the application form.
                </p>

                <p className="mb-0">Thank you for your support!</p>
            `}
        />
        // <div className="blog_page">
        //     <div className="common-banner"></div>
        //     <section className="blog-main">
        //         <div className="container">
        //             <h2 className="text-center">Become an Ambassador</h2>
        // <Row className="">
        //     <Col md={12}>
        //         <Card className="border-0 shadow-sm">
        //             <CardBody className="p-md-5 p-4">
        //                 <h4 className="mb-3">Become an Ambassador</h4>
        //                 <p>It is wonderful to see that you want to be more involved with Spritacular!</p>
        //                 <p>We are seeking volunteer Ambassadors to promote Spritacular in their
        //                     communities and help shape the future of this project.</p>

        //                 <p className="my-4">
        //                     If you are interested in becoming a Spritacular Ambassador, please send us an email at
        //                     <a href="mailto:info.spritacular@gmail.com"> info.spritacular@gmail.com</a> with the subject line “Ambassador” to receive the application form.
        //                 </p>

        //                 <p className="mb-0">Thank you for your support!</p>

        //             </CardBody>
        //         </Card>
        //     </Col>
        // </Row>
        //         </div>
        //     </section>
        // </div>
    )
}

export default BecomeAnAmbassador;