export const LoadMore = (props) => {
    const {handlLoadMore} = props;
    return (
        <button onClick={() => {handlLoadMore()}}>Load More</button>
    )
};