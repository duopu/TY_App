<!-- 权益中心 -->
<template>
	<view class="benfit">
		<!-- 账户 -->
		<view class="box flex-column-center account">
			<image class="avatar-image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
			<view class="text-bold font-large">
				商家A
			</view>
			<view class="level">
				LV1
			</view>
		</view>
		<!-- 升级规则 -->
		<view class="box rule">
			<view class="text-bold font-large">升级规则</view>
			<view class="lists">
				<view class="item flex-center-between" v-for="(item,index) in ['','','','']" :key="index">
					<image class="image" src="../../../static/images/my/vip.png" mode="widthFix"></image>
					<view class="flex-1 right">
						<view class="text-bold font-large">LV3</view>
						<view class="font-24">总营业额达<text class="color-red">1</text>元</view>
					</view>
				</view>
				
			</view>
		</view>
		<!-- 权益内容 -->
		<view class="box rule">
			<view class="text-bold font-large">权益内容</view>
			<view class="lists">
				<view class="item flex-center-between" v-for="(item,index) in ['','','','']" :key="index">
					<image class="image" src="../../../static/images/my/vip.png" mode="widthFix"></image>
					<view class="flex-1 right">
						<view class="text-bold font-large">LV3</view>
						<view class="font-24">xxxxxxxxx</view>
					</view>
				</view>
			</view>
		</view>
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
