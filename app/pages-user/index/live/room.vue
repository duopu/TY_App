<!-- 直播间 -->
<template>
	<view class="page-wrapper live-room">
		<view class="live-room-top">
			<!-- 直播间信息 -->
			<view class="flex-center-between row">
				<view class="flex-center">
					<image class="avatar-image" :src="liveInfo.storeAvatar" mode="aspectFill"></image>
					<text>{{liveInfo.storeName}}</text>
					<button class="btn-border yellow" @click="onCollect">{{liveInfo.storeCollectionCheck == 1 ? '未收藏' : '已收藏'}}</button>
					<image class="icon-user" src="../../../static/images/icons/icon-user.svg" mode="aspectFill"></image>
					<text>{{userCount}}</text>
				</view>
				<image src="../../../static/images/icons/icon-close.svg" mode="aspectFill" class="icon-close"
					@click="closePage"></image>
			</view>
			<!-- 视频 直播 兼容-->
			<video class="video-wrapper" :src="livePullUrl" :autoplay="true" controls></video>
			<!-- 菜单 -->
			<custom-horizontal-tabs :currentIndex="tabsIndex" :data="tabsData" @change="getCurrentIndex">
			</custom-horizontal-tabs>
		</view>
		<!-- 评论 -->
		<scroll-view :scroll-top="messageScrollTop" v-show="tabsIndex === 0" scroll-y="true" class="live-room-content">
			<view class="chat-row" v-for="msg in messageList">
				<text class="nickname">{{msg.userName}}:</text>
				<view>{{msg.textElem.msg}}</view>
			</view>
		</scroll-view>
		<!-- 简介 -->
		<scroll-view v-show="tabsIndex === 1" scroll-y="true" class="live-room-content">
			<view class="chat-row">
				<text class="label">章节名称:</text>
				<view>{{liveInfo.courseClassName}}</view>
			</view>
			<view class="chat-row">
				<text class="label">直播名称:</text>
				<view>{{liveInfo.liveName}}</view>
			</view>

			<view class="chat-row">
				<text class="label">直播说明:</text>
				<view>{{liveInfo.liveIntro}}</view>
			</view>
		</scroll-view>
		<!-- 底部 输入框 -->
		<view class="live-room-bottom flex-center">
			<input class="input" placeholder-class="input-placeholder" type="text" v-model="messageText"
				placeholder="快来参与互动吧" confirm-type="send" @confirm="sendMessage"/>
			<!-- <image class="icon" src="../../../static/images/icons/icon-talk.svg" mode="aspectFill"></image> -->
			<text @click="sendMessage">发送</text>
			<image class="icon" src="../../../static/images/icons/icon-share.svg" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				// 直播id
				liveId: '',
				// 直播详情
				liveInfo:{},
				tabsIndex: 0,
				// 当前人数
				userCount:0,
				tabsData: ['评论', '简介'],
				// 拉流地址
				livePullUrl: '',
				// 群id
				groupId: "",
				// 消息为
				messageText: '',
				// 消息列表
				messageList: [],
				messageScrollTop: 0,

			};
		},
		onLoad(option) {
			this.liveId = option.liveId;
			// 监听群消息
			uni.$on('AdvancedMsgListen', this.getNewMessage)
		},
		onReady() {
			this.queryLiveDetail();
		},
		onUnload() {
			uni.$off('AdvancedMsgListen', this.getNewMessage)
		},
		computed: {
			
		},
		watch: {
			messageList() {
				this.$nextTick(() => {
					this.messageScrollTop = this.messageList.length * 200
				})
			},
			groupId() {
				// 加入群聊
				this.$tool.imTool.joinGroup(this.groupId).then(res=>{
					// 获取群历史
					this.getGroupHistoryMessageList();
					// 获取群在线成员数量
					this.getLiveRoomUserCount();
				})
			}
		},
		methods: {
			// 切换 tab
			getCurrentIndex(value) {
				this.tabsIndex = value;
			},
			// 关闭页面
			closePage() {
				uni.navigateBack({})
			},
			// 查询直播详情
			queryLiveDetail() {
				this.$http.get('/live/queryDetail', {
					liveId: this.liveId
				}, true).then(res => {
					this.liveInfo = res;
					this.groupId = res.imGroupId;
					this.livePullUrl = res.liveState == 2 ? res.liveVideoUrl : res.livePullUrl;
				})
			},
			// 获取直播间人数
			getLiveRoomUserCount(){
				this.$tool.imTool.getGroupOnlineMemberCount(this.groupId).then(res=>{
					this.userCount = res.count
				})
			},
			// 店铺收藏 
			onCollect(){
				this.$http.post('/store/collect',{storeId:this.liveInfo.storeId},true).then(res=>{
					this.queryLiveDetail();
				})
			},
			// 加载历史消息
			getGroupHistoryMessageList() {
				const oldMessage = this.messageList[0] || {}
				this.$tool.imTool.getGroupHistoryMessageList(this.groupId, oldMessage.msgId).then(historys => {
					this.messageList = historys.filter(msg => msg.elemType == 1).reverse()
				})
			},
			// 收到新消息
			getNewMessage(message) {
				this.getLiveRoomUserCount();
				if (message.type !== "onRecvNewMessage") return;
				let msg = message.msg
				if (msg.elemType == 1 && msg.groupId == this.groupId) {
					this.messageList.push(msg)
				}
			},
			// 发送消息
			sendMessage() {
				this.$tool.imTool.sendGroupTextMessage(this.messageText, this.groupId).then(msg => {
					this.messageList.push(msg);
					this.messageText = ''
				})
			}

		}

	};
</script>

<style lang="less" src="./style.less"></style>
