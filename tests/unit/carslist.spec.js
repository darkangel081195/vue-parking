import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount,createLocalVue } from '@vue/test-utils'
import CarsList from "../../src/components/CarsList.vue";
import values from "../../src/store/values";

const localVue = createLocalVue();
localVue.use(Vuex);

const carsList = [
    {slot: 1, registration: "KA-00-AA-1005", color: "Red"},
    {slot: 2, registration: "KA-00-AA-1004", color: "White"},
    {slot: 3, registration: "KA-00-AA-1003", color: "Red"},
    null,
    null,
]

describe("CarsList.vue",()=>{
    let store;
    let wrapper;

    beforeEach(()=>{
        store = new Vuex.Store(values);
        wrapper = shallowMount(CarsList,{ localVue, store })
    })

    it('to check if data is flowing from store to component',()=>{
        const filledCars = [
                            {slot: 1, registration: "KA-00-AA-1005", color: "Red"},
                            {slot: 2, registration: "KA-00-AA-1004", color: "White"},
                            {slot: 3, registration: "KA-00-AA-1003", color: "Red"},
                        ]
        store.state.carsList = carsList;
        store.state.totalSlots = 5;
        expect(wrapper.vm.filledSlots).toEqual(filledCars);
    })

    it('to check if fitering of data is working',()=>{
        wrapper.setData({registration : '',color : 'Red'});
        const res = [
            {slot: 1, registration: "KA-00-AA-1005", color: "Red"},
            {slot: 3, registration: "KA-00-AA-1003", color: "Red"}
        ]
        expect(wrapper.vm.filteredData).toEqual(res);
    })

    it('to delete a car from parking',()=>{
        const row = {slot: 1, registration: "KA-00-AA-1005", color: "Red"}
        wrapper.vm.handleDelete(1,row);
        const res = [
                        {slot: 2, registration: "KA-00-AA-1004", color: "White"},
                        {slot: 3, registration: "KA-00-AA-1003", color: "Red"}
                    ]
        
        expect(wrapper.vm.filledSlots).toEqual(res);

    })

    it('to fill the header color only for the first row of table',()=>{
        expect(wrapper.vm.tableHeaderColor({ rowIndex : 0})).toBe('background-color: #65b1ff;color: #fff;font-weight: 500;text-align:center');
    })

    it('to return null for header color if index is not 0',()=>{
        expect(wrapper.vm.tableHeaderColor({ rowIndex : 1})).toBeNull; 
    })

    it('to check if each cell alignment is center',()=>{
        expect(wrapper.vm.cell()).toBe('text-align : center');
    })
})