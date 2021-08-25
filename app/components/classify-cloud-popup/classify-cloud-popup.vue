<!-- 综合排序 -->
<template>
	<uni-popup ref="popup" type="top" :safeArea="false" @change="onChangePopup">
		<view  class="popup-content">
			<scroll-view :scroll-y="true" class="sorts">
				<view class="sorts-content">
					<view class="sorts-column first">
						<view class="sorts-item on">全部</view>
						<view class="sorts-item">我的兴趣</view>
						<view class="sorts-item">热门分类</view>
						<view class="sorts-item">一级类目</view>
						<view class="sorts-item">一级类目</view>
					</view>
					<view class="sorts-column">
						<view class="sorts-item on">云计算</view>
						<view class="sorts-item">二级类目</view>
						<view class="sorts-item">二级类目</view>
					</view>
					<view class="sorts-column">
						<view class="sorts-item on">二级类目</view>
						<view class="sorts-item">二级类目</view>
						<view class="sorts-item">二级类目</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'classify-cloud-popup',
	props: {
	},
	data() {
		return {
			show: false,
		};
	},
	methods: {
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		},
		// 关闭弹窗
		open() {
			this.$refs.popup.open();
		},
		toggle() {
			this.show ? this.close() : this.open();
		},
		// 获取当前弹窗状态
		onChangePopup(e) {
			this.show = e.show;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
