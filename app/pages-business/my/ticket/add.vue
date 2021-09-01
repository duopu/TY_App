<!-- 添加优惠券 -->
<template>
	<view class="add-ticket">
		<view class="add-ticket-top flex-center">
			<text class="color-9">取消</text>
			<text class="title text-bold">发布文章</text>
			<text>创建</text>
		</view>
		<!-- 内容 -->
		<scroll-view class="add-ticket-content" scroll-y="true">
			<view class="box">
				<view class="row flex-center">
					<text class="label">优惠劵名称:</text>
					<input type="text" class="border input" placeholder-class="input-placeholder" placeholder="请输入" />
				</view>
				<view class="row flex-center">
					<text class="label">面值:</text>
					<input type="number" class="border money input" />
				</view>
				<view class="row">
					<text class="label">订单金额:</text>
					<view class="flex-center m-top-8">
						<view class="radio flex-center">
							<text class="radio-circle"></text>
							<text class="desc">不限制</text>
						</view>
						<view class="radio flex-center">
							<text class="radio-circle on"></text>
							<text class="desc">满</text>
							<input type="number" class="border money input" />
							<text class="desc">元可使用</text>
						</view>
					</view>
				</view>
				<view class="row flex-center">
					<text class="label">发放总量:</text>
					<input type="number" class="border money input" />
					<text class="desc">张</text>
				</view>
				<view class="row">
					<view class="label">领券开始日期~领券结束日期</view>
					<view class="flex-center m-top-8">
						<picker mode="date" class="border"><view></view></picker>
						<text class="middle">~</text>
						<picker mode="date" class="border"></picker>
					</view>
				</view>
				<view class="row flex-center">
					<text class="label stick-width">优惠劵类型:</text>
					<view class="input border flex-center-between">
						<picker mode="selector" class="flex-1">
							<view>日常优惠/推广促销</view>
						</picker>
						<image class="icon-down" src="../../../static/images/icons/icon-down-arrow.svg" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row flex-center">
					<text class="label stick-width">推广渠道:</text>
					<view class="input border flex-center-between">
						<picker mode="selector" class="flex-1">
							<view>全网推广/自有渠道推广</view>
						</picker>
						<image class="icon-down" src="../../../static/images/icons/icon-down-arrow.svg" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row flex-center">
					<text class="label stick-width">适用范围:</text>
					<view class="input border flex-center-between">
						<picker mode="selector" class="flex-1">
							<view>全站/固定商品</view>
						</picker>
						<image class="icon-down" src="../../../static/images/icons/icon-down-arrow.svg" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row flex-center">
					<text class="label stick-width">优惠劵说明:</text>
					<input type="text" class="border input" placeholder-class="input-placeholder" placeholder="请输入" />
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="less" src="./style.less"></style>
