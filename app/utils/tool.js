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
	
	// 清除用户的默认地址信息
	store.commit('setDefaultAddress',{});
	// 这里要把邀请人、邀请人分销商品全部清空掉
	store.commit('setInviterId', undefined);
	store.commit('setinviterGoodsId', undefined);
	
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
 * @param {String} payOrderNum 支付单号 
 * @param {int} payType 支付类型  1支付宝  2微信 
 */
const orderPay = (payOrderNum, payType)=>{
	
	return new Promise((resolve, reject) => {
		
		if(payType === 1){
			// TODO: 这里何佳文接口返回的字段不符合支付宝要求，待商议
			request.post('/order/aliPayForApp',{orderNum: payOrderNum},true).then(res => {
				console.log('支付宝输入的支付参数',res.payContent);
				uni.requestPayment({
				    provider: 'alipay',
				    orderInfo: res.payContent, 
				    success: function (res) {
				        console.log('success:' + JSON.stringify(res));
						resolve(res);
						// 跳转到订单列表页
						uni.redirectTo({
							url: `/pages-user/mine/order/order`
						});
				    },
				    fail: function (err) {
				        console.log('fail:' + JSON.stringify(err));
						reject(err);
						// 跳转到订单列表页
						uni.redirectTo({
							url: `/pages-user/mine/order/order`
						});
				    }
				});
			})
		}else if(payType === 2){
			request.post('/order/wechatPayForApp',{orderNum: payOrderNum},true).then(res => {
				uni.requestPayment({
				    provider: "wxpay", 
				    orderInfo: {
						appid: res.appId,
						noncestr: res.nonceStr,
						package: res.pkg,
						partnerid: res.partnerId,
						prepayid: res.prepayId,
						timestamp: res.timeStamp,
						sign: res.paySign
					},
				    success: function (res) {
						console.log('success:' + JSON.stringify(res));
						resolve(res);
						// 跳转到订单列表页
						uni.redirectTo({
							url: `/pages-user/mine/order/order`
						});
					},
				    fail: function (err) {
						console.log('fail:' + JSON.stringify(err));
						reject(err);
						// 跳转到订单列表页
						uni.redirectTo({
							url: `/pages-user/mine/order/order`
						});
					}
				})
			})
		}
	})
}


/**
 * 解析URL参数
 * @param url url字符串
 */
const getUrlQuery = (url) => {
	// 用JS拿到URL，如果函数接收了URL，那就用函数的参数。如果没传参，就使用当前页面的URL
	 let queryString = url ? url.split('?')[1] : '';
	 // 用来存储我们所有的参数
	 let obj = {};
	 // 如果没有传参，返回一个空对象
	 if (!queryString) {
	   return obj;
	 }
	 // stuff after # is not part of query string, so get rid of it
	 queryString = queryString.split('#')[0];
	 // 将参数分成数组
	 let arr = queryString.split('&');
	 for (let i = 0; i < arr.length; i++) {
	   // 分离成key:value的形式
	   let a = arr[i].split('=');
	   // 将undefined标记为true
	   let paramName = a[0];
	   let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
	   // 如果调用对象时要求大小写区分，可删除这两行代码
	   // paramName = paramName.toLowerCase();
	   // if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
	   // 如果paramName以方括号结束, e.g. colors[] or colors[2]
	   if (paramName.match(/\[(\d+)?\]$/)) {
	     // 如果paramName不存在，则创建key
	     let key = paramName.replace(/\[(\d+)?\]/, '');
	     if (!obj[key]) obj[key] = [];
	     // 如果是索引数组 e.g. colors[2]
	     if (paramName.match(/\[\d+\]$/)) {
	       // 获取索引值并在对应的位置添加值
	       let index = /\[(\d+)\]/.exec(paramName)[1];
	       obj[key][index] = paramValue;
	     } else {
	       // 如果是其它的类型，也放到数组中
	       obj[key].push(paramValue);
	     }
	   } else {
	     // 处理字符串类型
	     if (!obj[paramName]) {
	       // 如果如果paramName不存在，则创建对象的属性
	       obj[paramName] = paramValue;
	     } else if (obj[paramName] && typeof obj[paramName] === 'string') {
	       // 如果属性存在，并且是个字符串，那么就转换为数组
	       obj[paramName] = [obj[paramName]];
	       obj[paramName].push(paramValue);
	     } else {
	       // 如果是其它的类型，还是往数组里丢
	       obj[paramName].push(paramValue);
	     }
	   }
	 }
	 return obj;
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
	orderPay,
	getUrlQuery
}