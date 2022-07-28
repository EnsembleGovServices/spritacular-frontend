import BlurImage from "../../../components/Common/BlurImage";
import BlogAction from "../Blog/BlogAction";
import {Col} from "reactstrap";
import {useState} from "react";

const ListContent = (props) => {
    const {item, type} = props;
    // eslint-disable-next-line
    const [loaderLoading, setLoaderLoading] = useState(true);

    const handleLoaderLoading = (state) => {
        setLoaderLoading(state);
    };

    return item?.map((item, index) => {
        return (
            <Col key={index} sm={12} md={4} xl={3} className="mb-4">
                <div className="card h-100">
                    <div className="card-body">
                        <div className="dash-inner-card-list">
                            <BlurImage loaderLoading={handleLoaderLoading} preview={item?.thumbnail_image}
                                       image={item?.thumbnail_image}
                                       alt={item?.title}/>
                        </div>
                        {!loaderLoading &&
                            <div className="mt-3">
                                <h5 className="card-title">{item?.title.substring(0, 40) + '...'}</h5>
                                <p className="mb-0">
                                    {item?.description.substring(0, 80) + '...'}
                                </p>
                            </div>
                        }
                    </div>
                    {!loaderLoading &&
                        <div className="card-footer">
                            <div>
                                <BlogAction type={type} item={item}/>
                            </div>
                        </div>
                    }
                </div>
            </Col>
        )
    })
}
export default ListContent;