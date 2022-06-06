import { Link } from "react-router-dom";
import BlurImage from "../../components/Common/BlurImage";
import { useState } from "react";

const TutorialListCardContent = (props) => {
  const { item } = props;

  const [loaderLoading, setLoaderLoading] = useState(true);

  const handleLoaderLoading = (state) => {
    setLoaderLoading(state);
  };

  return (
    <Link
      to={`${item?.slug ? item?.slug : ""}`}
      className={`d-block position-relative`}
    >
      <div className="tutorial-img">
        <BlurImage
          loaderLoading={handleLoaderLoading}
          image={item?.thumbnail_image}
          preview={item?.thumbnail_image}
          alt={item?.title}
        />
      </div>
      {!loaderLoading && (
        <>
          <h3>{item?.title}</h3>
          <p>{item?.description}</p>
        </>
      )}
    </Link>
  );
};
export default TutorialListCardContent;
