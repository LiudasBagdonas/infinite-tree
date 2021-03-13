import './index.css';
import { useState } from 'react';
import calculatePriceAfterRemoval from '../../functions/calculatePriceAfterRemoval';

function TreeItem2({ categories, setCategories, event, item }) {


    const [showChildren, setShowChildren] = useState(false)
    const children = categories.filter(element => element.parent === item.id)

    const removeNode = (categories, item) => {
        let newArray = categories.filter(category => category.id !== item.id)
        let removedNodeParent = newArray.filter(category => category.id === item.parent)
        const removableChildren = newArray.filter(category => category.parent === item.id)

        if (removedNodeParent.length) {

            newArray = calculatePriceAfterRemoval(newArray, item, item.totalPrice)
        }

        if (removableChildren.length) {

            return removableChildren.map((child) => {
                newArray = newArray.filter(item => item.id !== child.id)
                return removeNode(newArray, child)
            })
        }
        localStorage.setItem('tree', JSON.stringify(newArray))
        setCategories(newArray)
    }

    const addCategoryHandler = (item) => {
        event(item)
        setShowChildren(true) 
}

    return (
        <>
            <div className="subcategory-box">
                <div className="name-price-box">
                <div className={`tree-arrow-box rotate--${!!(showChildren && children.length) && 'true'}`}>
                    <div className={`tree-arrow-sub-box `}></div>
                </div>
                    <p onClick={() => setShowChildren(!showChildren)}
                        className={`category-name root-category--${item.parent === "" && 'true'}`} >{item.name}</p>

                    {item.button ?
                        <>
                            <p onClick={() => removeNode(categories, item)} className="remove-button">-</p>
                            <p className="category-price">Price: {item.price}€</p>
                        </>
                        :
                        <>
                            <p className="category-button add-button" onClick={() => addCategoryHandler(item.id)}>+</p>
                            <p onClick={() => removeNode(categories, item)} className="remove-button">-</p>
                        </>
                    }

                    {/* {item.button ?
                        <p className="category-price">{item.price}€</p> :
                        <p className="category-button"
                            onClick={() => event(item.id, item.id)}>+</p>} */}

                {/* <p onClick={() => removeNode(categories, item)} className="tree-item-remove-item">-</p> */}
                {!!(children.length) && <p className="category-total-price">Total: {item.totalPrice.toFixed(2)}€</p>}
            </div>
            {!!(children.length && showChildren) && children.map((item, index) => (
                <TreeItem2 key={index} categories={categories} setCategories={setCategories} event={event} item={item} />
            ))}
        </div>
        </>
    );
}
export default TreeItem2;