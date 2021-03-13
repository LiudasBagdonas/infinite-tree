function calculatePriceAfterRemoval(categories, newNode, totalPrice = 0) {

    const parent = categories.filter(category => category.id === newNode.parent)

    if (parent.length) {

        parent[0].totalPrice -= totalPrice;

        if (parent[0].parent) {
            calculatePriceAfterRemoval(categories, { ...parent[0] }, parseFloat(totalPrice.toFixed(2)))
        }

    }

    return [...categories]
}
export default calculatePriceAfterRemoval;