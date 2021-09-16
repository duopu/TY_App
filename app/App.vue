<script>
	import config from './utils/config.js';

	export default {
		// 全局数据对象
		globalData: {
			// 用户信息
			user: {},
			// im 消息
			messageParam:{}
		},
		onLaunch: function() {

			// 从本地恢复登录信息;
			uni.getStorage({
				key: config.storageKeys.loginUserKey,
				success: res => {
					const user = res.data;
					console.log('从本地恢复登录信息',user);
					if (user.token) {
						this.$tool.login(user);
					} else {
						// 本地无用户信息，去登录页
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}
				},
				fail(err) {
					console.log('从本地恢复登录信息; 失败', err);
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			});


			// 监听会话变化
			uni.$on('ConversationListen',(data)=>{
				console.log('监听会话变化 22',data);
				if(data.type == 'onConversationChanged'){
					this.$store.commit('onConversationChanged',data.conversationList)
				}
			})

			setTimeout(()=>{
				this.$store.dispatch('getGroupConversationMap')
			},2000)


		// 定时刷新token
		this.$http.refreshToken();
		const timer = setInterval(() => {
			this.$http.refreshToken();
		}, 60 * 60 * 1000);
	},
	onShow: function() {
		console.log('App Show');
		
		// 在非H5环境下，读取剪贴板中的信息实现复制链接功能
		// #ifndef H5
			uni.getClipboardData({
			    success: function (res) {
			        console.log(res.data);
					let copyLink = res.data;
					if(!copyLink.search('https://tengyunjiaoyu.com.cn')){ 
						return
					}
					
					// 这里直接让剪贴板的内容复制为空字符串，避免重复复制链接的功能
					uni.setClipboardData({data: ''});
					
					let params = this.$tool.getUrlQuery(copyLink);
					console.log("params == ",params);
					if(params.linkType == 5) { //店铺分享
						const userId = params.userId;
						const storeId = params.storeId;
						this.$store.commit('setInviterId',userId);
						uni.navigateTo({
							url:`/pages-user/index/store-details/store-details?storeId=${this.goodsInfo.storeId}`
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
@import './less/common.less';
@import './less/font-face.less';

/* #ifndef APP-PLUS-NVUE */

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
</style>
