import './index.css';
import updateTotalPrice from '../../functions/updateTotalPrice';

function TreeItem2(categories, event, item ) {

    const hasChildren = categories.filter(element => element.parent !== item.id)
    // const newFavorites = favorites.filter(favorite => favorite !== id)
    return (
        <>
        <p>{JSON.stringify(item)}</p>
            <div className="subcategory-margin--1">
                <div className="name-price-box">
                    <p>{item.name}</p>
                    {item.price !== 0 ?
                        <p className="category-price">{item.price}€</p> :
                        <p className="category-button"
                            onClick={() => event(item.id, item.id)}>+</p>}
                    <p>{item.totalPrice}</p>
                </div>
                {hasChildren.map((item, index) => (
                    <TreeItem2 key={index} categories={categories} event={event} item={item} />
                ))}
            </div>
        </>
    );
}
export default TreeItem2;