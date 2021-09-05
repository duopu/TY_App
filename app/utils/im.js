const txIm = uni.requireNativePlugin('TX-TencentIM-Plus');
let isSuccess = txIm.initSDK({
	sdkAppID: 1400563151,
	logLevel: 4
}, result => {
	console.log('初始化sdk', result);
})

// im登录
const login = (userId, userSig) => {
	return new Promise((resolve, reject) => {
		txIm.login({
			userId,
			userSig
		}, result => {
			if (result.code == 0) {
				resolve();
			} else {
				reject(result.errMsg);
			}
		})
	})
}

// 发送群文本消息
const sendGroupTextMessage = (textMsg, groupId,tip = true) => {
	if(tip){
		uni.showLoading({
			title:'发送中...'
		})
	}
	return new Promise((resolve, reject) => {
		txIm.sendGroupTextMessage({
			textMsg,
			groupId,
			priority: 0
		}, result => {
			if(tip){
				uni.hideLoading()
			}
			if(result.code == 0){
				resolve(result.msg)
			}else{
				if(tip){
					uni.showToast({
						title:'发送失败',
						icon:'none'
					})
				}
				reject(result.errMsg);
			}
		})
	})
}


export default {
	login,
	sendGroupTextMessage
}
