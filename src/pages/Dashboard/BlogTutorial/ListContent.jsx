import BlurImage from "../../../components/Common/BlurImage";
import BlogAction from "../Blog/BlogAction";
import {Col} from "reactstrap";

const ListContent = (props) => {
    const {item, type} = props;
    return item?.map((item, index) => {
        return (
            <Col key={index} sm={12} md={4} xl={3} className="mb-4">
                <div className="card h-100">
                    <div className="card-body">
                        <div className="dash-inner-card-list">
                            <BlurImage preview={item?.thumbnail_image} image={item?.thumbnail_image}
                                       alt={item?.title}/>
                        </div>
                        <div>
                            <h5 className="card-title">{item?.title.substring(0, 40) + '...'}</h5>
                        </div>
                        <div>
                            {item?.description.substring(0, 80) + '...'}
                        </div>
                    </div>
                    <div className="card-footer">
                        <div>
                            <BlogAction type={type} item={item}/>
                        </div>
                    </div>
                </div>
            </Col>
        )
    })
}
export default ListContent;