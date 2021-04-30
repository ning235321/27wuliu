import Vue from 'vue';
import Vuex from 'vuex';

import {getuserdatabyID} from '../network/newhttp'
Vue.use(Vuex);

const store = new Vuex.Store({
	state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')):{
		data: {
			_id:'',
			name: '',
	    	accountnum: '',
	    	password: '',
			isadmin: '',
			goodslist:[]
		},
		driverdata: [{
			_id:'',
       		name:'',
       		drivernum:'',
       		phone:'',
}]
	},
	mutations: {
		changeDataMut(state,params){  
        state.data = params
		},
		changeDriverData(state, params) {
        state.driverdata = params
    },
		addGoodslistData(state, params) {
        state.data.goodslist.push(params)
    },
		getUserbyId(state) {
			console.log(state.data._id);
			getuserdatabyID(state.data._id).then((res) => {
				state.data = res[0]
				// console.log(state.data);
			})
    }
	}
		
	
		
})


export default store;