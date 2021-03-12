import './index.css';
import { useState } from 'react';
import TreeItem2 from '../../components/TreeItem2';
import idGenerator from '../../functions/idGenerator';
import addChild from '../../functions/addChild';
import updateTotalPrice from '../../functions/updateTotalPrice';


function Home() {

    const [modalVisibility, setModalVisibility] = useState(false);
    const [rootCategories, setRootCategories] = useState([])
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('')
    const [error, setError] = useState('')
    const [price, setPrice] = useState(0)
    const [root, setRoot] = useState('')
    const [parent, setParent] = useState('')


    const onSubmit = (e) => {
        e.preventDefault();

        if (category !== '' && category.length <= 30) {

            const newNode =
            {
                name: category, price: price,
                id: idGenerator(), root: root, parent: parent, totalPrice: price
            };

            if(newNode.root === "") {
                setRootCategories([...rootCategories, newNode])
            } else {
                setCategories([...categories, newNode])
            }

           
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
console.log('rootcategories', rootCategories);
console.log('categories:', categories);
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
                {rootCategories.map((item, index) => 
                
                <TreeItem2 key={index} categories={categories} event={addSubcategory} item={item} /> 
                
                )}
                
        </main>
    );
}

export default Home;