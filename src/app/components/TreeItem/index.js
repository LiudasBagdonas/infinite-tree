import './index.css';
import { useState } from 'react';
import calculatePriceAfterRemoval from '../../functions/calculatePriceAfterRemoval';

function TreeItem({ categories, setCategories, event, item }) {


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
            <div className="root-category-box">
                <div className="name-price-box">
                    {item.price ?
                        <>
                            <p onClick={() => removeNode(categories, item)} className="remove-button only-remove-button">-</p>
                        </>
                        :
                        <>
                            <p className="add-button" onClick={() => addCategoryHandler(item.id)}>+</p>
                            <p onClick={() => removeNode(categories, item)} className="remove-button">-</p>
                        </>
                    }
                    <div className={`tree-arrow-box rotate--${!!(showChildren && children.length) && 'true'}`}>
                        <div className={`tree-arrow-sub-box`}></div>
                    </div>
                    <p onClick={() => setShowChildren(!showChildren)}
                        className={`category-name root-category--${item.parent === "" && 'true'} 
                        ${item.price && 'category-with-price'}`} >{item.name}</p>

                    {!!(item.price) && <p className="category-price">Price: {Number(item.price).toFixed(2)}€</p>
                    }
                    {!!(children.length) && <p className="category-total-price">Total: {Number(item.totalPrice).toFixed(2)}€</p>}
                </div>
                {!!(children.length && showChildren) && children.map((item, index) => (
                    <TreeItem key={index} categories={categories} setCategories={setCategories} event={event} item={item} />
                ))}
            </div>
        </>
    );
}
export default TreeItem;