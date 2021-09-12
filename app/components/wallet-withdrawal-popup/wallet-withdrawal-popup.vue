<!-- 提现弹窗 -->
<template>
	<uni-popup class="popup" ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<!-- 头部 -->
			<view class="popup-title flex-center-between text-bold">
				<custom-horizontal-tabs class="flex-1" :data="tabsData" :currentIndex="tabIndex" @change="getTabIndex"></custom-horizontal-tabs>
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<!-- 内容 -->
			<view v-if="tabIndex === 0" class="popup-content">
				<view class="row-item flex-center-between">
					<text class="lable">支付宝账号名称：</text>
					<input class="input flex-1" placeholder-class="input-placeholder" type="text" placeholder="请输入" />
				</view>
				<view class="row-item flex-center-between">
					<text class="lable">支付宝账号：</text>
					<input class="input flex-1" placeholder-class="input-placeholder" type="text" placeholder="请输入" />
				</view>
				<view class="row-item flex">
					<text class="lable">支付款收款码：</text>
					<view class="upload-image small">
						<!-- 上传后的图片 -->
						<image class="image-photo" src="../../static/images/check-in-photo.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view v-else-if="tabIndex === 1" class="popup-content">
				<view class="row-item flex-center-between">
					<text class="lable">微信账号名称：</text>
					<input class="input flex-1" placeholder-class="input-placeholder" type="text" placeholder="请输入" />
				</view>
				<view class="row-item flex-center-between">
					<text class="lable">微信名：</text>
					<input class="input flex-1" placeholder-class="input-placeholder" type="text" placeholder="请输入" />
				</view>
				<view class="row-item flex">
					<text class="lable">微信收款码：</text>
					<view class="upload-image small">
						<!-- 上传后的图片 -->
						<image class="image-photo" src="../../static/images/check-in-photo.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<!-- button -->
			<view class="flex-center-between popup-bottom"><button class="btn flex-1" @click="submit">确定</button></view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'wallet-withdrawal-popup',
	data() {
		return {
			tabIndex: 0,
			tabsData: ['支付宝提现', '微信提现']
		};
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
		// 确定
		submit() {},
		// 获取index
		getTabIndex(index) {
			this.tabIndex = index;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
