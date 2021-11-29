<template>
	<uni-popup  ref="popup" :safeArea="false" type="center">
		<view class="card-view">
			<text class="title">提示</text>
			<view class="group-view">
				<text class="label">分组：</text>
				<picker class="picker" mode="selector" :range="groupList" :range-key="groupName" @change="e=>groupSelectIndex=e.detail.value" >
					<view class="">{{groupList[groupSelectIndex].groupName}}</view>
				</picker>
			</view>
			<view class="content-view">
				<text class="label">短语：</text>
				<input class="input" placeholder="请输入短语" />
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		name:"phrase-popup",
		data() {
			return {
				groupList:[],
				groupSelectIndex:0
			};
		},
		mounted() {
			this.$http.get('/quickPhrase/queryGroupList').then(res=>{
				this.groupList = res
			})
		},
		methods:{
			open(){
				this.$refs.popup.open()
			},
			close(){
				this.$refs.popup.close()
			},
			query
		}
	}
</script>
 
<style lang="scss">
	
	.flex{
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
	}
	
.card-view{
	@extend  .flex;
	width: 600rpx;
	background-color: #FFFFFF;
	font-size: 32rpx;
	color: #333333;
	border-radius: 12rpx;
	padding: 30rpx;
	
	
	.title{
		font-weight: bold;
		align-self: center;
	}
	
	.group-view{
		@extend  .flex;
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
		align-items: center;
		margin-top: 40rpx;
		.label{
			font-size: 28rpx;
		}
		.picker{
			flex: 1;
		}
	}
	
	.content-view{
		@extend  .flex;
		flex-direction: row;
		margin-top: 40rpx;
		
		.label{
			font-size: 28rpx;
		}
		.input{
			flex: 1;
		}
	}
	
}
</style>
