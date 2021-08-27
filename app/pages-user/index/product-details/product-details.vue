<template>
	<view class="product">
		<scroll-view scroll-y="true" class="product-content">
			<!-- banner -->
			<view class="banner"><image class="banner-image" src="../../../static/images/other/good_banner.png" mode="aspectFill"></image></view>
			<!-- 具体信息 -->
			<view class="box">
				<view class="flex-center-between">
					<view class="name text-bold">2021教师资格证-全程VIP班</view>
					<view class="text color-9">1500人学习</view>
				</view>
				<view class="flex-center-between m-top-20">
					<view class="flex-center">
						<view class="price">
							<text class="unit">¥</text>
							500
						</view>
						<text class="line">-</text>
						<view class="price">
							<text class="unit">¥</text>
							500
						</view>
					</view>
					<!-- 分销申请审核中 -->
					<view v-if="false" class="state">分销申请审核中</view>
					<view v-if="true" class="state color-2 flex-center">
						<image class="icon-share" src="" mode="aspectFill"></image>
						申请分销
					</view>
				</view>
			</view>
			<!-- 选择 -->
			<view class="box">
				<!-- 选择 -->
				<view class="flex row">
					<text class="label color-9">选择</text>
					<view class="flex-1">
						<view class="flex-center-between">
							<text>属性分类</text>
							<image class="icon-more" src="../../../static/images/icons/icon-dots.svg" mode="aspectFill"></image>
						</view>
						<view class="checkbox-lists">
							<view class="item">型号一</view>
							<view class="item">型号二</view>
							<view class="item">型号二</view>
							<view class="item">共5种型号可选</view>
						</view>
					</view>
				</view>
				<!-- 发货 -->
				<view class="flex row">
					<text class="label color-9">发货</text>
					<view class="flex-1">
						<view class="flex-center-between">
							<text>广东广州 快递:免快递费</text>
							<image class="icon-more" src="../../../static/images/icons/icon-dots.svg" mode="aspectFill"></image>
						</view>
						<view class="color-9 m-top-20">配送至：江苏省南京市江宁区雨花街道</view>
					</view>
				</view>
				<!-- 保障 -->
				<view class="flex row">
					<text class="label color-9">保障</text>
					<view class="flex-1 flex-center-between">
						<view class="ensure-lists">
							<view class="item blue">企业认证</view>
							<view class="item yellow">平台认证</view>
							<view class="item red">保证金</view>
						</view>
						<image class="icon-more" src="../../../static/images/icons/icon-dots.svg" mode="aspectFill"></image>
					</view>
				</view>
				<!-- 参数 -->
				<view class="flex">
					<text class="label color-9">参数</text>
					<view class="params-lists flex-1">
						<view class="item">课时</view>
						<view class="item">课程方式</view>
						<view class="item">题库数量</view>
						<view class="item">有效时长</view>
					</view>
					<image class="icon-more" src="../../../static/images/icons/icon-dots.svg" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 横向菜单 -->
			<custom-horizontal-tabs @change="getTabsIndex" :currentIndex="tabsIndex" :data="tabsData"></custom-horizontal-tabs>
			<!--  tab 介绍 -->
			<tabs-brief v-if="tabsIndex === 0"></tabs-brief>
			<!-- tab 商品 -->
			<tabs-product v-if="tabsIndex === 1"></tabs-product>
			<!-- tab 目录 -->
			<tabs-catalogue v-if="tabsIndex === 2"></tabs-catalogue>
			<!-- tab 题库 -->
			<tabs-bank v-if="tabsIndex === 3"></tabs-bank>
			<!-- tab 考试 -->
			<tabs-bank v-if="tabsIndex === 4"></tabs-bank>
			<!-- tab 推荐-->
			<tabs-recommend v-if="tabsIndex === 5"></tabs-recommend>
		</scroll-view>
		<!-- 底部 -->
		<view class="product-bottom flex-center-between">
			<view class="flex-column">
				<image class="icons" src="" mode="aspectFill"></image>
				<text>店铺</text>
			</view>
			<view class="flex-column">
				<image class="icons" src="" mode="aspectFill"></image>
				<text>客服</text>
			</view>
			<view class="flex-column">
				<image class="icons" src="" mode="aspectFill"></image>
				<text>收藏</text>
			</view>
			<button class="btn btn-light">加入购物车</button>
			<button class="btn btn-block">立即购买</button>
		</view>
	</view>
</template>

<script>
import TabsBrief from './tabs-brief.vue';
import TabsProduct from './tabs-product.vue';
import TabsBank from './tabs-bank.vue';
import TabsExam from './tabs-exam.vue';
import TabsCatalogue from './tabs-catalogue.vue';
import TabsRecommend from './tabs-recommend.vue';
export default {
	components: {
		TabsBrief,
		TabsProduct,
		TabsBank,
		TabsExam,
		TabsRecommend,
		TabsCatalogue
	},
	data() {
		return {
			tabsData: ['介绍', '商品', '目录', '题库', '考试', '推荐'],
			tabsIndex: 2
		};
	},
	methods: {
		getTabsIndex(index) {
			this.tabsIndex = index;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
