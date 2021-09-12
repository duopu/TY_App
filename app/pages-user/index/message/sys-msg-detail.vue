<template>
	<view class="msg-page">
		<text class="title">{{messageInfo.title}}</text>
		<text class="content">{{messageInfo.content}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				messageInfo:{}
			};
		},
		onLoad(option) {
			this.id = option.id;
			this.queryMessageInfo();
			this.readAnnouncement();
		},
		methods:{
			// 查询消息详情
			queryMessageInfo(){
				this.$http.get('/announcement/queryDetail',{announcementId:this.id},true).then(res=>{
					this.messageInfo = res;
				})
			},
			// 设置消息已读
			readAnnouncement(){
				this.$http.post('/announcement/read',{announcementId:this.id},true).then(res=>{
				})
			}
		}
	}
</script>

<style lang="less">
	.msg-page{
		height: 100%;
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		padding-left: 30rpx;
		padding-right: 30rpx;
		
		.title{
			margin-top: 30rpx;
			color: #000000;
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			
		}
		.content{
			margin-top: 20rpx;
			color: #444444;
			font-size: 38rpx;
		}
	}
</style>
