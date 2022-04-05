import { Button} from 'reactstrap';

export const LoadMore = (props) => {
    const {handleLoadMore} = props;
    return (
        <Button className='gray-outline-btn d-block mx-auto fw-normal' onClick={()=> handleLoadMore()}>Load more</Button>
    )
};