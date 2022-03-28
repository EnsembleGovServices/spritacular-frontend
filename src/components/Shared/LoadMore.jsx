import { Button} from 'reactstrap';

export const LoadMore = (props) => {
    const {handlLoadMore} = props;
    return (
        <Button className='gray-outline-btn d-block mx-auto fw-normal' onClick={()=> handlLoadMore()}>Load more</Button>
        // <button onClick={() => {handlLoadMore()}}>Load More</button>
    )
};