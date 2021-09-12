<!-- 消息界面 -->
<template>
	<view class="message">
		<!-- 头部 -->
		<view class="message-top flex-center-between">
			<image class="icon-back" @click="goBack" src="../../../static/images/login/back.png" mode="aspectFill"></image>
			<text class="text-bold title">消息</text>
			<text class="color-6">清除未读</text>
		</view>
		<!-- 切换 -->
		<view class="message-tabs flex-center-between">
			<view class="item flex-center-center" v-for="(item, index) in tabsData" @click="()=>tabIndex=index"  :key="index" :class="{ on: tabIndex === index }">
				<text class="text">{{ item.text }}</text>
				<text class="message-tag" v-if="item.number > 0">{{ item.number }}</text>
			</view>
		</view>
		<!-- 搜索 -->
		<view class="message-search flex-center-between" v-if="tabIndex === 0">
			<image class="icon-search" src="../../../static/images/icons/icon-search3.svg" mode="aspectFill"></image>
			<input class="flex-1 input" placeholder-class="input-placeholder" type="text" placeholder="搜索商家名称/聊天记录" />
		</view>
		<!-- IM消息 -->
		<scroll-view v-show="tabIndex === 0" scroll-y="true" class="message-scroll-content" >
			<view class="inside-item flex-center-between" v-for="(item,index) in groupList" :key="item.groupId" @click="navImMessage(item)">
				<image :src="item.storeAvatar" mode="aspectFill" class="image"></image>
				<view class="flex-column-between flex-1">
					<view class="name text-bold">{{item.storeName}}</view>
					<text class="color-9 font-24 desc">{{item.message}}</text>
				</view>
				<text class="color-9 font-24 time">{{item.time}}</text>
				<view class="message-tag" v-if="item.unreadCount > 0">{{item.unreadCount}}</view>
			</view>
		</scroll-view>
		<scroll-view v-show="tabIndex === 1" scroll-y="true" class="message-scroll-content">
			<view class="system-item flex-center-between"  v-for="(item,index) in systemMsg" :key="item.announcementId" @click="navAnnouncementDetail(item)">
				<image class="image" src="../../../static/images/gantanhao.png" mode="aspectFill"></image>
				<view class="name text-bold flex-1">{{item.title}}</view>
				<view class="font-24 color-9 ">{{item.createTime}}</view>
				<view class="new-circle" v-if="item.readState == 0"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>

import { mapState } from 'vuex';

export default {
	components: {
	},
	data() {
		return {
			tabIndex: 0,
			insideData:[],
			systemMsg:[],
			announcementUnReadTotalCount:0
		}; 
	},
	computed: {
		...mapState([
			'groupConversationMap' // 兴趣点列表
		]),
		groupList(){
			const newGroup = this.insideData.map(group=>{
				let cov = this.groupConversationMap[group.groupId]
				console.log(group.groupId,cov);
				if(cov){
					const covInfo = this.$tool.imTool.getInfoFromConversation(cov);
					return {...group,...covInfo};
				}
				return group
			})
			return newGroup;
		},
		tabsData(){
			let messageUnReadTotalCount = 0;
			this.groupList.forEach(group=>{
				messageUnReadTotalCount = messageUnReadTotalCount + (group.unreadCount || 0)
			})
			return [
				{
					number: messageUnReadTotalCount,
					text: '站内消息'
				},
				{
					number: this.announcementUnReadTotalCount,
					text: '系统通知'
				}
			]
		}
	},
	onLoad() {
		
	},
	onShow() {
		this.queryGroupList();
		this.queryAnnouncementList();
	},
	methods: {
		// 查询群组列表
		queryGroupList(){
			this.$http.get('/im/queryGroupList').then(res=>{
				this.insideData = res;
			})
			
			setTimeout(()=>{
				console.log('efv',this.groupList);
			},2000)
		},
		// 跳转聊天界面
		navImMessage(item){
			uni.navigateTo({
				url:`/pages/im-message/im-message?groupId=${item.groupId}&userPortrait=${item.avatar}&userIM=${item.imNum}&storeName=${item.storeName}&storePortrait=${item.storeAvatar}`
			})
		},
		// 查询公告列表
		queryAnnouncementList(){
			this.$http.get('/announcement/queryListByLogin').then(res=>{
				this.systemMsg = res.announcementVOList || []
				this.announcementUnReadTotalCount = res.unReadCount;
			})
		},
		// 跳转公告详情
		navAnnouncementDetail(item){
			const id = item.announcementId;
			uni.navigateTo({
				url:`/pages-user/index/message/sys-msg-detail?id=${id}`
			})
		},
		//  返回上一级
		goBack() {
			uni.navigateBack({});
		},
		
	}
};
</script>

<style lang="less" src="./style.less"></style>
