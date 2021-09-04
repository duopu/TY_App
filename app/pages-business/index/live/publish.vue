<!-- 发布直播 -->
<template>
	<view class="live publish">
		<view class="form-row">
			<text class="label">直播名称</text>
			<input placeholder-class="input-placeholder" class="input" type="text" placeholder="请输入" />
		</view>
		<view class="form-row">
			<text class="label">直播简介</text>
			<textarea placeholder-class="input-placeholder" class="textarea" placeholder="请输入"></textarea>
		</view>
		<view class="form-row"><button class="btn">下一步</button></view>
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
