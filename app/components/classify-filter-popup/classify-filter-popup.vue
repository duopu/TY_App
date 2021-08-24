<!-- 综合排序 -->
<template>
	<uni-popup ref="popup" type="right" :safeArea="false" @change="onChangePopup">
		<view class="popup-content">
			<!-- 滚动 -->
			<scroll-view class="lists-wrapper" scroll-y="true">
				<view class="title text-bold">包含资源(可多选)</view>
				<view class="horizontal-lists">
					<view class="item">课件资料</view>
					<view class="item">回放可看</view>
					<view class="item">题库练习</view>
				</view>
				<view class="title text-bold">课程形式</view>
				<view class="horizontal-lists">
					<view class="item">线上直播</view>
					<view class="item">线下</view>
					<view class="item on">录播</view>
				</view>
				<view class="title text-bold">价格区间</view>
				<view class="flex-center input-area">
					<input class="input" type="text" placeholder="最低价" placeholder-class="input-placeholder">
					<view class="space-line">～</view>
					<input class="input" type="text" placeholder="最高价" placeholder-class="input-placeholder">
				</view>
				<view class="title text-bold">机构类型</view>
				<view class="horizontal-lists">
					<view class="item on">企业</view>
					<view class="item">官方</view>
					<view class="item">个人</view>
				</view>
			</scroll-view>
			<!-- 底部 -->
			<view class="btn-bottom">
				<button class="btn-light btn">清空筛选</button>
				<button class="btn-block btn">确定</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'classify-filter-popup',
	data() {
		return {
			show: false
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
