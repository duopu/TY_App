import Vue from 'vue'
import Vuex from 'vuex'
import config from '../utils/config.js';
import request from '../utils/request.js'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
    state:{
		historySearchList:[], //搜索历史
		goodsDetailsHeightChange:false, //商品详情页高度变化
		defaultAddress:{}, //用户当前选择的收货地址（默认为默认地址）
		storeGoodsList:[], //用户下订单时选择的商品
		groupBuyGoodsVO:{}, //用户下订单时选择的组团优惠商品
		orderChange:0 //记录订单发生变化（比如当用户生成订单或者订单状态发生改变时，通过监听该值的变化来实现一些页面的被动刷新效果，例如：当用户在组团优惠列表页下了一个订单，等订单完成的时候列表页需要主动刷新）
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
		},
		
		/**
		 * 商品详情页高度变化
		 * @param {Object} state
		 */
		changeGoodsDetailsHeight(state){
			state.goodsDetailsHeightChange = !state.goodsDetailsHeightChange
		},
		
		/**
		 * 设置用户默认收货地址
		 * @param {Object} state
		 * @param {Object} address
		 */
		setDefaultAddress(state,address){
			state.defaultAddress = address;
		},
		
		/**
		 * 设置下订单时确定的商品
		 * @param {Object} state
		 * @param {Object} storeGoodsList
		 */
		setStoreGoodsList(state,storeGoodsList){
			state.storeGoodsList = storeGoodsList;
		},
		
		/**
		 * 设置下订单时确定的组团优惠商品
		 * @param {Object} state
		 * @param {Object} groupBuyGoodsVO
		 */
		setGroupBuyGoodsVO(state,groupBuyGoodsVO){
			state.groupBuyGoodsVO = groupBuyGoodsVO;
		},
		
		/**
		 * 记录订单发生变化，当用户提交订单、支付订单、评价订单等等一系列改变订单状态操作时，需要调用次方法来让页面实被动刷新
		 * @param {Object} state
		 */
		setOrderChange(state){
			state.orderChange += 1;
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
		},
		
		/**
		 * 查询用户默认地址
		 */
		queryUserDefaultAddress({commit}){
			request
				.get('/address/queryList', {}, true)
				.then(res => {
					if(res){
						for(var i=0; i<res.length; i++){
							if(res[i].isDefault === 1){
								commit('setDefaultAddress',res[i]);
								break;
							}
						}
					}
				});
		}
	}
	
})

export default store