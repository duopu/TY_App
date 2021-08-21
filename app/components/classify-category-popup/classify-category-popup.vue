<!-- 选择分类组件 -->
<template>
	<uni-popup class="coustom-popup" :type="'bottom'" ref="popup" :safe-area="false">
		<view class="popup-wrapper">
			<!-- 标题 -->
			<view class="popup-title text-bold">我的兴趣</view>
			<!-- 列表 -->
			<scroll-view :scroll-y="true" class="popup-content">
				<view class="subtitle text-bold">热门分类</view>
				<view class="category-lists flex-center">
					<view class="item flex-column-center" :class="{on:index === 0}" v-for="(item, index) in ['','','','', '', '', '']" :key="index">
						<image class="icon" src="" mode="aspectFill"></image>
						<text class="text-ellipsis text">二级类目</text>
					</view>
				</view>
				<view class="subtitle text-bold">一级类目</view>
				<view class="category-lists flex-center">
					<view class="item flex-column-center" v-for="(item, index) in ['','','','', '', '', '']" :key="index">
						<image class="icon" src="" mode="aspectFill"></image>
						<text class="text-ellipsis text">二级类目</text>
					</view>
				</view>
			</scroll-view>
			<!-- 底部 -->
			<view class="flex-center-center popup-bottom"><button class="btn text-bold">确定</button></view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'classify-category-popup',
	data() {
		return {};
	},
	methods:{
		// 打开弹窗
		open(){
			this.$refs.popup.open();
		},
		// 关闭弹窗
		close(){
			this.$refs.popup.close();
		}
	}
	
};
</script>

<style lang="less" src="./style.less"></style>
