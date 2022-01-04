<template>
	<view class="switchAccount">
		<view class="account-cell" v-for="(item,index) in accountList">
			<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
			<view class="text-view">
				<view class="name">{{item.nickName}}</view>
				<view class="phone">{{item.phone}}</view>
			</view>
			<view class="delete-btn" @click="removeRelationAccount(item)">取消关联</view>
		</view>
		<view class="bottom-btn" @click="navRelationAccount">关联更多账户</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				accountList:[]
			};
		},
		onReady() {
			this.getAccountList()
		},
		methods:{
			// 查询关联的账户列表
			getAccountList(){
				this.$http.get('/storeUser/queryRelateAccount').then(res=>{
					this.accountList = [{
						nickName:'敖德萨',
						phone:'1891175509'
					}] //  res;
				})
			},
			// 移除关联账号
			removeRelationAccount(item){
				console.log(item);
				const param = {
					storeUserId:item.storeUserId
				}
				this.$http.post('/storeUser/cancelRelate',param,true).then(res=>{
					this.$tool.showSuccess('已经取消关联')
					this.getAccountList()
				})
			},
			// 跳转关联账号页面
			navRelationAccount(){
				uni.navigateTo({
					url:'/pages-business/index/relation-account/relation-account'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex{
		display: flex;
		box-sizing: border-box;
		position: relative;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
	}
	
	.switchAccount{
		@extend .flex;
		min-height: 100vh;
		background-color: #f3f4f5;
		
		.account-cell{
			@extend .flex;
			flex-direction: row;
			padding: 30rpx;
			border-bottom: 2rpx solid #c8c7cc;
			align-items: center;
			background-color: #FFFFFF;
			.avatar{
				width: 80rpx;
				height: 80rpx;
				background-color: #f1f1f1;
				border-radius: 40rpx;
			}
			.text-view{
				@extend .flex;
				margin-left: 20rpx;
				flex: 1;
				.name{
					color: #333333;
					font-size: 32rpx;
				}
				.phone{
					color: #666666;
					font-size: 28rpx;
					margin-top: 10rpx;
				}
			}
			
			.delete-btn{
				color: #dd524d;
				font-size: 28rpx;
			}
		}
		
		.bottom-btn{
			@extend .flex;
			margin: 60rpx;
			height: 100rpx;
			border-radius: 18rpx;
			justify-content: center;
			align-items: center;
			color: #007AFF;
			font-size: 32rpx;
			border: 2rpx solid #007AFF;
		}
	}
	
	
</style>
