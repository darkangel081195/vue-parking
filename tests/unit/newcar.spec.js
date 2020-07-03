import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount,createLocalVue } from '@vue/test-utils'
import NewCar from "../../src/views/NewCar.vue";
import values from "../../src/store/values";

let localVue = createLocalVue();
localVue.use(Vuex);

const carsList = [
        {slot: 1, registration: "KA-00-AA-1005", color: "Red"},
        {slot: 2, registration: "KA-00-AA-1004", color: "Red"},
        {slot: 3, registration: "KA-00-AA-1003", color: "Red"}
    ]

describe('NewCar.vue',()=>{
    let store;
    let wrapper;
    let actions;
    beforeEach(()=>{
        actions = {
            addCar : jest.fn()
        }

        store = new Vuex.Store({
            state : {
                totalSlots : 3,
                carsList : carsList
            },
            actions,
            getters : values.getters
        });

        wrapper = shallowMount(NewCar,{localVue,store,
                                mocks: {
                                    $message : jest.fn()
                                }});
    })

    it('to test parking full condition',()=>{
        wrapper.setData({newCar:{number : "KA-00-AA-1004",color:"Red"}});
        const btn = wrapper.find('el-button');
        btn.trigger('click');
        expect(wrapper.vm.$message).toHaveBeenCalledWith({"message": "Parking is Full!!!", "type": "error"});
    })

    it('to test if duplicate registation number is found',()=>{
        store.state.totalSlots = 4;
        wrapper.setData({newCar:{number : "KA-00-AA-1004",color:"Red"}});
        const btn = wrapper.find('el-button');
        btn.trigger('click');
        expect(wrapper.vm.$message).toHaveBeenCalledWith({"message": "Registration number already present", "type": "error"});
    })

    it('to test for invalid registration number',()=>{
        store.state.totalSlots = 4;
        wrapper.setData({newCar:{number : "KA 00 AA 1006",color:"Red"}});
        const btn = wrapper.find('el-button');
        btn.trigger('click');
        expect(wrapper.vm.$message).toHaveBeenCalledWith({"message": "Invalid Registration number(Ex:AA-00-BB-1111)", "type": "error"});
    })

    it('to test if action method is called for valid input',()=>{
        store.state.totalSlots = 4;
        wrapper.setData({newCar:{number : "KA-00-AA-1006",color:"Red"}});
        wrapper.vm.addCar = jest.fn();
        const btn = wrapper.find('el-button');
        btn.trigger('click');
        expect(wrapper.vm.addCar).toHaveBeenCalledWith({number : "KA-00-AA-1006",color:"Red"});
    })
})