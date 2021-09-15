<!-- 消息 -->
<template>
	<view class="message flex-column">
		<!-- 头部 -->
		<view class="message-top flex-center-between">
			<!-- <view class="state flex-center">
				<image mode="aspectFill" src="" class="icon-state"></image>
				<text>在线</text>
			</view> -->
			<text class="title text-bold">消息</text>
			<view class="right-text">
				<image @click="()=>showPop=!showPop" class="icon-more-dot" src="" mode="aspectFill"></image>
				<view class="dot-lists" v-show="showPop">
					<view class="dot-lists-item" v-for="(item, index) in dotsData" :key="index">{{ item }}</view>
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
					<view class="desc">有1个新订单产生</view>
				</view>
				<view class="flex-column item-right">
					<view class="time">2012-20-12</view>
					<view class="number">15</view>
				</view>
			</view>
			<!-- 店铺信息 -->
			<view class="lists-item">
				<image src="" mode="aspectFill" class="item-image"></image>
				<view class="flex-column flex-1">
					<view class="name text-bold">店铺信息</view>
					<view class="desc">有新的退款审批需处理</view>
				</view>
				<view class="flex-column item-right">
					<view class="time">2012-20-12</view>
					<view class="number">15</view>
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
	import { mapState } from 'vuex'; 
	
export default {
	name: 'messageIndex',
	data() {
		return {
			showPop:false,
			dotsData: ['全部标为已读', '删除全部会话', '聊天设置', '新消息通知设置'],
			insideData:[],
			user:{},
		};
	},
	computed:{
		...mapState([
			'groupConversationMap' // 兴趣点列表
		]),
		groupList(){
			const newGroup = this.insideData.map(group=>{
				let cov = this.groupConversationMap[group.groupId]
				if(cov){
					const covInfo = this.$tool.imTool.getInfoFromConversation(cov);
					return {...group,...covInfo};
				}
				return group
			})
			return newGroup;
		},
	},
	mounted(){
		this.queryGroupList()
		this.user = getApp().globalData.user;
	},
	methods: {
		// 查询群组列表
		queryGroupList(){
			this.$http.get('/im/queryGroupList').then(res=>{
				this.insideData = res;
			})
		},
		// 跳转聊天界面
		navImMessage(item){
			console.log('跳转聊天界面',item);
			getApp().globalData.messageParam = {
				groupId:item.groupId,
				userPortrait:item.avatar,
				userIM:item.imNum,
				userName:item.nickName,
				storeName:item.storeName,
				storePortrait:item.storeAvatar
			}
			uni.navigateTo({
				url:`/pages/im-message/im-message`
			})
		},
		// 跳转页面 便利方法
		jump(type){
			if(type == 'trade'){
				uni.navigateTo({
					url:`/pages-business/message/trade/trade`
				})
			}
		},
	}
}; 
</script>
<style lang="less" src="./style.less"></style>
