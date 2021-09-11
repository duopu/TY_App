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
			<view class="item flex-center-center" @click="changeTab(index)" v-for="(item, index) in tabsData" :key="index" :class="{ on: tabIndex === index }">
				<text class="text">{{ item.text }}</text>
				<text class="message-tag">{{ item.number }}</text>
			</view>
		</view>
		<!-- 搜索 -->
		<view class="message-search flex-center-between" v-if="tabIndex === 0 && !showGoods">
			<image class="icon-search" src="../../../static/images/icons/icon-search3.svg" mode="aspectFill"></image>
			<input class="flex-1 input" placeholder-class="input-placeholder" type="text" placeholder="搜索商家名称/聊天记录" />
		</view>
		<!-- 站内消息 -->
		<tab-inside v-if="tabIndex === 0 && !showGoods"></tab-inside>
		<!-- 商家消息 -->
		<tab-goods v-else-if="tabIndex === 0 && showGoods"></tab-goods>
		<!-- 系统消息 -->
		<tab-system v-else-if="tabIndex === 1"></tab-system>
	</view>
</template>

<script>
import tabInside from './tab-inside.vue';
import tabSystem from './tab-system.vue';
import tabGoods from './tab-goods.vue';
export default {
	components: {
		tabInside,
		tabSystem,
		tabGoods
	},
	data() {
		return {
			tabIndex: 0,
			showGoods:false,
			tabsData: [
				{
					number: 3,
					text: '站内消息'
				},
				{
					number: 3,
					text: '系统通知'
				}
			]
		};
	},
	methods: {
		//  返回上一级
		goBack() {
			uni.navigateBack({});
		},
		// 切换菜单
		changeTab(index) {
			if (this.tabIndex === index) return;
			this.tabIndex = index;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
