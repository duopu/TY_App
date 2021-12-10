<script>
	import config from './utils/config.js';

	export default {
		// 全局数据对象
		globalData: {
			// 用户信息
			user: {
			},
			// im 消息
			messageParam: {}
		},
		onLaunch: function() {

			// #ifdef APP-PLUS
			// 从本地恢复登录信息;
			uni.getStorage({
				key: config.storageKeys.loginUserKey,
				success: res => {
					const user = res.data;
					console.log('=========== 从本地恢复登录信息  ===',user);
					if (user.token) {
						this.$tool.login(user);
					}
				}, 
				fail(err) {
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			});

			// 监听会话变化
			uni.$on('ConversationListen', (data) => {
				console.log('监听会话变化 app.vue', data);
				if (data.type == 'onConversationChanged') {
					this.$store.commit('onConversationChanged', data.conversationList)
				}
			})

			setTimeout(() => {
				this.$store.dispatch('getGroupConversationMap')
			}, 2000)

			// 定时刷新token
			this.$http.refreshToken();
			const timer = setInterval(() => {
				this.$http.refreshToken();
			}, 60 * 60 * 1000);
			
			console.log('监听推送++');
			plus.push.addEventListener('click', (message) => {
			    console.log('推送click', message)
			}, false)
			
			plus.push.addEventListener('receive', (message) => {
			    console.log('推送receive', message)
				// 延迟1s执行
				setTimeout(()=>{
					const user = this.globalData.user;
					// 未登录状态不做处理
					if(!user.token) return;
					const payload = message.payload;
					const type = payload.type;
					if(type == 1 || type == 2){
						// 商家端 订单消息
						uni.navigateTo({
							url:`/pages-business/index/order-details/order-details?orderId=${payload.data}`
						})
					}
					if(type == 3){
						// 用户端  直播开课
						uni.navigateTo({
							url:`/pages-user/index/live/live?courseId=${payload.data}`
						})
					}
				},1000)
				
			 }, false)
			 
			// #endif
		},
		onShow: function() {
			console.log('App Show');
			
			// 读取剪贴板中的信息
			// #ifdef APP-PLUS
			uni.getClipboardData({
				success: (res) => {
					console.log(res.data);
					let copyLink = res.data;
					if (!copyLink.search(config.copyUrl)) {
						return
					}
					// 这里直接让剪贴板的内容复制为空字符串，避免重复复制链接的功能
					uni.setClipboardData({
						data: '',
						success: () => {
							uni.hideToast(); //这里去掉系统级粘贴成功的弹窗效果
						},
					});
					
					let params = this.$tool.getUrlQuery(copyLink);
					this.$store.commit('setCopyUrlParams',params);
					
					// 如果用户已经登录过，则直接跳转对应页面，否则先去登录，再去跳转
					if (getApp().globalData.user.token) {
						this.$tool.jumpWithCopyUrl()
					}else{
						uni.getStorage({
							key: config.storageKeys.loginUserKey,
							success: res => {
								const user = res.data;
								if (user.token) {
									this.$tool.jumpWithCopyUrl()
								}
							},
							fail(err) {
								// 为啥这样写  我先注释了  丁乐
								// uni.reLaunch({
								// 	url: '/pages/login/login'
								// });
							}
						})
					}
				}
			});
			// #endif
			

		},
		onHide: function() {
			console.log('App Hide');
		},
		onResize() {
			window.reload();
		}
	};
</script>

<style lang="less">
	/* #ifndef APP-PLUS-NVUE */
	@import './less/common.less';
	@import './less/font-face.less';

	page {
		--safe-area-inset-top: 0;
		--safe-area-inset-right: 0;
		--safe-area-inset-bottom: 0;
		--safe-area-inset-left: 0;
		font-size: 26rpx;
		color: #222222;
		height: 100%;
		box-sizing: border-box;
	}

	@supports (top: constant(safe-area-inset-top)) {
		page {
			--safe-area-inset-top: constant(safe-area-inset-top);
			--safe-area-inset-right: constant(safe-area-inset-right);
			--safe-area-inset-bottom: constant(safe-area-inset-bottom);
			--safe-area-inset-left: constant(safe-area-inset-left);
		}
	}

	@supports (top: env(safe-area-inset-top)) {
		page {
			--safe-area-inset-top: env(safe-area-inset-top);
			--safe-area-inset-right: env(safe-area-inset-right);
			--safe-area-inset-bottom: env(safe-area-inset-bottom);
			--safe-area-inset-left: env(safe-area-inset-left);
		}
	}

	/* #endif */
	
	
	/* #ifdef H5 */   
	/* H5商品详情分享页面去掉返回按钮 */
	uni-page[data-page="pages-share/goods-details/goods-details"] .uni-page-head-hd {
			display: none;
	}
	/* H5组团优惠分享页面去掉返回按钮 */
	uni-page[data-page="pages-share/goods-group/goods-group"] .uni-page-head-hd {
			display: none;
	}
	/* H5坚持不懈分享页面去掉返回按钮 */
	uni-page[data-page="pages-share/goods-unremittingly/goods-unremittingly"] .uni-page-head-hd {
			display: none;
	}
	/* #endif */
	 
</style>
