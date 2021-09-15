<!-- 基本信息 -->
<template>
	<view class="information">
		<view class="flex-column-center" @click="uploadAvatarImg">
			<image class="avatar-image" :src="mineInfo.avatar" mode="aspectFill"></image>
			<text class="text">点击更换</text>
		</view>
		<view class="row flex-center-between">
			<text class="text-bold">昵称</text>
			<input class="color-6 flex-1" type="text" v-model="mineInfo.nickName" placeholder="未设置昵称" />
			<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg"></image>
		</view>
		<picker mode="selector" :range="sexData" @change="sexChange">
			<view class="row flex-center-between">
				<text class="text-bold flex-1">性别</text>
				<text class="color-6 ">{{mineInfo.gender == 1 ? '男' : '女'}}</text>
				<image mode="aspectFill" class="icon-arrow" src="../../../static/images/icons/icon-arrow-right.svg">
				</image>
			</view>
		</picker>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				mineInfo: {},
				sexData: ['男', '女'],

			};
		},
		onLoad() {
			this.queryMineInfo()
		},
		onNavigationBarButtonTap(event){
			this.saveUserInfo()
		},
		methods: {
			queryMineInfo() {
				this.$http.get('/user/queryInfo').then(res => {
					if(!res.gender){
						res.gender = 1
					}
					this.mineInfo = res;
				})
			},
			sexChange(event) {
				const value = event.detail.value;
				this.mineInfo.gender = value == 0 ? 1 : 2
			},
			uploadAvatarImg() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					success: (e) => {
						let formData = {
							file: e.tempFiles[0],
							path: e.tempFilePaths[0]
						}
						console.log('上传图片',e);
						// 上传图片
						this.$http.upload(formData).then(res => {
							this.mineInfo.avatar = res;
						})
					}
				});
			},
			saveUserInfo(){
				this.$http.post('/user/modify',this.mineInfo,true).then(res=>{
					this.$tool.showSuccess('保存成功',()=>{
						uni.navigateBack({})
					})
				})
			}
		}
	};
</script>

<style lang="less">
	.information {
		height: 100%;
		padding: 40rpx 20rpx 40rpx 30rpx;
		background-color: #ffffff;
		overflow: hidden;
		box-sizing: border-box;

		.avatar-image {
			width: 144rpx;
			height: 144rpx;
			border: 4rpx solid #FFFFFF;
			border-radius: 50%;
			background-color: #F0F0F0;
		}

		.text {
			margin-top: 20rpx;
			font-size: 24rpx;
			color: #999999;
		}

		.row {
			padding: 40rpx 0;
			font-size: 28rpx;
		}

		.color-6 {
			text-align: right;
			color: #333333;
		}

		.icon-arrow {
			margin-left: 24rpx;
			width: 48rpx;
			height: 48rpx;
		}
	}
</style>
