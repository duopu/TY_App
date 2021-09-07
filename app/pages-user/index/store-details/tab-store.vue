<!-- 店铺详情 -->
<template>
	<scroll-view scroll-y="true" class="store-content">
		<!-- 头部 -->
		<view class="flex-center-between top">
			<image class="icon-back" src="../../../static/images/icons/icon-back.svg" mode="aspectFill"></image>
		</view>
		<view class="store-item flex">
			<image class="avatar-image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
			<view class="right flex-1 flex-column-between">
				<view class="item-top flex-center-between">
					<view class="flex-column">
						<view class="text-bold">店铺名称</view>
						<text class="desc">补充说明</text>
					</view>
					<view class="flex-column save flex-1">
						<image class="icon" src="../../../static/images/icons/icon-save.svg" mode="aspectFill"></image>
						<text class="desc">已收藏</text>
					</view>
					<view class="flex-column-center">
						<image class="icon" src="../../../static/images/icons/icon-share2.svg" mode="aspectFill"></image>
						<text class="desc">申请分销</text>
					</view>
				</view>
				<!-- 得分 -->
				<view class="rate flex-center">
					<text>综合评分</text>
					<rate :max="5"></rate>
				</view>
			</view>
		</view>
		<!-- 菜单 -->
		<custom-horizontal-tabs class="custom-tabs" :data="tabsData" :currentIndex="tabsIndex"></custom-horizontal-tabs>
	</scroll-view>
</template>

<script>
export default {
	name: 'tab-store',
	data() {
		return {
			tabsIndex:0,
			tabsData:['推荐','全部宝贝','新品']
		};
	}
};
</script>

<style lang="less" src="./style.less"></style>
