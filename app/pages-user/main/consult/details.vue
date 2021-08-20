<!-- 资讯详情 -->
<template>
	<view class="consult-details">
		<view class="article-title text-bold">华为自动驾驶实力超特斯拉？优势和困局都很明显</view>
		<view class="flex-center-between article-desc">
			<view class="flex-center">
				<image class="avatar-image" src="../../../static/images/other/demo.png" mode="aspectFill"></image>
				<text>商家友善</text>
			</view>
			<view class="flex-center">
				<image class="icon-image" src="../../../static/images/icons/icon-eye.svg" mode="aspectFill"></image>
				<text class="number font-24">65421</text>
				<text class="time font-24">2121-12-12</text>
			</view>
		</view>
		<view class="content">
			<view class="row">
				一路“象”北还在继续。
			</view>
			<view class="row">
				 6月2日21时55分，象群继续向北迁移，进入昆明市晋宁区双河乡，目前位于双河乡火草坝附近。 云南发布消息，云南省林草局协调无人机监测团队、应急处置团队、亚洲象专家全部转场，提前研判和通报迁移线路，指导当地全面开展布防工作，要求高度警醒、高度戒备、全力防控，切实保障人象安全。 对一路“象”北的象群，人们纷纷好奇，它们究竟要去哪里？还要向北走多远呢？
			</view>
		</view>
		<view class="title text-bold">相关文章</view>
		<consult-lists-item class="lists-item" v-for="(item,index) in ['','']" :key="index"></consult-lists-item>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" src="./style.less">

</style>
