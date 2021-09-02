<template>
	<view class="history">
		<custom-horizontal-tabs @change="getTabsIndex" :data="tabsData" :currentIndex="tabsIndex"></custom-horizontal-tabs>
		<!-- 随机练习 -->
		<scroll-view v-if="tabsIndex === 0" scroll-y="true" class="history-content">
			<view class="history-item" v-for="(item,index) in ['','','']" :key="index">
				<view class="text">
					随机练习
				</view>
				<view class="time">
					2021-03-21 共25道题，答对20道
				</view>
			</view>
		</scroll-view>
		<!-- 模拟考试 -->
		<scroll-view v-else scroll-y="true" class="history-content">
			<view class="history-item" v-for="(item,index) in ['','','']" :key="index">
				<view class="text">
					模拟考试
				</view>
				<view class="time">
					2021-03-21 共25道题，答对20道
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabsIndex: 0,
			tabsData: ['练习', '考试']
		};
	},
	methods:{
		// 获取当前 tabs index
		getTabsIndex(value){
			this.tabsIndex = value;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
