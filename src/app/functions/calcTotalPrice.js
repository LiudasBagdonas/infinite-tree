function calcTotalPrice(categories, newNode, totalAmount = 0) {

    const parent = categories.filter(category => category.id === newNode.parent)
    const fullPrice = totalAmount + newNode.price

    if (parent.length) {

        parent[0].totalPrice += fullPrice;

        if (parent[0].parent) {
            calcTotalPrice(categories, { ...parent[0] }, parseFloat(fullPrice.toFixed(2)))
        }

    }

    return [...categories, newNode]
}
export default calcTotalPrice;