import '../../../assets/scss/component/no-comments.scss';
import { cdn } from '../../../helpers/url';

const NoComments = () => {
    return (
        <div className="no-comments">
            <div className="no-com-content">
                <img className="img-fluid" src={`${cdn.url}/comment.svg`} alt="noComments"/>
                <h4 className="title">No comments yet</h4>
                <p className="text">Be the first to comment on this observation.</p>
            </div>
        </div>
    )
}
export default NoComments;