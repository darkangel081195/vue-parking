import values from "../../src/store/values";
import Vuex from "vuex";
import { createLocalVue} from '@vue/test-utils';
import { cloneDeep } from 'lodash';

const carsList = [
    {slot: 1, registration: "KA-00-AA-1005", color: "Red"},
    {slot: 2, registration: "KA-00-AA-1004", color: "Red"},
    {slot: 3, registration: "KA-00-AA-1003", color: "Red"},
    null,
    null
]

describe('Testing Vuex store',()=>{
    let localVue = createLocalVue();
    localVue.use(Vuex);
    let store;

    beforeEach(()=>{
        store = new Vuex.Store(cloneDeep(values));
    })

    it('to test if getters filledSlots is return values correctly',()=>{
        store.state.totalSlots = 5;
        store.state.carsList = carsList;
        const res = [
                    {slot: 1, registration: "KA-00-AA-1005", color: "Red"},
                    {slot: 2, registration: "KA-00-AA-1004", color: "Red"},
                    {slot: 3, registration: "KA-00-AA-1003", color: "Red"},
                    ]
        expect(store.getters.filledSlots).toEqual(res);
    })

    it('to test if next slot value is correct',()=>{
        store.state.totalSlots = 5;
        store.state.carsList = carsList;
        expect(store.getters.nextSlot).toBe(4);
    })

    it('to test if next slot returns -1 if no slot is available',()=>{
        store.state.totalSlots = 3;
        store.state.carsList = [
            {slot: 1, registration: "KA-00-AA-1005", color: "Red"},
            {slot: 2, registration: "KA-00-AA-1004", color: "Red"},
            {slot: 3, registration: "KA-00-AA-1003", color: "Red"},
        ];

        expect(store.getters.nextSlot).toBe(-1);
    })

    it('to test cars list actions and mutatations are working',()=>{
        store.dispatch('setCarsList',{status : false, slots : 5, carsList : carsList });

        expect(store.state.carsList).toEqual(carsList);
    })

    it('to test if new cars are added upon calling the action',()=>{

        store.state.carsList = carsList;
        store.state.totalSlots = 5;
        const res = [
            {slot: 1, registration: "KA-00-AA-1005", color: "Red"},
            {slot: 2, registration: "KA-00-AA-1004", color: "Red"},
            {slot: 3, registration: "KA-00-AA-1003", color: "Red"},
            {slot: 4, registration: "KA-02-BB-1001", color: "Blue"},
            null
        ]

        store.dispatch('addCar',{number : "KA-02-BB-1001",color : "Blue"});

        expect(store.state.carsList).toEqual(res);
    })

    it('to delete a car',()=>{
        store.state.carsList = carsList;
        store.state.totalSlots = 5;
        const res = [
            {slot: 1, registration: "KA-00-AA-1005", color: "Red"},
            null,
            {slot: 3, registration: "KA-00-AA-1003", color: "Red"},
            {slot: 4, registration: "KA-02-BB-1001", color: "Blue"},
            null
        ]

        store.dispatch('deleteCar',2)

        expect(store.state.carsList).toEqual(res);
    })
})