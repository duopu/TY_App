<template>
	<view class="check-in-form">
		<view class="mesage text-bold">
			请先 <text class="download color-primary">下载承诺书</text> ，签署后，将本人手持承诺书的照片上
			传至系统。
		</view>
		<view class="image-lists flex-column-center">
			<view class="item">
				<image class="image-photo" src="../../../static/images/check-in-photo.png" mode="aspectFill"></image>
			</view>
			<view class="text-bold">请上传手持承诺书照片</view>
		</view>
	</view>
</template>

<script>
export default {
	name:'StepFour',
	data() {
		return {};
	}
};
</script>

<style lang="less" src="./style.less"></style>
