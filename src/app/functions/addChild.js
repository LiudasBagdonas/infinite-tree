// import updateTotalPrice from './updateTotalPrice';

// function addChild(categories, newNode) {
//     const parentId = newNode.parent;

//     if (newNode.root === "") {
//         return [...categories, newNode];
//     }

//     return categories.map((item) => {
//         if (item.id === parentId) {
//             return { ...item, categories: [...item.categories, newNode] };
//         }
//         if (!item.categories.length) {
//             return item;
//         }
//         return { ...item, categories: addChild(item.categories, newNode) };
//     })
// }

// export default addChild;

function addChild(categories, newNode) {

    // const newNode =
    // {
    //     name: category, categories: [], price: price,
    //     id: idGenerator(), root: root, parent: parent, totalPrice: price
    // };
    const parentId = newNode.parent;
    const price = newNode.price;


    if (newNode.root === "") {
        return [...categories, newNode];
    }

    return categories.map((item) => {
        if (item.id === parentId) {
            item.totalPrice += price;
            if(item.parent) {
                addChild(item.categories, item)
            }
            return { ...item, categories: [...item.categories, newNode], totalPrice: item.totalPrice + price };
        }
        if (!item.categories.length) {
            return item;
        }
        return { ...item, categories: addChild(item.categories, newNode) };
    })
}

export default addChild;