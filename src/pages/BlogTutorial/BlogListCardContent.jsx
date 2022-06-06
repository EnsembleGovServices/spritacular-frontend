import { Link } from "react-router-dom";
import BlurImage from "../../components/Common/BlurImage";
import { useState } from "react";

const BlogListCardContent = (props) => {
  const { item, large } = props;
  const [loaderLoading, setLoaderLoading] = useState(true);

  const handleLoaderLoading = (state) => {
    setLoaderLoading(state);
  };

  return (
    <div className="position-relative">
      <Link
        to={`${item?.slug ? item?.slug : ""}`}
        className={`${large ? "main-blog" : "blog-small"} d-block`}
      >
        <BlurImage
          loaderLoading={handleLoaderLoading}
          image={item?.thumbnail_image}
          preview={item?.thumbnail_image}
          alt={item?.title}
        />
        {!loaderLoading && (
          <div className="blog-text">
            <p className="text-uppercase">{item?.category_name}</p>
            <h3>{item?.title?.substring(0, 90) + "..."}</h3>
            <p>{item?.description?.substring(0, 150) + "..."}</p>
          </div>
        )}
      </Link>
    </div>
  );
};
export default BlogListCardContent;
