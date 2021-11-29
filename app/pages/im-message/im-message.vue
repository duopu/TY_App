<template>
	<view class="im-message-page">
		<view v-show="isRecording" class="record-modal">
			<view class="wrapper">
				<image class="icon-voice" src="../../static/images/icons/icon-yuyin.svg" mode="widthFix"></image>
				<view class="modal-loading">
					<text class="line one"></text>
					<text class="line two"></text>
					<text class="line three"></text>
					<text class="line four"></text>
				</view>
			</view>
			<view class="modal-title">
				{{title}}
			</view>
		</view>

		<scroll-view class="list-view" :scroll-top="messageScrollTop" :scroll-y="true">
			<message-item v-for="msg in messageList" :message="msg" :userInfo="userInfo" @showBigImage="showBigImage">
			</message-item>
		</scroll-view>

		<view class="bottom" :style="{paddingBottom:bottomPaddingBottom}">
			<view class="input-bar">
				<view class="text-input" v-if="!isRecord">
					<input class="input" type="text" v-model="messageText" confirm-type="send" cursor-spacing="10"
						cursor="10" :focus="textInputFocus" @focus="changeTextInputFocus(true)"
						@blur="changeTextInputFocus(false)" @confirm='sendTextMessage' />
				</view>
				<view class="record" id='record' v-else @longpress="handleLongPress" @touchmove="handleTouchMove"
					@touchend="handleTouchEnd" @touchcancel="touchcancel">
					{{isRecording ? '抬起 停止' : '按住 说话'}}
				</view>
				<image class="img-btn" @click="voiceBtnClick" src="../../static/images/im/voice_btn.png"
					mode="aspectFit" />
				<image class="img-btn" @click="handleEmoji" src="../../static/images/im/emoji_btn.png"
					mode="aspectFit" />
				<image class="img-btn" @click="imgBtnClick" src="../../static/images/im/image_btn.png"
					mode="aspectFit" />
				<image class="img-btn" v-if="user.roleStatus !== 'user'" @click="quickPhrase" src="../../static/images/im/yy-left.png"
					mode="aspectFit" />
			</view>

			<scroll-view scroll-y="true" v-if="isEmojiOpen">
				<view class="bottom-emoji">
					<view class="emoji-view" v-for="(item,index) in emoji.emojiList" @click="emojiClick(item)">
						<text class="emoji-text">{{item}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import emoji from '../../utils/emoji.js';
	const audioContext = uni.createInnerAudioContext()
	const recorderManager = uni.getRecorderManager();
	import dayjs from 'dayjs';

	export default {
		data() {
			return {
				// 群组id
				groupId: '',
				// 用户信息集合，包含了
				userInfo: {},
				// 要发送的文字消息
				messageText: '',
				// 输入框是否获取焦点
				textInputFocus: false,
				// 是否显示表情
				isEmojiOpen: false,
				// 表情数据源
				emoji: emoji,
				// 是否是语言模式
				isRecord: false,
				// 录音中
				isRecording: false,
				title: '',
				// 消息列表 
				messageList: [],
				messageScrollTop: 0,
				bottomPaddingBottom: '0rpx',
				user:{},
			};
		},
		watch: {
			messageList() {
				this.$nextTick(() => {
					this.messageScrollTop = this.messageList.length * 200
				})
			}
		},
		computed: {},
		onLoad() {
			const messageParam = getApp().globalData.messageParam
			this.groupId = messageParam.groupId;
			this.userInfo = messageParam

			// 监听群消息
			uni.$on('AdvancedMsgListen', this.getNewMessage)
		},
		onUnload() {
			uni.$off('AdvancedMsgListen', this.getNewMessage)
			uni.$off('quickPhrase')
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.navTitle
			})
			// 用户信息
			this.user = getApp().globalData.user;
			// 获取群历史消息
			this.getGroupHistoryMessageList();

			recorderManager.onStart(() => {
				this.startUnix = dayjs().unix();
			})
			recorderManager.onStop((res) => {
				const duration = dayjs().unix() - this.startUnix;
				this.startUnix = 0;
				console.log('recorder 结束', res, duration)

				if (this.canSend) {
					if (duration < 1) {
						this.$tool.showToast('录音时间太短')
					} else {
						// 发送语音消息
						const file = res.tempFilePath;
						// 相对路径转绝对路径
						const path = plus.io.convertLocalFileSystemURL(file)
						this.$tool.imTool.sendSoundMessage(path, duration, this.groupId).then(msg => {
							this.messageList.push(msg);
						})
					}
				}
			})

			this.bottomPaddingBottom = this.$tool.systemInfo.platform == 'ios' ? '0rpx' : '30rpx'
			
			// 监听快捷短语选择
			uni.$on('quickPhrase',(msg)=>{
				this.messageText = msg
			})
		},
		computed: {
			navTitle() {
				const user = getApp().globalData.user;
				return user.roleStatus == 'user' ? this.userInfo.storeName : this.userInfo.userName
			}
		},
		methods: {
			// 加载历史消息
			getGroupHistoryMessageList() {
				const oldMessage = this.messageList[0] || {}
				this.$tool.imTool.getGroupHistoryMessageList(this.groupId, oldMessage.msgId).then(historys => {
					console.log('加载历史消息',historys);
					this.messageList = historys.reverse()
				})
			},
			// 收到新消息
			getNewMessage(message) {
				if (message.type !== "onRecvNewMessage") return;
				let msg = message.msg
				if (msg.groupId == this.groupId) {
					this.messageList.push(msg)
				}
			},
			// 发送文本消息
			sendTextMessage() {
				this.$tool.imTool.sendGroupTextMessage(this.messageText, this.groupId).then(msg => {
					this.messageList.push(msg);
					this.messageText = ''
				})
			},
			// 语音按钮点击事件
			voiceBtnClick() {
				this.isRecord = !this.isRecord
				if (this.isRecord) {
					this.isEmojiOpen = false
					this.textInputFocus = false
				} else {
					this.isEmojiOpen = false
					this.textInputFocus = true
				}
			},
			// 修改文本框焦点
			changeTextInputFocus(focus) {
				this.textInputFocus = focus
			},
			// 表情按钮
			handleEmoji() {
				if (this.textInputFocus) {
					this.textInputFocus = false
					this.isEmojiOpen = true
				} else {
					if (this.isEmojiOpen) {
						this.isEmojiOpen = false
						this.textInputFocus = true
					} else {
						this.isEmojiOpen = true
					}
				}
			},
			// 表情选中
			emojiClick(item) {
				this.messageText = this.messageText + item
			},
			// 长按录音，监听在页面最外层div，如果是放在button的话，手指上划离开button后获取距离变化有bug
			handleLongPress(e) {
				this.startPoint = e.touches[0]
				if (e.target.id === 'record') {
					console.log('长按录音');
					this.title = '正在录音'
					this.isRecording = true
					recorderManager.start()
					this.canSend = true
				}
			},
			// 录音时的手势上划移动距离对应文案变化
			handleTouchMove(e) {
				console.log(e);
				if (this.isRecording) {
					if (this.startPoint.clientY - e.touches[e.touches.length - 1].clientY > 100) {
						this.title = '松开手指，取消发送'
						this.canSend = false
					} else if (this.startPoint.clientY - e.touches[e.touches.length - 1].clientY > 20) {
						this.title = '上划可取消'
						this.canSend = true
					} else {
						this.title = '正在录音'
						this.canSend = true
					}
				}
			},
			// 手指离开页面滑动
			handleTouchEnd() {
				console.log('handleTouchEnd 结束');
				this.isRecording = false
				recorderManager.stop()
			},
			// 点击事件取消
			touchcancel() {
				console.log('touchcancel 结束');
				this.isRecording = false
				recorderManager.stop()
			},
			// 选择图片事件
			imgBtnClick() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						for (let file of res.tempFilePaths) {
							this.$tool.imTool.sendImageMessage(file.replace('file://', ''), this.groupId).then(
								msg => {
									this.messageList.push(msg);
								})
						}
					}
				});
			},
			// 快捷短语事件
			quickPhrase(){
				uni.navigateTo({
					url:'/pages/phrase-list/phrase-list'
				})
			},
			// 看大图
			showBigImage(clickMessage) {
				console.log(this.messageList);
				let imgIndex = 0;
				let imgPathList = this.messageList.filter(msg => msg.elemType == 3).map((msg, index) => {
					if (msg.msgId == clickMessage.msgId) imgIndex = index;
					return msg.imageElem.path
				})
				uni.previewImage({
					urls: imgPathList,
					indicator: 'number',
					current: imgIndex,
					longPressActions: {
						itemList: ['保存图片'],
						success: (data) => {
							const selectImgPath = imgPathList[data.index];
							this.saveImageToPhotosAlbum(selectImgPath)
							console.log(selectImgPath);
							console.log('选中了' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: (err) => {
							console.log(err.errMsg);
						}
					}
				});
			},
			saveImageToPhotosAlbum(path) {
				uni.saveImageToPhotosAlbum({
					filePath: path,
					success: () => {
						console.log('save success');
						this.$tool.showSuccess('保存成功')
					},
					fail: () => {
						this.$tool.showToast('保存失败')
					}
				});
			},
		}
	}
</script>

<style lang="scss" src="./im-message.scss">

</style>
