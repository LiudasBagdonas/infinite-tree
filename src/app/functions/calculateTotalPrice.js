function calculateTotalPrice(categories, newNode, totalAmount = 0) {

    const parent = categories.filter(category => category.id === newNode.parent)
    const fullPrice = totalAmount + +newNode.price

    if (parent.length) {

        parent[0].totalPrice += +fullPrice;

        if (parent[0].parent) {
            calculateTotalPrice(categories, { ...parent[0] }, fullPrice)
        }

    }

    return [...categories, newNode]
}
export default calculateTotalPrice;