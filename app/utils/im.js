const txIm = uni.requireNativePlugin('TX-TencentIM-Plus');
if (txIm) {
	let isSuccess = txIm.initSDK({
		sdkAppID: 1400563151,
		logLevel: 4
	}, result => {
		console.log('初始化sdk', result);
	})

	// 设置基本消息（文本消息和自定义消息）的事件监听器
	txIm.removeSimpleMsgListener();
	txIm.addSimpleMsgListener(result => {
		console.log('基本消息监听',result);
		uni.$emit('SimpleMsgListen', result)
	})

	// 设置高级消息接口监听
	txIm.removeAdvancedMsgListener()
	txIm.addAdvancedMsgListener(result => {
		console.log('高级消息接口监听',result);
		uni.$emit('AdvancedMsgListen', result)
	})
	
	// 设置会话监听器
	txIm.removeConversationListener()
	txIm.setConversationListener(result=>{
		console.log('会话监听器',result);
		uni.$emit('ConversationListen', result)
	})
	
}

// im登录
const login = (userId, userSig) => {
	return new Promise((resolve, reject) => {
		txIm.login({
			userId,
			userSig
		}, result => {
			console.log('IM  登录',result);
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
	console.log('IM 消息操作回调', result);
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
		txIm.getGroupHistoryMessageList({
			groupId,
			count: 1000,
			msgId
		}, result => {
			if (result.code == 0) {
				resolve(result.msgs)
			} else {
				reject(result.errMsg);
			}
		})
	})
}

// 发送语音消息
const sendSoundMessage = (path, duration, groupId, loading = true) => {
	return new Promise((resolve, reject) => {

		let message = txIm.createSoundMessage({
			path,
			duration: duration
		})

		if (message && message.createMessageId) {
			loadingStart(loading)
			txIm.sendMessage({
				createMessageId: message.createMessageId,
				groupId
			}, result => {
				if (result.type == 'sendMessage') {
					loadingEnd(loading, result);
					if (result.code == 0) {
						resolve(result.msg)
					} else {
						reject(result.errMsg);
					}
				}
			})
		} else {
			reject('创建语音消息失败');
		}
	})
}

// 发送图片消息
const sendImageMessage = (path, groupId, loading = true) => {
	return new Promise((resolve, reject) => {
		loadingStart(loading)
		let message = txIm.createImageMessage({
			path
		});

		if (message && message.createMessageId) {
			loadingStart(loading)
			txIm.sendMessage({
				createMessageId: message.createMessageId,
				groupId
			}, result => {
				if (result.type == 'sendMessage') {
					loadingEnd(loading, result);
					if (result.code == 0) {
						resolve(result.msg)
					} else {
						reject(result.errMsg);
					}
				}
			})
		} else {
			reject('创建语音消息失败');
		}
	})
}

// 下载图片
const downloadImage = (msgId) => {
	return new Promise((resolve, reject) => {
		txIm.downloadImage({
			"msgId": msgId
		}, progressResult => {
			console.log('下载图片 pro', progressResult);
		}, succResult => {
			resolve(succResult)
			console.log('下载图片 succ', succResult);
		}, failResult => {
			reject(failResult)
			console.log('下载图片 err', failResult);
		})
	})
}


// 下载语音
const downloadSound = (msgId) => {
	return new Promise((resolve, reject) => {
		txIm.downloadSound({
			"msgId": msgId
		}, progressResult => {
			console.log('下载语音 pro', progressResult);
		}, succResult => {
			resolve(succResult)
			console.log('下载语音 succ', succResult);
		}, failResult => {
			reject(failResult)
			console.log('下载语音 err', failResult);
		})
	})
}

// 加入群聊
const  joinGroup = (groupId)=>{
	return new Promise((resolve,reject)=>{
		txIm.joinGroup({groupId},result=>{
			console.log('加入群聊',result);
			if (result.code == 0) {
				resolve(result)
			} else {
				reject(result.errMsg);
			}
		})
	})
}

export default {
	login,
	sendGroupTextMessage,
	getGroupHistoryMessageList,
	sendSoundMessage,
	sendImageMessage,
	downloadImage,
	downloadSound,
	joinGroup,
}
