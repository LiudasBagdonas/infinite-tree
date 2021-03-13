import './index.css';
import { useState, useEffect } from 'react';
import TreeItem2 from '../../components/TreeItem2';
import idGenerator from '../../functions/idGenerator';
import calcTotalPrice from '../../functions/calcTotalPrice';


function Home() {

    const [modalVisibility, setModalVisibility] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('')
    const [nameInputError, setNameInputError] = useState('')
    const [priceInputError, setPriceInputError] = useState('')
    const [price, setPrice] = useState(0)
    const [root, setRoot] = useState('')
    const [parent, setParent] = useState('')

    console.log(price)
    useEffect(() => {
        const loadStorage = JSON.parse(localStorage.getItem('tree'))
        setCategories(loadStorage ? loadStorage : [])
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        if (category !== '' &&
            category.length <= 30 &&
            (price.length <= 10 || price === 0)
        ) {

            const newNode =
            {
                name: category, price: parseFloat((price * 100) / 100), button: price ? true : false,
                id: idGenerator(), parent: parent, totalPrice: parseFloat((price * 100) / 100)
            };

            const newCategories = calcTotalPrice(categories, newNode);
            localStorage.setItem('tree', JSON.stringify(newCategories))
            setCategories(newCategories);


            setModalVisibility(false);
            setParent('')
            setRoot('');
            setPrice(0);
            setPriceInputError('')
            setCategory('');
            setNameInputError('');
        } else if (category === '') {
            setNameInputError('Field must be filled!');
        } else if (category.length > 30) {
            setNameInputError('Field can not be longer than 30 symbols!');
        } else if (price.length >= 10) {
            setPriceInputError('Input must be maximum 10 symbols long!')
        } 
    }
    const showModal = () => {
        setModalVisibility(true);
    }
    const removeModal = () => {
        setModalVisibility(false);
        setNameInputError('');
    }
    const addSubcategory = (parent) => {
        // setRoot(root);
        setParent(parent);
        showModal();
    }
    return (
        <main>
            {modalVisibility &&
                <>
                    <div className="category-form-modal" onClick={() => removeModal()}></div>
                    <form className="category-form" onSubmit={(e) => onSubmit(e)}>
                        <label className={`label ${nameInputError !== '' ? 'error-margin' : ''}`}>
                            Name:
                            <input type='text' onChange={(e) => setCategory(e.target.value)} placeholder="Category name" required="required"></input>
                        </label>
                        {nameInputError !== '' ? <p className="error-message">{nameInputError}</p> : ''}
                        <label className={`label ${priceInputError !== '' ? 'error-margin' : ''}`}>
                            Price:
                                <input min="0.00" step="0.01" maxLength="10" type='number'
                                onChange={(e) => setPrice(e.target.value)} placeholder="0.00"></input>
                        </label>
                        {priceInputError !== '' ? <p className="error-message">{priceInputError}</p> : ''}
                        <button>Add</button>
                    </form>
                </>
            }
            <p onClick={() => showModal('category')} className="create-category-button">+ Category</p>
            <hr />
            {categories.map((item, index) =>
                item.parent === "" ?
                    <TreeItem2 key={index} categories={categories} setCategories={setCategories} event={addSubcategory} item={item} totalPrice={parseInt(item.price)} />
                    : ''
            )}

        </main>
    );
}

export default Home;