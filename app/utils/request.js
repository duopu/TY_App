import config from './config.js'

export default {


	request(url, data, method, loading) {
		
		let header = {
			Accept: 'application/json',
			'Content-Type': method == 'POST' ? 'application/json; charset=utf-8' : 'application/x-www-form-urlencoded',
			'x-uid':1
		}
		const user = getApp().globalData.user
		if (user.token) {
			console.log('注入token',user.token);
			header.Authorization = user.token
		}
		let options = {}
		options.header = header;
		options.method = method || 'POST';
		options.url = config.baseUrl + url;
		options.data = data

		if (loading) {
			uni.showLoading({
				title: '奋力加载中...',
				mask: true,
			})
		}
		
		return uni.request(options).then(response => {
			
			const res = response[1].data
			const rescode = res.code;
			const msg = res.message;
			const data = res.data;
			const success = res.success;
			console.log('============接口请求============');
			console.log('请求地址', url);
			console.log('请求参数', options);
			console.log('全部响应', res);
			console.log(`
				【【 字符串表示 】】
				请求信息：${JSON.stringify(options)}
				响应信息：${JSON.stringify(res)}
			`);
			
			if (loading) {
				uni.hideLoading()
			}
			if (success) {
				return data;
			} else if(rescode == 202){
				
				getApp().globalData.user = {};

				uni.removeStorage({
					key:config.storageKeys.loginUserKey
				})
				
				uni.reLaunch({
					url: '/pages/login/login'
				});
				
				throw {
					message: msg
				};
			} else {
				if (loading) {
					uni.showToast({
						title: msg,
						icon: 'none'
					}) 
				}
				throw {
					message: msg
				};
			}
		}).catch(err => {
			
			const message = err.message || '请求失败,请检查网络'
			if (loading) {
				uni.showToast({
					title: message,
					icon: 'none'
				})
			}
			throw {
				message: message
			};
		})
	},
	// get 方法
	get(url = '', data = {}, loading = false) {
		return this.request(url, data, 'GET', loading);
	},
	// post 方法
	post(url = '', data = {}, loading = false) {
		return this.request(url, data, 'POST', loading);
	},
	upload( data = {}, loading = false) {

		return new Promise((resolve, reject) => {
			
			if (loading) {
				uni.showLoading({
					title: '努力上传中...',
					mask: true,
				})
			}
			
			uni.uploadFile({
				url: config.baseUrl + '/core/upload/uploadPic', 
				filePath: data.path,
				name: 'code',
				formData: data,
				header:{
					'x-uid':1
				},
				success: (uploadFileRes) => {

					const res = JSON.parse(uploadFileRes.data);
					console.log('上传成功',res);
					
					const rescode = res.code;
					const msg = res.message;
					const data = res.data;
					const success = res.success

					if (loading) {
						uni.hideLoading()
					}
					if (success) {
						resolve(data)
					} else {
						if (loading) {
							uni.showToast({
								title: msg,
								icon: 'none'
							})
						}
						reject({message: msg})
					}

				},
				fail: (err) => {
					const message = err.message || '请求失败,请检查网络'
					if (loading) {
						uni.showToast({
							title: message,
							icon: 'none'
						})
					}
					reject({message})
				}
			});
			
		})

	}

}
