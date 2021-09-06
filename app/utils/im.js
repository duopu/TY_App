const txIm = uni.requireNativePlugin('TX-TencentIM-Plus');
if (txIm) {
	let isSuccess = txIm.initSDK({
		sdkAppID: 1400563151,
		logLevel: 4
	}, result => {
		console.log('初始化sdk', result);
	})
}

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

const loadingStart = (loading = true) => {
	if (loading) {
		uni.showLoading({
			title: '处理中...'
		})
	}
}

const loadingEnd = (loading, result) => {
	console.log('IM 消息操作回调',result);
	if (loading) {
		uni.hideLoading();
		if (result.code != 0) {
			uni.showToast({
				title: '发生错误!',
				icon: 'none'
			})
		}
	}
}

// 发送群文本消息
const sendGroupTextMessage = (textMsg, groupId, loading = true) => {
	return new Promise((resolve, reject) => {
		loadingStart(loading)
		txIm.sendGroupTextMessage({
			textMsg,
			groupId, 
			priority: 0
		}, result => {
				loadingEnd(loading, result);
				if (result.code == 0) {
					resolve(result.msg)
				} else {
					reject(result.errMsg);
				}
		})
	})
}

// 获取群组历史消息
const getGroupHistoryMessageList = (groupId, msgId = '', loading = true) => {
	return new Promise((resolve, reject) => {
		loadingStart(loading)
		txIm.getGroupHistoryMessageList({
			groupId,
			count: 20,
			msgId
		}, result => {
			loadingEnd(loading, result);
			if (result.code == 0) {
				resolve(result.msgs)
			} else {
				reject(result.errMsg);
			}
		})
	})
}

// 发送语音消息
const sendSoundMessage = (path, duration,groupId,loading = true) => {
	return new Promise((resolve,reject)=>{

		let message = txIm.createSoundMessage({path,duration:duration})

		if(message && message.createMessageId){
			loadingStart(loading)
			txIm.sendMessage({createMessageId: message.createMessageId,groupId}, result => {
				if(result.type == 'sendMessage'){
					loadingEnd(loading, result);
					if (result.code == 0) {
						resolve(result.msg)
					} else {
						reject(result.errMsg);
					} 
				}
			})
		}else{
			reject('创建语音消息失败');
		}
	})
}

// 发送图片消息
const sendImageMessage = (path,groupId,loading = true)=>{
	return new Promise((resolve,reject)=>{
		loadingStart(loading)
		txIm.sendImageMessage({path,groupId},result=>{
			if(result.type == 'sendImageMessage'){
				loadingEnd(loading, result);
				if (result.code == 0) {
					resolve(result.msg)
				} else {
					reject(result.errMsg);
				} 
			}
		});
	})
}


export default {
	login,
	sendGroupTextMessage,
	getGroupHistoryMessageList,
	sendSoundMessage,
	sendImageMessage,
}
