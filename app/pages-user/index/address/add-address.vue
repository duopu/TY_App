<!-- 配送至 -->
<template>
	<view class="address">
		<!-- 列表 -->
		<scroll-view scroll-y="auto" class="address-content add-address">
			<view class="form-address">
				<view class="row">
					<text class="label text-bold">收货人</text>
					<input type="text" placeholder-class="input-placeholder"  class="input border-bottom" placeholder="请输入" />
				</view>
				<view class="row">
					<text class="label text-bold">手机号码</text>
					<input type="text" placeholder-class="input-placeholder"  class="input border-bottom" placeholder="请输入" />
				</view>
				<view class="row">
					<text class="label text-bold">选择地区</text>
					<view class="border-bottom flex-1 flex-center">
						<input type="text" placeholder-class="input-placeholder"  class="input" placeholder="请输入" />
						<button class="btn-text">获取验证码</button>
					</view>
				</view>
				<view class="row">
					<text class="label text-bold">详细地址</text>
					<view class="textarea-bottom flex flex-1">
						<textarea placeholder-class="input-placeholder" class="textarea flex-1" placeholder="请输入" />
						<button class="btn-text">定位</button>
					</view>
				</view>
				<view class="flex-center row">
					<text class="label text-bold">设为默认地址</text>
					<view class="radio"></view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部 -->
		<view class="address-bottom"><button class="btn btn-block">保存</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style src="./style.less" lang="less"></style>
