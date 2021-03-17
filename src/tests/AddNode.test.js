import calculateTotalPrice from '../app/functions/calculateTotalPrice';

test('Add Function', () => {

    const mockArray = [{
        name: 'Parent', price: 0,
        id: 'parentId', parent: '', totalPrice: 1.95
    },
    {
        name: 'Child', price: 1.95,
        id: 'childId', parent: 'parentId', totalPrice: 1.95
    },
    {
        name: 'Child2', price: 0,
        id: 'child2Id', parent: 'parentId', totalPrice: 0
    }
    ];
    const mockObject =
    {
        name: 'GrandChild', price: parseFloat(1.95),
        id: 'grandChildId', parent: 'child2Id', totalPrice: parseFloat(1.95)
    }
    const addFunction = calculateTotalPrice(mockArray, mockObject);
    expect(addFunction).toStrictEqual([
        {
            name: "Parent", price: 0,
            id: "parentId", parent: "", totalPrice: 3.9
        },
        {
            name: "Child", price: 1.95,
            id: "childId", parent: "parentId", totalPrice: 1.95
        },
        {
            name: "Child2", price: 0,
            id: "child2Id", parent: "parentId", totalPrice: 1.95
        },
        {
            name: "GrandChild", price: 1.95,
            id: "grandChildId", parent: "child2Id", totalPrice: 1.95
        }
    ])
});
