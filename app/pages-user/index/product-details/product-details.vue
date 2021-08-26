<template>
	<view class="product">
		<scroll-view scroll-y="true" class="product-content">
			<view class="banner"><image class="banner-image" src="../../../static/images/other/banner.jpg" mode="aspectFill"></image></view>
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
						<text class="line"> - </text>
						<view class="price">
							<text class="unit">¥</text>
							500
						</view>
					</view>
					<!-- 分销申请审核中 -->
					<view v-if="true" class="state">分销申请审核中</view>
					<view v-if="false" class="state">
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
							<image class="icon-more" src="" mode="aspectFill"></image>
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
							<text>广东广州    快递:免快递费</text>
							<image class="icon-more" src="" mode="aspectFill"></image>
						</view>
						<view class="color-9 m-top-20">配送至：江苏省南京市江宁区雨花街道</view>
					</view>
				</view>
				<!-- 保障 -->
				<view class="flex row">
					<text class="label color-9">保障</text>
					<view class="flex-1 ensure-lists">
						<view class="item blue">企业认证</view>
						<view class="item yellow">平台认证</view>
						<view class="item red">保证金</view>
					</view>
					<image class="icon-more" src="" mode="aspectFill"></image>
				</view>
				<!-- 参数 -->
				<view class="flex row">
					<text class="label color-9">参数</text>
					<view class="flex-1 params-lists">
						<view class="item">课时</view>
						<view class="item">课程方式</view>
						<view class="item">题库数量</view>
						<view class="item">有效时长</view>
					</view>
					<image class="icon-more" src="" mode="aspectFill"></image>
				</view>
			</view>
			<view class="box">
				<custom-horizontal-tabs  :currentIndex="tabsIndex" :data="tabsData"></custom-horizontal-tabs>
			</view>
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
export default {
	data() {
		return {
			tabsData:['介绍','商品','目录','题库','考试','推荐'],
			tabsIndex:0
		};
	}
};
</script>

<style lang="less" src="./style.less"></style>
