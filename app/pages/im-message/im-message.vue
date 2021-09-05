<template>
	<view class="im-message-page">
		<view class="list-view">
			
		</view>
		<view class="bottom" :style="{}">
			<view class="input-bar">
				<view class="text-input">
					<input class="input" type="text" v-model="messageText" confirm-type="send"
							cursor-spacing="10" cursor="10" :focus="textInputFocus" @focus="textInputFocus = true" @blur="textInputFocus = false"
							@confirm='sendTextMessage'/>
				</view>
				<image class="img-btn" src="../../static/images/im/voice_btn.png" mode="aspectFit"></image>
				<image class="img-btn" src="../../static/images/im/emoji_btn.png" mode="aspectFit"></image>
				<image class="img-btn" src="../../static/images/im/image_btn.png" mode="aspectFit"></image>
			</view>
			<!-- <view class="bottom-emoji">
				
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 群组id
				groupId:'',
				// 用户名称
				userName:'',
				// 用户头像
				userPortrait:'',
				// 商家名称
				storeName:'',
				// 商家头像
				storePortrait:'',
				// 要发送的文字消息
				messageText:'',
				// 输入框是否获取焦点
				textInputFocus:false,
				// 消息列表
				messageList:[]
			};
		},
		onLoad(option) {
			this.groupId = option.groupId;
			this.userName = option.userName;
			this.userPortrait = option.userPortrait;
			this.storeName = option.storeName;
			this.storePortrait = option.storePortrait;
		},
		onReady() {
			uni.setNavigationBarTitle({
				title:this.navTitle
			})
		},
		computed:{
			navTitle(){
				const user = getApp().globalData.user;
				return user.roleStatus == 'user' ? this.storeName : this.userName
			}
		},
		methods:{
			// 发送文本消息
			sendTextMessage(){
				this.$tool.imTool.sendGroupTextMessage(this.messageText,this.groupId).then(msg=>{
					this.messageList.push(msg);
					this.messageText = ''
				})
			}
		}
	}
</script>

<style lang="scss" src="./im-message.scss">

</style>
