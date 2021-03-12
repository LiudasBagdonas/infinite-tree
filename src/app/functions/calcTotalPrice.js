function calcTotalPrice(categories, newNode) {
    const newArray = categories;

    if(newNode.parent === "") {
        return [...categories, newNode]
    }

    return newArray.map((category) => {
        if(category.id !== newNode.parent) {
            return newArray.push(category)
        }
        if(category.id === newNode.parent) {
            // newArray.push(category)
            return calcTotalPrice(newArray, category)
        }
        if(category.parent === "") {
            return newArray;
        }
        return newArray
    })
}
export default calcTotalPrice;