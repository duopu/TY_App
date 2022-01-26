<template>
	<view class="dy-page">
		<view class="title">打印机</view>
		<view class="desc">当前打印机编号：{{nowDyNum || '无'}}</view>
		<view class="input-view">
			<view class="label">新打印机编号：</view>
			<input type="text" class="input" v-model="newDyNum" placeholder="请输入打印机编号" />
		</view>

		<view class="confirm-btn" @click="confirmClick">
			确定修改
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newDyNum: ''
			};
		},
		computed:{
			nowDyNum(){
				return this.$store.state.storeInfo.sid
			}
		},
		methods: {

			// 修改打印机
			confirmClick() {
				if (!this.newDyNum) {
					this.$tool.showToast('请先填写打印机编号')
					return
				}

				this.$http.post('/store/updatePrint', {
					sid: this.newDyNum
				}, true).then(res => {
					this.$tool.showSuccess('更新成功')
					this.newDyNum = ''
					// 更新店铺信息
					this.$store.dispatch('queryStoreInfo');
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex {
		display: flex;
		box-sizing: border-box;
		position: relative;
		flex-direction: column;
		align-items: stretch;
	}

	.dy-page {
		@extend .flex;
		padding-left: 60rpx;
		padding-right: 60rpx;


		.title {
			font-size: 48rpx;
			font-weight: bold;
			margin-top: 60rpx;
			color: #222222;
		}

		.desc {
			margin-top: 60rpx;
			color: #666666;
		}

		.input-view {
			@extend .flex;
			flex-direction: row;
			align-items: center;
			margin-top: 40rpx;
			border-bottom: 2rpx solid #999999;

			.label {
				color: #333333;
				font-size: 28rpx;
			}

			.input {
				flex: 1;
				margin-left: 10rpx;

			}
		}

		.confirm-btn {
			@extend .flex;
			margin-top: 40rpx;
			background-color: #5aa9fa;
			justify-content: center;
			align-items: center;
			height: 100rpx;
			border-radius: 12rpx;
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: bold;
		}
	}
</style>
