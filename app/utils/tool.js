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
			url: '/pages-user/index/index/index',
			complete: function(){
				
				// 这里判断如果剪贴板里有复制链接的参数，则根据参数跳转到对应页面
				if(store.state.copyUrlParams){
					jumpWithCopyUrl();
				}
			}
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
				const param = {
						appid: res.appId,
						noncestr: res.nonceStr,
						package: res.pkg,
						partnerid: res.partnerId,
						prepayid: res.prepayId,
						timestamp: parseInt(res.timeStamp),
						sign: res.paySign
					}
				console.log('微信支付参数', param);
				uni.requestPayment({
				    provider: "wxpay", 
				    orderInfo: param,
				    success: function (res) {
						console.log('微信支付成功:' + JSON.stringify(res));
						resolve(res);
						// 跳转到订单列表页
						uni.redirectTo({
							url: `/pages-user/mine/order/order`
						});
					},
				    fail: function (err) {
						console.log('微信支付失败:' + JSON.stringify(err));
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

/**
 * 判断是否是手机号
 * @param {String} value 手机号  
 */
const isPhoneNumber = (value) => {
	const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
	if (!reg.test(value)) {
	    return false
	}else{
	    return Number(value)
	}
}


/**
 * H5使用： 打开App 或者 打开App下载页面
 * @param {url}  拼接好的复制链接地址
 */
const openApp = (url)=>{
	
	// #ifdef H5
		uni.setClipboardData({
			data: url,
			success: () => {
				uni.hideToast(); 
				if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
				    var loadDateTime = new Date();
					window.location = "tyjy://";//schema链接或者universal link
					window.setTimeout(function() { //如果没有安装app,便会执行setTimeout跳转下载页
						window.location = "http://itunes.apple.com/app/******"; //TODO: ios下载地址  
					}, 2500);	                          
				} else if (navigator.userAgent.match(/android/i)) {
				    var state = null;
				    window.location = 'tyjy://'; //schema链接或者universal link
				    window.setTimeout(function() { //如果没有安装app,便会执行setTimeout跳转下载页
				        window.location = "https://a.app.qq.com/o/simple.jsp?pkgname=com.ihomefnt.tyjy"; //android下载地址  
				    }, 2500);  
				}
				
			}
		});
	// #endif	
}


/**
 * 根据剪贴板里复制链接的参数，跳转到对应App页面
 */
const jumpWithCopyUrl = () => {
	let params = store.state.copyUrlParams;
	const linkType = params.linkType;
	console.log("params == ", params);
	
	// 这里要清空掉复制链接的参数对象
	store.commit('setCopyUrlParams',undefined)
	
	if (linkType == 8){ // H5分享 - 店铺
		const storeId = params.storeId;
		uni.navigateTo({
			url: `/pages-user/index/store-details/store-details?storeId=${storeId}`
		})
	} else if (linkType == 7){ // H5分享 - 坚持不懈商品
		const goodsId = params.goodsId;
		const unremittinglyId = params.unremittinglyId;
		store.commit('setUnremittinglyVO',{goodsId,unremittinglyId});
		uni.navigateTo({
			url: `/pages-user/index/goods-details/goods-details-unremittingly`
		});
	} else if (linkType == 6){ // H5分享 -普通商品
		const goodsId = params.goodsId;
		uni.navigateTo({
			url: `/pages-user/index/goods-details/goods-details?goodsId=${goodsId}`
		});
	} else if (linkType == 5) { //店铺分销
		const storeId = params.storeId;
		uni.navigateTo({
			url: `/pages-user/index/store-details/store-details?storeId=${storeId}`
		})
	} else if (linkType == 4) { //商品分销
		const goodsId = params.goodsId;
		const userId = params.userId;
		store.commit('setInviterId', userId);
		store.commit('setinviterGoodsId', goodsId);
		uni.navigateTo({
			url: `/pages-user/index/goods-details/goods-details?goodsId=${goodsId}`
		});
	} else if (linkType == 3) { //邀请好友参加坚持不懈
		const userId = params.userId;
		store.commit('setInviterId', userId);
		uni.switchTab({
			url: '/pages-user/index/index/index'
		})
		// 打开首页->活动->坚持不懈
		uni.$emit('activity-open', 1)
	} else if (linkType == 2) { //邀请好久参加组团优惠
		const userId = params.userId;
		store.commit('setInviterId', userId);
		uni.switchTab({
			url: '/pages-user/index/index/index'
		})
		// 打开首页->活动->组团优惠
		uni.$emit('activity-open', 0)
	}
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
	getUrlQuery,
	isPhoneNumber,
	openApp,
	jumpWithCopyUrl
}