import './index.css';
import { useState, useEffect } from 'react';
import TreeItem from '../../components/TreeItem';
import idGenerator from '../../functions/idGenerator';
import calculateTotalPrice from '../../functions/calculateTotalPrice';


function Home() {

    const [modalVisibility, setModalVisibility] = useState(false);
    const [priceInputVisibility, setPriceInputVisibility] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('')
    const [nameInputError, setNameInputError] = useState('')
    const [priceInputError, setPriceInputError] = useState('')
    const [price, setPrice] = useState(0)
    const [parent, setParent] = useState('')

    useEffect(() => {
        const loadStorage = JSON.parse(localStorage.getItem('tree'))
        setCategories(loadStorage ? loadStorage : [])
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        setNameInputError('')
        setPriceInputError('')

        if (category !== '' &&
            category.length <= 30 &&
            (price.length <= 10 || price === 0)
        ) {
            const newNode =
            {
                name: category, price: price,
                id: idGenerator(), parent: parent, totalPrice: price
            };

            const newCategories = calculateTotalPrice(categories, newNode);
            localStorage.setItem('tree', JSON.stringify(newCategories))
            setCategories(newCategories);


            setModalVisibility(false);
            setPriceInputVisibility(false);
            setParent('')
            setPrice(0);
            setPriceInputError('')
            setCategory('');
            setNameInputError('');
        } else if (category === '') {
            setNameInputError('Field must be filled!');
        } else if (category.length > 30) {
            setNameInputError('Field can not be longer than 30 symbols!');
        } else if (price.length >= 10 && price !== '') {
            setPriceInputError('Input must be maximum 10 symbols long!')
        }
    }
    const showModal = () => {
        setModalVisibility(true);
    }
    const removeModal = () => {
        setModalVisibility(false);
        setPriceInputVisibility(false);
        setNameInputError('');
        setPriceInputError('');
    }
    const addSubcategory = (parent) => {
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
                        {!priceInputVisibility && <p className="add-price-button" onClick={() => setPriceInputVisibility(true)}>Add Price?</p>}
                        {
                            priceInputVisibility && <>
                                <label className={`label ${priceInputError !== '' ? 'error-margin' : ''}`}>
                                    Price:
                                    <input min="0.00" step="0.01" maxLength="10" type='number'
                                        onChange={(e) => setPrice(e.target.value)} placeholder="0.00"></input>
                                </label>
                                {priceInputError !== '' ? <p className="error-message">{priceInputError}</p> : ''}
                            </>
                        }
                        <button>Add</button>
                    </form>
                </>
            }
            <p onClick={() => showModal('category')} className="create-category-button">+ Category</p>
            <hr />
            {categories.map((item, index) =>
                item.parent === "" ?
                    <TreeItem key={index} categories={categories} setCategories={setCategories} event={addSubcategory} item={item} totalPrice={parseInt(item.price)} />
                    : ''
            )}

        </main>
    );
}

export default Home;