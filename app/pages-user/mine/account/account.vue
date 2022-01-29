<!-- 账号与安全 -->
<template>
	<view class="account">
		<view class="row flex-center-between">
			<text class="text-bold">手机号</text>
			<view class="flex-1 flex-center-end">
				<text class="color-6">{{mineInfo.phone}}</text>
				<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
		<view class="row flex-center-between" @click="changePwd">
			<text class="text-bold">密码修改</text>
			<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
		<view class="row flex-center-between">
			<text class="text-bold">邮箱</text>
			<view class="flex-1 flex-center-end">
				<text class="color-6">{{mineInfo.email ? mineInfo.email : '尚未绑定' }}</text>
				<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
		<view class="row flex-center-between">
			<text class="text-bold">微信</text>
			<view class="flex-1 flex-center-end">
				<text class="color-6">{{wxBind ? '已绑定' : '尚未绑定' }}</text>
				<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
		<view class="row flex-center-between">
			<text class="text-bold">QQ</text>
			<view class="flex-1 flex-center-end">
				<text class="color-6">{{qqBind ? '已绑定' : '尚未绑定' }}</text>
				<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			mineInfo: {},
		};
	},
	computed: {
		wxBind() {
			return !!this.mineInfo.wechatState
		},
		qqBind(){
			return !!this.mineInfo.qqState
		}
	},
	onLoad() {
		this.queryMineInfo()
		console.log('用户信息',getApp().globalData.user);
	},
	onNavigationBarButtonTap(event){
		this.saveUserInfo()
	},
	methods: {
		queryMineInfo() {
			this.$http.get('/user/queryInfo').then(res => {
				this.mineInfo = res;
			})
		},
		saveUserInfo(){
			this.$http.post('/user/modify',this.mineInfo,true).then(res=>{
				this.$tool.showSuccess('保存成功',()=>{
					uni.navigateBack({})
				})
			})
		},
		// 修改密码
		changePwd(){
			uni.navigateTo({
				url:'/pages/reset-password/reset-password?roleStatus=user'
			})
		}
	}
};
</script>

<style lang="less">
.account {
	height: 100%;
	padding: 20rpx 20rpx 40rpx 30rpx;
	background-color: #ffffff;
	overflow: hidden;
	box-sizing: border-box;
	.row {
		padding: 40rpx 0;
		font-size: 28rpx;
	}
	.color-6{
		color: #666666;
	}
	.icon-arrow {
		margin-left: 24rpx;
		width: 48rpx;
		height: 48rpx;
	}
}
</style>
