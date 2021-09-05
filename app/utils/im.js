const txIm = uni.requireNativePlugin('TX-TencentIM-Plus');
let isSuccess = txIm.initSDK({
	sdkAppID: 1400563151,
	logLevel: 4
}, result => {
	console.log('初始化sdk', result);
})

// im登录
const login = (userId, userSig) => {
	return new Promise((resolve,reject)=>{
		txIm.login({
			userId,
			userSig
		}, result => {
			if(result.code == 0){
				resolve();
			}else{
				reject();
			}
		})
	})
}

export default {
	login
}
