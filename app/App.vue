<script>
	import config from './utils/config.js';

	export default {
		// 全局数据对象
		globalData: {
			user: {}
		},

		onLaunch: function() {
			// setRemInit();
			console.log('App Launch');

			// 从本地恢复登录信息;
			uni.getStorage({
				key: config.storageKeys.loginUserKey,
				success: res => {
					const user = res.data;
					if (user.token) {
						console.log('本地用户信息',user);
						// 内存保存
						getApp().globalData.user = user;
					} else {
						// 本地无用户信息，去登录页
						console.log('本地无用户信息,去登录页');
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}
				},
				fail(err) {
					console.log('失败', err);
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			});
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		onResize() {
			window.reload()
		}
	};
</script>

<style lang="less">
	@import './less/common.less';

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
</style>
