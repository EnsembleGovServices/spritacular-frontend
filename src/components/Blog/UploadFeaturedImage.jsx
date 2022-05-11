import "../../assets/scss/component/initialUploadobservations.scss";
import UploadImageUI from "../Shared/UploadImageUI";

const UploadFeaturedImage = (props) => {
    const {setData} = props;

    const handleFileInput = (e) => {
        setData((prev) => {
            return {
                ...prev,
                thumb: e.target.files[0]
            }
        })
    }
    return (
        <>
            <UploadImageUI blogUpload={true} handleUploadImage={handleFileInput}/>
        </>
    )
}
export default UploadFeaturedImage;