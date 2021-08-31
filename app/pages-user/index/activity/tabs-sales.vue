<!-- 分销大使 -->
<template>
	<view>
		<!-- 平台分销 -->
		<view class="sales-list platform">
			<view class="item">
				<view class="flex-center-between row">
					<text class="text">邀请好友注册</text>
					<button class="btn">查看详情</button>
				</view>
				<view class="flex-center-between row">
					<text class="text">邀请好友参加组团</text>
					<button class="btn">查看详情</button>
				</view>
				<view class="flex-center-between row">
					<text class="text">邀请好友参加打卡</text>
					<button class="btn">查看详情</button>
				</view>
			</view>
		</view>
		<!-- 商家分销 -->
		<view class="sales-list marchant">
			<custom-horizontal-tabs :currentIndex="tabsIndex" :data="tabsData" @change="changeTabsIndex"></custom-horizontal-tabs>
			<!-- 1、商家分销 -->
			<view v-if="tabsIndex === 0">
				<block v-if="false"><sales-goods-lists-item v-for="(item, index) in ['', '', '', '']" :key="index"></sales-goods-lists-item></block>
				<block v-if="true">
					<view class="flex-center-center no-lists">
						您还没有商品分销任务，
						<view class="color-blue" @click="openPopup('salesPopup', 0)">点击申请</view>
					</view>
				</block>
			</view>
			<!-- 2、 店铺分销 -->
			<view v-if="tabsIndex === 1">
				<block v-if="false">
					<view class="flex-center-between marchant-item" v-for="(item, index) in ['', '', '', '']" :key="index">
						<view class="flex-center">
							<image class="avatar-image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
							<text>商家名</text>
						</view>
						<view class="text">
							分销折扣：
							<text class="discount">9折</text>
						</view>
						<button class="btn">复制链接</button>
					</view>
				</block>
				<block v-if="true">
					<view class="flex-center-center no-lists">
						您还没有店铺分销任务，
						<view class="color-blue" @click="openPopup('salesPopup', 1)">点击申请</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 分销申请说明弹窗 -->
		<sales-apply-popup :state="salesPopupState" ref="salesPopup"></sales-apply-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabsData: ['商品分销', '店铺分销'],
			tabsIndex: 0,
			salesPopupState: 0
		};
	},
	methods: {
		// change tabs index
		changeTabsIndex(value) {
			if (value === this.tabsIndex) return;
			this.tabsIndex = value;
		},
		/**
		 * 打开弹窗
		 * @param {Object} refName 弹窗ref的名称
		 * @param {Object} state 0-商品 1-分销
		 */
		openPopup(refName, state) {
			this.salesPopupState = state;
			this.$refs[refName].open();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
