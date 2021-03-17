import calculatePriceAfterRemoval from '../app/functions/calculatePriceAfterRemoval';

test('Remove Function', () => {

    const mockArray = [{
            name: "Parent", price: 0,
            id: "parentId", parent: "", totalPrice: 3.9
        },
        {
            name: "Child", price: 1.95,
            id: "childId", parent: "parentId", totalPrice: 1.95
        }
    ];
    const mockObject =
    {
        name: "Child2", price: 0,
        id: "child2Id", parent: "parentId", totalPrice: 1.95
    }
    const removeFunction = calculatePriceAfterRemoval(mockArray, mockObject, mockObject.totalPrice);
    expect(removeFunction).toStrictEqual([
        {
            name: "Parent", price: 0,
            id: "parentId", parent: "", totalPrice: 1.95
        },
        {
            name: "Child", price: 1.95,
            id: "childId", parent: "parentId", totalPrice: 1.95
        }
    ])
});
