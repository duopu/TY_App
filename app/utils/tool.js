import config from "./config.js"
import store from '@/store/index.js';
import request from './request.js';
import imTool from './im.js';

const showToastMessage = (title,icon,callback)=>{
	const duration = 1500;
	uni.showToast({
		title:title,
		icon,
		duration,
	})
	if(callback){
		setTimeout(()=>{
			callback();
		},duration)
	}
}

// 普通提示 title：提示文字   callback：提示消失的时候回调
const showToast = (title,callback)=>{
	showToastMessage(title,'none',callback);
}
// 成功提示 title：提示文字   callback：提示消失的时候回调
const showSuccess = (title,callback)=>{
	showToastMessage(title,'success',callback);
}

// 保存用户信息
const saveUserStorage = (user)=>{
	// 本地保存
	uni.setStorage({
		key: config.storageKeys.loginUserKey,
		data: user
	});
	// 内存保存
	getApp().globalData.user = user;
}

const login = (user)=>{
	
	// 保存用户信息
	saveUserStorage(user)
	
	// im 信息处理
	const imTodo = (res)=>{
		// im 登录
		saveUserStorage({...user,...res});
		imTool.login(res.imNum,res.sig)
		console.log('IM 准备登录',{...user,...res});
	}
	if(user.roleStatus == 'user'){
		
		// 从本地读取用户搜索历史信息
		store.dispatch('initHistroySearchAction');
		// 查询用户的默认配送地址
		store.dispatch('queryUserDefaultAddress');
		
		// 获取IM 信息
		request.get('/im/getUserSig',{},true).then(imTodo)
		
		
		// 跳转用户首页页面 
		uni.reLaunch({
			url: '/pages-user/index/index/index'
		}); 
	}else{

		// 获取商家IM 信息
		request.get('/im/getStoreImSig',{imNum:user.imNum},true).then(imTodo)
		
		// 跳转商家首页页面
		uni.reLaunch({
			url: '/pages-business/main/main'
		});
	}
}

const logout = ()=>{
	getApp().globalData.user = {};
	
	// 清楚用户的默认地址信息
	// store.commit('setDefaultAddress',{});
	uni.removeStorage({
		key:config.storageKeys.loginUserKey,
	})
	uni.reLaunch({
		url:'/pages/login/login'
	})
}

// 跳转消息列表
const toMessageList = ()=>{
	uni.navigateTo({
		url:'/pages-user/index/message/message'
	})
}

// 系统信息 初始化时获取一次
let systemInfo = {}
uni.getSystemInfo({
    success: function (res) {
		systemInfo = res;
		console.log('系统信息',res);
    }
});

/**
 * 订单支付
 * @param {String} orderNum 订单编号 
 * @param {int} payType 支付类型  1支付宝  2微信 
 */
const orderPay = (orderNum, payType)=>{
	
	return new Promise((resolve, reject) => {
		
		if(payType === 1){
			// TODO: 这里何佳文接口返回的字段不符合支付宝要求，待商议
			request.get('/order/aliPayForApp',{orderNum: orderNum},true).then(res => {
				uni.requestPayment({
				    provider: 'alipay',
				    orderInfo: res, 
				    success: function (res) {
				        console.log('success:' + JSON.stringify(res));
						resolve(res);
				    },
				    fail: function (err) {
				        console.log('fail:' + JSON.stringify(err));
						reject(err);
				    }
				});
			})
		}else if(payType === 2){
			// TODO: 这里何佳文接口返回的字段不符合微信要求，待商议
			request.get('/order/wechatPayForApp',{orderNum: orderNum},true).then(res => {
				uni.requestPayment({
				    provider: "wxpay", 
				    orderInfo: res,
				    success: function (res) {
						console.log('success:' + JSON.stringify(res));
						resolve(res);
					},
				    fail: function (e) {
						console.log('fail:' + JSON.stringify(err));
						reject(err);
					}
				})
			})
		}
	})
}

export default {
	imTool,
	systemInfo,
	showToast,
	showSuccess,
	logout,
	login,
	saveUserStorage,
	toMessageList,
	orderPay
}