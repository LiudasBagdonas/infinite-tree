import './index.css';
import updateTotalPrice from '../../functions/updateTotalPrice';

function TreeItem({ name, categories, price, id, root, totalPrice, event }) {

    const hasChildren = !!(categories && categories.length);
    const prices = 0;
    // const totalPrice = countValues(categories, prices)


    console.log(totalPrice)
    return (
        <>
            <div className="subcategory-margin--1">
                <div className="name-price-box">
                    <p>{name}</p>
                    {/* Print item price or button */}
                    {price !== 0 ?
                        <p className="category-price">{price}€</p> :
                        <p className="category-button"
                            onClick={() => event(root, id)}>+</p>}
                    <p>{totalPrice}</p>
                </div>
                {hasChildren && categories.map((item, index) => (
                    <TreeItem key={index} {...item} event={event} root={root} />
                ))}
            </div>
        </>
    );
}
export default TreeItem;