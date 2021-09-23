<!-- 优惠券-选择商品-商品分类弹窗 -->
<template>
	<uni-popup class="popup" ref="popup" type="top" :safeArea="false" @change="onChangePopup">
		<scroll-view scroll-y="true" class="classify-content ">
			<view class="flex-between list">
				<view class="item-column flex-1"><view class="text" :class="{ active: index === 1 }" v-for="(item, index) in ['', '', '']" :key="index">全部</view></view>
				<view class="item-column text-center flex-1">
					<view class="text" :class="{ on: index === 1 }" v-for="(item, index) in ['', '', '']" :key="index">云计算</view>
				</view>
				<view class="item-column text-center flex-1">
					<view class="text" :class="{ on: index === 1 }" v-for="(item, index) in ['', '', '']" :key="index">二级类目</view>
				</view>
			</view>
		</scroll-view>
	</uni-popup>
</template>

<script>
export default {
	name: 'business-goods-classify-popup',
	data() {
		return {};
	},
	methods: {
		// 打开弹窗
		open() {
			this.$refs.popup.open();
		},
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		},
		// 弹窗 change valueObject [show,type]
		onChangePopup(valueObject) {
			this.$emit('change', valueObject.show);
		}
	}
};
</script>

<style src="./style.less" lang="less" scoped></style>
