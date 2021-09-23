<!--  创建优惠券-选择商品 -->
<template>
	<view class="scroll-content">
		<!-- top -->
		<view class="select-top">
			<!-- 导航栏 -->
			<view class="navbar flex-center-between">
				<image class="icon-back" src="../../../static/images/login/back.png" mode="aspectFill"></image>
				<text class="title text-bold">选择商品</text>
				<text class="btn-text">创建</text>
			</view>
			<!-- 搜索区域 -->
			<view class="flex-center search ">
				<image class="icon-search" src="../../../static/images/icons/icon-search1.svg" mode="aspectFill"></image>
				<input class="felx-1" type="text" value="" placeholder="搜索" placeholder-style="input-placeholder" />
			</view>
			<!-- 筛选内容 -->
			<view class="flex-center-between filter">
				<view class="select-all flex-center-center">
					<!-- 选中 on -->
					<text class="radio on"></text>
					<text class="text">全选</text>
					<text class="line"></text>
				</view>
				<view class="flex-center-center menu-item" :class="{ on: dialogNameList[0].show}" @click.stop.prevent="toggleDialog(0)">
					<view class="text">包含资源 ·</view>
					<text class="number">0</text>
					<text class="arrow"></text>
				</view>
				<view class="flex-center-center menu-item" :class="{ on: dialogNameList[1].show }" @click.stop.prevent="toggleDialog(1)">
					<view class="text">商品分类</view>
					<text class="arrow"></text>
				</view>
			</view>
		</view>
		<!-- 内容区 -->
		<scroll-view scroll-y="true" class="list">
			<!-- 列表项 -->
			<view class="item flex-center" v-for="(item, index) in ['', '', '', '', '']" :key="index">
				<view class="radio"></view>
				<view class="flex-1 goods-item">
					<image src="../../../static/images/other/demo.png" mode="aspectFill" class="avatar-image"></image>
					<view class="flex-1 flex-column-between">
						<view class="text-bold name">5天英语全能挑战名称可能很长 可能是两行</view>
						<view class="flex-center-between">
							<text class="number">124512</text>
							<view class="price text-bold">
								<text class="unit">￥</text>
								500
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="slot-item"></view>
		</scroll-view>
		<!-- 底部 -->
		<view class="bottom flex-center-between">
			<text>0/10</text>
			<view class="flex-1 flex-center-end">
				<!-- 灰色-grey -->
				<button class="btn text-bold ">上一页</button>
				<button class="btn text-bold">下一页</button>
			</view>
		</view>
		<!-- 弹窗 包含资源 -->
		<business-goods-resource-popup class="resouse-dialog" ref="resourcePopup" @change="changeResource"></business-goods-resource-popup>
		<!-- 弹窗 商品分类 -->
		<business-goods-classify-popup class="classify-dialog" ref="classifyPopup" @change="changeClassify"></business-goods-classify-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 弹窗
			dialogNameList: [
				{
					refName: 'resourcePopup',
					show: false
				},
				{
					refName: 'classifyPopup',
					show: false
				}
			]
		};
	},
	methods: {
		// 打开弹窗
		toggleDialog(_index) {
			this.dialogNameList.forEach((item,index) => {
				if(_index !== index && item.show) this.$refs[item.refName].close();
				!item.show && _index === index ? this.$refs[item.refName].open() : this.$refs[item.refName].close();
				
			});
		},
		// 弹窗 资料
		changeResource(show) {
			this.dialogNameList[0].show = show;
		},
		// 弹窗 分类
		changeClassify(show) {
			this.dialogNameList[1].show = show;
		}
	}
};
</script>

<style src="./style.less" lang="less" scoped></style>
