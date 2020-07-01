import { generateCarList } from "../../src/helpers/generateCarList";

test('to generate the cars list based on input provided',()=>{

    const arr = [
        { slot : 1, registration : 'KA-00-AA-1005',color: 'Red'},
        { slot : 2, registration : 'KA-01-AA-1004',color: 'White'},
        { slot : 3, registration : 'KA-02-AA-1003',color: 'Black'},
        { slot : 4, registration : 'KA-03-AA-1002',color: 'Blue'},
        { slot : 5, registration : 'KA-04-AA-1001',color: 'Red'},
        null,
        null,
        null,
        null,
        null
    ]

    expect(generateCarList(10,5)).toEqual(arr); 
})


