<!-- 退款详情 -->
<template>
	<scroll-view scroll-y="true" class="refund">
		<!-- 处理状态 -->
		<view class="box">
			<view class="state text-bold flex-center">
				<!-- 处理中 -->
				<image v-if="true" class="image-state" src="../../../static/images/icons/icon-goods-state.svg" mode="aspectFill"></image>
				<!-- 处理成功 -->
				<image v-if="false" class="image-state" src="../../../static/images/gou.png" mode="aspectFill"></image>
				<text>商家处理中</text>
			</view>
			<view class="desc">您已成功发起退款申请，请耐心等待商家处理</view>
		</view>
		<!-- 商品 -->
		<view class="store">
			<view class="flex-center-between top"><view class="name">退款商品</view></view>
			<view class="content flex">
				<image class="avatar-image" :src="goodsVO.thumbnail" mode="aspectFill"></image>
				<view class="flex-column flex-1 right">
					<view class="title">{{ goodsVO.goodsName }}</view>
					<view v-if="goodsVO.attributesId" class="tag">
						<view class="tag-item">{{ goodsVO.attributesName }}</view>
					</view>
					<view class="flex-center-between">
						<view class="price">
							<text class="unit">¥</text>
							{{ goodsVO.price }}
						</view>
						<view class="number">×{{ goodsVO.goodsNum }}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 退款原因 -->
		<view class="box discount">
			<view class="discount-title text-bold">退款信息</view>
			<view class="discount-row flex-center-between">
				<text class="label">退款数量*</text>
				<text class="flex-1">1</text>
			</view>
			<view class="discount-row flex-center-between">
				<text class="label">退款原因*</text>
				<text class="flex-1">不想要啦</text>
			</view>
			<view class="discount-row flex-center-between">
				<text class="label">退款金额*</text>
				<text class="flex-1">¥500</text>
			</view>
			<view class="discount-row">
				<text class="label">补充描述*</text>
				<!-- 图片展示 -->
				<view class="image-lists">
					<view class="image-item flex-center-center">
						<image class="upload-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
					</view>
					<view class="image-item flex-center-center">
						<image class="upload-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="remark">不想要，就想退货~~~</view>
			</view>
		</view>
		<!-- 提交退款 -->
		<button class="btn">撤销退款申请</button>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			goodsVO: {
				thumbnail: '../../../static/images/other/demo.png',
				goodsName: '5天英语全能挑战5天英语全能挑战5天英语全能挑战',
				goodsNum: 12,
				attributesId: 1,
				price: 500,
				attributesName: '型号一'
			}
		};
	},
	onLoad() {
		// 数据加载
	}
};
</script>

<style lang="less" src="./style.less"></style>
