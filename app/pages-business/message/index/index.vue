<!-- 消息 -->
<template>
	<view class="message flex-column">
		<!-- 头部 -->
		<view class="message-top flex-center-between">
			<!--			<view class="state flex-center">-->
			<!--				<image mode="aspectFill" src="../../../static/images/my-state-zx.png" class="icon-state"></image>-->
			<!--				<text>在线</text>-->
			<!--			</view>-->
			<text class="title text-bold">消息</text>
			<view class="right-text">
				<image @click="()=>showPop=!showPop" class="icon-more-dot"
					src="../../../static/images/icons/icon-dots.svg" mode="aspectFill"></image>
				<view class="dot-lists" v-show="showPop">
					<view class="dot-lists-item" @click="jumpSetting(index)" v-for="(item, index) in dotsData"
						:key="index">{{ item }}</view>
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<scroll-view scroll-y="true" class="message-content">
			<view class="account">
				当前登录账号：
				<text class="color-yellow text-bold">{{user.userName}}</text>
			</view>
			<!-- 交易信息 -->
			<view class="lists-item" @click="jump('trade')">
				<image src="" mode="aspectFill" class="item-image"></image>
				<view class="flex-column flex-1">
					<view class="name text-bold">交易信息</view>
					<view class="desc">有{{newOrderMessageCount}}个新订单产生</view>
				</view>
				<view class="flex-column item-right">
					<view class="time">{{dayTimeStr}}</view>
					<view class="number">{{newOrderMessageCount}}</view>
				</view>
			</view>
			<!-- 店铺信息 -->
			<view class="lists-item" @click="jump('store')">
				<image src="" mode="aspectFill" class="item-image"></image>
				<view class="flex-column flex-1">
					<view class="name text-bold">店铺信息</view>
					<view class="desc">有新的退款审批需处理</view>
				</view>
				<view class="flex-column item-right">
					<view class="time">{{dayTimeStr}}</view>
					<view class="number">{{refundMessageCount}}</view>
				</view>
			</view>
			<!-- 用户消息列表 -->
			<view class="lists-item" v-for="(item,index) in groupList" :key="index" @click="navImMessage(item)">
				<image :src="item.avatar" mode="aspectFill" class="item-image"></image>
				<view class="flex-column flex-1">
					<view class="name text-bold">{{item.nickName || '-'}}</view>
					<view class="desc">{{item.message}}</view>
				</view>
				<view class="flex-column item-right">
					<view class="time text-bold">{{item.time}}</view>
					<view class="number" v-if="item.unreadCount">{{item.unreadCount}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import dayjs from 'dayjs';

	export default {
		name: 'messageIndex',
		components: {},
		data() {
			return {
				showPop: false,
				dotsData: ['全部标为已读', '删除全部会话'],
				insideData: [],
				user: {},
				newOrderMessageCount: 0,
				refundMessageCount: 0,
				dayTimeStr: dayjs().format('YYYY-MM-DD'),
			};
		},
		computed: {
			...mapState([
				'groupConversationMap' // 兴趣点列表
			]),
			groupList() {
				const newGroup = this.insideData.map(group => {
					let cov = this.groupConversationMap[group.groupId]
					if (cov) {
						const covInfo = this.$tool.imTool.getInfoFromConversation(cov);
						console.log('fffffff',covInfo);
						return {
							...group,
							...covInfo
						};
					}
					return group
				})
				return newGroup;
			},
		},
		mounted() {
			this.queryGroupList()
			this.user = getApp().globalData.user;
			this.queryStatistic();
		},
		methods: {
			// 查询店铺信息
			queryStatistic() {
				this.$http.get('/message/queryStatistic', {}).then(res => {
					this.newOrderMessageCount = res.newOrderMessageCount;
					this.refundMessageCount = res.refundMessageCount;
				})
			},
			// 查询群组列表
			queryGroupList() {
				this.$http.get('/im/queryGroupList').then(res => {
					this.insideData = res;
				})
			},
			// 跳转聊天界面
			navImMessage(item) {
				console.log('跳转聊天界面', item);
				getApp().globalData.messageParam = {
					groupId: item.groupId,
					userPortrait: item.avatar,
					userIM: item.imNum,
					userName: item.nickName,
					storeName: item.storeName,
					storePortrait: item.storeAvatar
				}
				uni.navigateTo({
					url: `/pages/im-message/im-message`
				})
			},
			// 跳转页面 便利方法
			jump(type) {
				if (type == 'trade') {
					uni.navigateTo({
						url: `/pages-business/message/trade/trade`
					})
				} else {
					uni.navigateTo({
						url: `/pages-business/message/store/store`
					})
				}
			},
			// 右上角更多操作
			jumpSetting(index) {
				this.showPop = false;
				switch (index) {
					case 0:
						// 设置全部已读
						this.groupList.map((item,index) => {
							this.$tool.imTool.markGroupMessageAsRead(item.groupId).then(res=>{
								if(index == this.groupList.length - 1){
									this.$tool.showSuccess('操作成功')
								}
							})
						});
						break;
					case 1:
						this.groupList.map((item,index) => {
							let cov = this.groupConversationMap[item.groupId]
							let conversationId = cov.conversationId;
							this.$tool.imTool.deleteConversation(conversationId).then(res=>{
								if(index == this.groupList.length - 1){
									this.$tool.showSuccess('操作成功')
								}
							})
						});
						break;
				}
			}
		}
	};
</script>
<style lang="less" src="./style.less"></style>
