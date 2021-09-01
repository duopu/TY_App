<!-- 活动 -->
<template>
	<scroll-view scroll-y="true" class="main-content activity">
		<!-- banner -->
		<image class="banner-image" src="../../../static/images/other/banner.jpg" mode="widthFix"></image>
		<!-- tabs -->
		<view class="flex-center tabs-block">
			<view class="item" :class="{ first: tabsIndex === 0 }" @click="changeTabsIndex(0)">组团优惠</view>
			<view class="item" :class="{ second: tabsIndex === 1 }" @click="changeTabsIndex(1)">坚持不懈</view>
			<view class="item" :class="{ three: tabsIndex === 2 }" @click="changeTabsIndex(2)">分销大使</view>
		</view>
		<!-- tab content 列表 -->
		<block v-if="tabsIndex === 0"><active-group-lists-item class="activity-lists-item" v-for="(item, index) in ['', '', '']" :key="index"></active-group-lists-item></block>
		<!-- 坚持不懈 -->
		<block v-if="tabsIndex === 1">
			<view class="insist-lists-item" v-for="(item, index) in ['', '', '']" :key="index">
				<view class="flex-column">
					<text>活动名称xxxx有奖竞争大赛</text>
					<text class="price">奖品：一台ipad2020</text>
				</view>
				<button class="btn" v-if="index === 0" @click="openPopup('salesActivityPopup',1)">报名活动</button>
				<button class="btn disable" v-if="index !== 0">已报名</button>
			</view>
		</block>
		<!-- tab content 分销大使 -->
		<block v-if="tabsIndex === 2"><tabs-sales></tabs-sales></block>
		<!-- tab content 分销活动详情 弹窗 -->
		<sales-activity-popup ref="salesActivityPopup"></sales-activity-popup>
	</scroll-view>
</template>

<script>
import TabsSales from './tabs-sales.vue';
export default {
	name: 'TabActivity',
	components: {
		TabsSales
	},
	data() {
		return {
			tabsIndex: 2
		};
	},
	computed: {},
	methods: {
		// change tabs index
		changeTabsIndex(value) {
			if (value === this.tabsIndex) return;
			this.tabsIndex = value;
		},
		//打开弹窗
		openPopup(refName) {
			this.$refs[refName].open();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
