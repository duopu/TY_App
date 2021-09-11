<!-- 帮助与反馈 -->
<template>
	<view class="help">
		<!-- 使用帮助 -->
		<view class="title">使用帮助</view>
		<view class="block-box">
			<view class="flex-center row">
				<image class="icons" src="" mode="aspectFill"></image>
				<view class="flex-column">
					<text class="question">
						应用总是闪退怎么办？
					</text>
					<text class="text-bold answer">
						请卸载后，在应用市场重新下载安装
					</text>
				</view>
			</view>
			<view class="flex-center row">
				<image class="icons" src="" mode="aspectFill"></image>
				<view class="flex-column">
					<text class="question">
						应用总是闪退怎么办？
					</text>
					<text class="text-bold answer">
						请卸载后，在应用市场重新下载安装
					</text>
				</view>
			</view>
		</view>
		<!-- 意见反馈 -->
		<view class="title">意见反馈</view>
		<view class="block-box">
			<textarea placeholder-class="input-placeholder" class="textarea" placeholder="请输入您的意见想法"></textarea>
		</view>
		<button class="btn-block">提交</button>
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

<style lang="less" src="./style.less"></style>
