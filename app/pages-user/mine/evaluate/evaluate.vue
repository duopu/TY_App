<!-- 发表评价 -->
<template>
	<view class="evaluate flex-column">
		<!-- 头部 -->
		<view class="evaluate-top flex-center-between">
			<image class="icon-back" src="../../../static/images/icons/icon-back.svg" mode="aspectFill"></image>
			<text class="title text-bold flex-1">发表评价</text>
			<button class="btn">发布</button>
		</view>
		<scroll-view scroll-y="true" class="evaluate-content">
			<!-- 评价的商品 -->
			<merchanism-order-lists-item class="lists-item" :type="3" :storeGoodsVO="{}"></merchanism-order-lists-item>
			<!-- 商品评价 -->
			<view class="box">
				<view class="flex-center">
					<text class="text-bold box-title">商品评分</text>
					<rate :number="5"></rate>
				</view>
				<textarea class="input" placeholder-class="input-placeholder" placeholder="写下您的评价" />
				<view class="image-lists">
					<view class="flex-center-center image-item"><image class="icon-carme" src="../../../static/images/icons/icon-carme.svg" mode="aspectFill"></image></view>
					<!-- 显示上传后的照片 -->
					<view v-if="false" class="image-item flex-center-center">
						<image class="upload-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<!-- 课程评价 -->
			<view class="box">
				<view class="flex-center">
					<text class="text-bold box-title">课程评价</text>
					<rate :number="5"></rate>
				</view>
				<textarea class="input" placeholder-class="input-placeholder" placeholder="写下您的评价" />
			</view>
			<!-- 题库评分 -->
			<view class="box">
				<view class="flex-center">
					<text class="text-bold box-title">题库评分</text>
					<rate :number="5"></rate>
				</view>
				<textarea class="input" placeholder-class="input-placeholder" placeholder="写下您的评价" />
			</view>
			<!-- 考试评分 -->
			<view class="box">
				<view class="flex-center">
					<text class="text-bold box-title">考试评分</text>
					<rate :number="5"></rate>
				</view>
				<textarea class="input" placeholder-class="input-placeholder" placeholder="写下您的评价" />
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
