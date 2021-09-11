<!-- 签到 -->
<template>
	<view class="sign-in">
		<!-- 头部 -->
		<view class="sign-in-top flex-center-between">
			<image @click="goBack()" class="icon" src="../../../static/images/icons/icon-back-white.svg" mode="aspectFill"></image>
			<view class="number flex-center-center">
				<image class="icon" src="../../../static/images/sign-in-time.png" mode="aspectFill"></image>
				<text class="text-bold">{{signInfo.totalGold}}</text>
			</view>
		</view>
		<!-- 内容 -->
		<scroll-view scroll-y="true" class="sign-in-content">
			<!-- 签到按钮 -->
			<view class="sign-in-button">
				<!-- 未签到 -->
				<image v-if="!isSign" class="image-btn" src="../../../static/images/sign-in.png" @click="signClick" mode="aspectFill"></image>
				<!-- 已签到 -->
				<image v-else class="image-btn" src="../../../static/images/sign-in-finish.png" mode="aspectFill"></image>
			</view>
			<!-- 连续签到 -->
			<view class="box series">
				<view class="title text-bold">
					<text>连续签到</text>
					<text class="day">{{signInfo.signInNum}}天</text>
				</view>
				<view class="font-24 color-9">连续7天签到有惊喜</view>
				<!-- 时间 -->
				<view class="series-list flex">
					<view class="item normal flex-center-center" v-for="item in signInfo.signInList">
						<text class="number" v-if="item.flag">{{item.dailyDate.substr(8,2)}}</text>
						<image class="image"v-else src="../../../static/images/sign-in-time.png" mode="aspectFill">
					</view>
					<!-- 
					<view class="item normal flex-center-center"><text class="number">29</text></view>
					<view class="item normal flex-center-center"><text class="number ">30</text></view>
					<view class="item normal flex-center-center"><text class="number ">1</text></view>
					<view class="item normal flex-center-center"><image class="image" src="../../../static/images/sign-in-time.png" mode="aspectFill"></image></view>
					<view class="item normal flex-center-center"><image class="image" src="../../../static/images/sign-in-time.png" mode="aspectFill"></image></view>
					<view class="item normal flex-center-center"><image class="image" src="../../../static/images/sign-in-time.png" mode="aspectFill"></image></view>
					<image class="image item" src="../../../static/images/sign-in-gift.png" mode="aspectFill"></image> -->
				</view>
			</view>
			<!-- 每日任务 -->
			<view class="box task">
				<view class="title text-bold">每日任务</view>
				<!-- 学习时间 -->
				<view class="flex-center-center item" v-for="(item, index) in signInfo.dailyTaskList" :key="index">
					<view class="flex-column flex-1">
						<view class="flex-center">
							<text class="text-bold">{{item.content}}</text>
							<view class="flex-center tag">
								<image class="image-tag" src="../../../static/images/sign-in-time.png" mode="aspectFill"></image>
								<text class="color-red font-24">+{{item.gold}}</text>
							</view>
						</view>
						<text class="font-24 color-6" v-if="item.totalMinute">今天已完成：{{item.minute || 0}}/{{item.totalMinute}}</text>
					</view>
					<!-- yellow -->
					<button class="btn text-bold " :class="{ yellow: item.flag === 1 }">{{item.flag == 0 ? '未完成' : '已完成'}}</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
export default {
	data() {
		return {
			signInfo:{
				dailyTaskList:[]
			}
		};
	},
	onLoad() {
		this.queryLearnStatistic()
	},
	computed:{
		isSign(){
			if(this.signInfo.signInList){
				const today = dayjs().format('YYYY-MM-DD')
				const todaySign = this.signInfo.signInList.find(s=>s.dailyDate == today)
				return todaySign ? todaySign.flag : 0
			}
		}
	},
	methods: {
		// 获取签到信息
		queryLearnStatistic(){
			this.$http.get('/dailyTask/queryList',{},true).then(res=>{
				this.signInfo = res;
			})
		},
		// 签到操作
		signClick(){
			const today = dayjs().format('YYYY-MM-DD')
			const todaySign = this.signInfo.signInList.find(s=>s.dailyDate == today)
			this.$http.post('/dailyTask/create',{type:1,gold:todaySign.gold},true).then(res=>{
				this.queryLearnStatistic()
			})
		},
		
		// 返回上一级
		goBack() {
			uni.navigateBack({});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
