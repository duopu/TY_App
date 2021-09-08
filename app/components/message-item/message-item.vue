<template>
	<view class="message-item-component"
		:style="{justifyContent:messageStyle.isMineMessage ? 'flex-end' : 'flex-start'}">
		<image class="portrait-left" v-if="!messageStyle.isMineMessage" :src="messageStyle.portraitUrl"
			mode="aspectFill" />

		<!-- 文字内容 -->
		<view v-if="message.elemType == 1"
			:class="[messageStyle.isMineMessage ? 'content-text-mine' : 'content-text-other']">
			<text>{{message.textElem.msg}}</text>
		</view>

		<!-- 图片内容 -->
		<image v-if="message.elemType == 3" :style="imageStyle" :src="message.imageElem.path" mode="aspectFit"
			@click="showBigImage"></image>

		<!-- 语音内容 -->
		<view v-if="message.elemType == 4"
			:class="[messageStyle.isMineMessage ? 'contet-voice-mine' : 'contet-voice-other']" :style="soundStyle"
			@click="playVoice">
			<image class="voice-icon-left" v-if="!messageStyle.isMineMessage" src="../../static/images/im/yy-left.png"
				mode="aspectFit"></image>
			<text>{{message.soundElem.duration}}″</text>
			<image class="voice-icon-right" v-if="messageStyle.isMineMessage" src="../../static/images/im/yy-right.png"
				mode="aspectFit"></image>
		</view>

		<image class="portrait-right" :src="messageStyle.portraitUrl" mode="aspectFill"
			v-if="messageStyle.isMineMessage" />
	</view>
</template>

<script>
	export default {
		name: "message-item",
		props: {
			message: {
				type: Object,
				default: () => {}
			},
			userInfo: {
				type: Object,
				default: () => {}
			}
		},
		computed: {
			messageStyle() {
				const user = getApp().globalData.user;
				let isMineMessage = true
				let portraitUrl = '';
				if (user.roleStatus == 'user') {
					// 当前是用户
					isMineMessage = this.message.sender == user.imNum
					portraitUrl = isMineMessage ? this.userInfo.userPortrait : this.userInfo.storePortrait
				} else {
					// 当前是商家
					isMineMessage = this.message.sender !== this.userInfo.userIM
					portraitUrl = isMineMessage ? this.userInfo.storePortrait : this.userInfo.userPortrait
				}
				return {
					isMineMessage,
					portraitUrl
				}
			}
		},
		mounted() {
			if (this.message.elemType == 3) {
				this.$tool.imTool.downloadImage(this.message.msgId).then(res => {
					this.message.imageElem.path = res.path;
					let width = '300rpx'
					let height = '300rpx'
					if (res.width > res.height) {
						let b = res.width / res.height
						let proportion = b > 3 ? 3 : b;
						height = `${300 / b}rpx`;
					} else {
						let b = res.height / res.width
						let proportion = b > 3 ? 3 : b;
						width = `${300 / b}rpx`;
					}
					this.imageStyle = {
						width,
						height,
						borderRadius: '16rpx'
					}
				})
			} else if (this.message.elemType == 4) {
				this.$tool.imTool.downloadSound(this.message.msgId).then(res => {
					this.message.soundElem.path = res.path;

					this.soundStyle = {
						width: `${150 +250 *  res.duration / 60}rpx`
					}
				})
			}
		},
		data() {
			return {
				// 图片样式
				imageStyle: {},
				// 语音样式
				soundStyle: {}
			};
		},
		methods: {
			// 看大图
			showBigImage() {
				this.$emit('showBigImage',this.message);
			},
			// 播音频
			playVoice() {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src = this.message.soundElem.path;
				innerAudioContext.onPlay(() => {
					console.log('开始播放：', this.message.soundElem.path);
				});
				innerAudioContext.play()
			}

		}
	}
</script>

<style lang="scss" src="./message-item.scss">

</style>
