<!-- 商品 -->
<template>
	<view class="store-content">
		<!-- 店铺 -->
		<view class="store-item flex">
			<image class="avatar-image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
			<view class="right flex-1 flex-column-between">
				<view class="item-top flex-center-between">
					<view class="flex-column flex-1">
						<view class="flex-center">
							<view class="text-bold">店铺名称</view>
							<image class="icon-company" src="../../../static/images/index/company-tag.png" mode="aspectFill"></image>
						</view>
						<text class="desc">补充说明</text>
					</view>
					<view class="flex-column-center save">
						<image class="icon" src="../../../static/images/icons/icon-save.svg" mode="aspectFill"></image>
						<text class="text">已收藏</text>
					</view>
					<view class="flex-column-center">
						<image class="icon" src="../../../static/images/icons/icon-share2.svg" mode="aspectFill"></image>
						<text class="text">申请分销</text>
					</view>
				</view>
				<!-- 得分 -->
				<view class="rate flex-center">
					<text>综合评分</text>
					<rate :max="5" class="rate-star"></rate>
				</view>
			</view>
		</view>
		<!-- 内容区域 -->
		<!-- 全部宝贝 -->
		<tab-common ></tab-common>
	</view>
</template>

<script>
import TabCommon from './tab-common.vue';
export default {
	name: 'tab-goods',
	components: {
		TabCommon
	},
	data() {
		return {
			tabsIndex: 0,
			tabsData: ['推荐', '全部宝贝', '新品'],
			queryParams:{
				searchText
			}
		};
	},
	methods: {
		
		// 获取搜索内容
		getSearchInput(value) {
			this.queryParams.searchText = value;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>