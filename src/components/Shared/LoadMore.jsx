import {Button} from 'reactstrap';

export const LoadMore = (props) => {
    const {handleLoadMore} = props;
    return (
        <div className="my-5">
            <Button className='gray-outline-btn d-block mx-auto px-4 fw-normal' onClick={() => handleLoadMore()}>Load
                more</Button>
        </div>
    )
};