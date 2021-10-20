<!-- 在线客服 -->
<template>
	<view class="online">
		<view class="flex-center row" @click="callPhone">
			<image class="icons" src="../../../static/images/icons/icon-yellow-phone.svg" mode="aspectFill"></image>
			<text>平台客服电话:{{TEL}}</text>
		</view>
		<view class="flex-center row" @click="copyQQ(QQ)">
			<image class="icons" src="../../../static/images/icons/icon-yellow-qq.svg" mode="aspectFill"></image>
			<text>QQ:{{QQ}}</text>
		</view>
		<view class="flex-center row" @click="copyEmail(EMAIL)">
			<image class="icons" src="../../../static/images/icons/icon-yellow-email.svg" mode="aspectFill"></image>
			<text>邮箱:{{EMAIL}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TEL:'',
				QQ:'',
				EMAIL:'',
			};
		},
		onLoad() {
			this.queryInfo()
		},
		methods:{
			queryInfo(){
				this.$http.post('/value/config/batchQuery',{codeList:['TEL','EMAIL','QQ']}).then(res=>{
					res.forEach(ba=>{
						if(ba.code == 'TEL'){
							this.TEL = ba.content;
						}else if(ba.code == 'EMAIL'){
							this.EMAIL = ba.content;
						}else if(ba.code == 'QQ'){
							this.QQ = ba.content;
						}
					})
				})
			},
			callPhone(){
				plus.runtime.openURL('tel://' + this.TEL)
			},
			copyEmail(data){
				uni.setClipboardData({
				    data,
				    success:  () =>{
				        this.$tool.showSuccess('邮箱复制成功')
				    }
				});
			},
			copyQQ(data){
				uni.setClipboardData({
				    data,
				    success:  () =>{
				        this.$tool.showSuccess('QQ号复制成功')
				    }
				});
			}
			
		}
	}
</script>

<style lang="less">
	.online{
		padding: 40rpx 20rpx;
		height: 100%;
		font-size: 28rpx;
		background-color: #FFFFFF;
		overflow: hidden;
		box-sizing: border-box;
		.row{
			margin-top: 40rpx;
		}
		.icons{
			margin-right: 24rpx;
			width: 48rpx;
			height: 48rpx;
		}
	}
</style>
