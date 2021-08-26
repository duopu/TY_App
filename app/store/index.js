import Vue from 'vue'
import Vuex from 'vuex'
import config from '../utils/config.js';

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
    state:{
		historySearchList:[] //搜索历史
    },
	
	mutations:{
		
		/**初始化搜索记录
		 * @param {Object} state
		 * @param {Object} list
		 */
		initHistroySearch(state, list){
			state.historySearchList = list
		},
		
		/** 添加历史搜索记录
		 * @param {Object} state
		 * @param {Object} searchString
		 */
		addHistorySearch(state, searchString){
			
			// 这里要注意如果用户输入的搜索内容是之前输入过的，则不重复插入
			var index = -1;
			var finalSearchString = searchString;
			for(var i=0; i<state.historySearchList.length; i++){
				if(state.historySearchList[i].name == searchString){
					index = i;
					break;
				}
			}
			if(index !== -1){
				finalSearchString = state.historySearchList[index].name;
				state.historySearchList.splice(index,1);
			}
			
			state.historySearchList.splice(0,0,{name:finalSearchString});
			
			// 这里只保存最多15个搜索记录
			if(state.historySearchList.length > 15){
				state.historySearchList.splice(15,state.historySearchList.length - 1);
			}
			
			uni.setStorage({
			    key: config.storageKeys.historySearchKey,
			    data: state.historySearchList
			});
		},
		/** 删除历史搜索记录
		 * @param {Object} state
		 */
		deleteHistorySearch(state){
			state.historySearchList = [];
			uni.removeStorage({
			    key: config.storageKeys.historySearchKey
			});
		}
	},
	
	actions:{
		/**
		 * 初始化搜索历史
		 */
		initHistroySearchAction({commit}){
			// 从本地恢复登录信息;
			uni.getStorage({
				key: config.storageKeys.historySearchKey,
				success: res => {
					commit('initHistroySearch',res.data);
				}
			});
		}
	}
	
})

export default store