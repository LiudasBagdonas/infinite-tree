import './index.css';
import { useState } from 'react';
import TreeItem from '../../components/TreeItem';
import idGenerator from '../../functions/idGenerator';
import addChild from '../../functions/addChild';
import updateTotalPrice from '../../functions/updateTotalPrice';


function Home() {

    const [modalVisibility, setModalVisibility] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('')
    const [error, setError] = useState('')
    const [price, setPrice] = useState(0)
    const [root, setRoot] = useState('')
    const [parent, setParent] = useState('')


    console.log(categories)
    const onSubmit = (e) => {
        e.preventDefault();

        if (category !== '' && category.length <= 30) {

            const newNode =
            {
                name: category, categories: [], price: price,
                id: idGenerator(), root: root, parent: parent, totalPrice: price
            };

            const newCategories = addChild(categories, newNode);

            setCategories(newCategories);

            setModalVisibility(false);
            setRoot('');
            setPrice(0);
            setCategory('');
            setError('');
        } else if (category === '') {
            setError('Field must be filled!');
        } else if (category.length > 30) {
            setError('Field can not be longer than 30 symbols!');
        }
    }
    const showModal = () => {
        setModalVisibility(true);
    }
    const removeModal = () => {
        setModalVisibility(false);
        setError('');
    }
    const addSubcategory = (root, parent) => {
        setRoot(root);
        setParent(parent);
        showModal();
    }
console.log(categories)
    return (
        <main>
            {modalVisibility &&
                <>
                    <div className="category-form-modal" onClick={() => removeModal()}></div>
                    <form className="category-form" onSubmit={(e) => onSubmit(e)}>
                        <label className={`label ${error !== '' ? 'error-margin' : ''}`}>
                            <input type='text' onChange={(e) => setCategory(e.target.value)} placeholder="Category name"></input>
                        </label>
                        {error !== '' ? <p className="error-message">{error}</p> : ''}
                        <label className='label'>
                            <input type='number' onChange={(e) => setPrice(e.target.value)} placeholder="Price"></input>
                        </label>
                        <button>Add</button>
                    </form>
                </>
            }
            <p onClick={() => showModal('category')} className="create-category-button">+ Category</p>
            <hr />
            {categories.map((item, index) =>
                <TreeItem key={index} {...item} event={addSubcategory} root={item.id} />
            )}
        </main>
    );
}

export default Home;