import config from './config.js'
import tool from './tool.js';

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
				title: url + '奋力加载中...',
				mask: true,
			})
		}
		
		return uni.request(options).then(response => {
			console.log('响应原始信息',response);
			const res = response[1].data
			const statusCode = response[1].statusCode;
			const rescode = res.code;
			const msg = res.message;
			const data = res.data;
			const success = res.success;
			console.log('============接口请求============');
			console.log('请求地址', url);
			console.log('请求参数', options);
			console.log('全部响应', res);
			console.log(`
				【【 字符串表示 ，方便给后端发报错信息 】】
				请求地址：${url}
				请求信息：${JSON.stringify(options)}
				响应信息：${JSON.stringify(res)}
			`);
			
			if (loading) {
				uni.hideLoading()
			}
			if (success) {
				return data;
			} else if(statusCode == 403){
				this.refreshToken();
				throw {
					message: msg
				};
			} else {
				if (loading) {
					uni.showToast({
						title: msg,
						icon: 'none'
					}) 
				}else{
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
	
	// 刷新token
	refreshToken(){
		const user = getApp().globalData.user
		if(user.token){
			this.request('/user/refreshToken',{},'GET',false).then(res=>{
				tool.saveUserStorage({...user,...res})
			}).catch(e=>{
				tool.logout();
			})
		}
	},
	// get 方法 url:请求路由   data:携带参数   loading：是否显示loading效果
	get(url = '', data = {}, loading = false) {
		return this.request(url, data, 'GET', loading);
	},
	// post 方法 url:请求路由   data:携带参数   loading：是否显示loading效果
	post(url = '', data = {}, loading = false) {
		return this.request(url, data, 'POST', loading);
	},
	// delete 方法 url:请求路由   data:携带参数   loading：是否显示loading效果
	delete(url = '', data = {}, loading = false) {
		return this.request(url, data, 'DELETE', loading);
	},
	
	/**
	 * 上传单个文件
	 * @param {Object} data 参数  {path:"",file:{}}  path是文件路径  file是文件对象 
	 * @param {Object} loading 是否显示loading效果
	 */
	upload( data = {}, loading = false) {

		return new Promise((resolve, reject) => {
			
			if (loading) {
				uni.showLoading({
					title: '努力上传中...',
					mask: true,
				})
			}
			
			uni.uploadFile({
				url: config.baseUrl + '/image/upload', 
				filePath: data.path,
				name: 'code',
				formData: {
					file:data.file
				},
				header:{
					'x-uid':1
				},
				success: (uploadFileRes) => {

					const res = JSON.parse(uploadFileRes.data);
					console.log('上传结束',res);
					
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
