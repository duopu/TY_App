<!-- 会员权益 -->
<template>
	<view class="benefit">
		<!-- tab -->
		<view class="tabs-lists flex-center-between">
			<view class="item on">白银</view>
			<view class="item">黄金</view>
			<view class="item">钻石</view>
		</view>
		<view class="benefit-silver">
			<image class="image" src="../../../static/images/benefit-silver.png" mode="widthFix"></image>
			<view class="describe flex-column-between">
				<view class="name text-bold">白银会员</view>
				<view class="text flex-1">当前成长值:1200,升级还需:800</view>
				<view class="process">
					<view class="process-bar" style="width: 60%;"></view>
				</view>
			</view>
		</view>

		<!-- 白银特权 -->
		<view class="box privilege">
			<view class="title text-bold">白银特权</view>
			<view class="privilege-list">
				<view class="flex-column item" v-for="(item, index) in privilegeLists" :key="index">
					<image class="image" mode="aspectFill" :src="item.image"></image>
					<text>{{ item.text }}</text>
				</view>
			</view>
		</view>
		<!-- 获取成长值去升级 -->
		<view class="box upgrade">
			<view class="title text-bold">获取成长值去升级</view>
			<view class="upgrade-list">
				<view class="item flex-center-between" v-for="(item, index) in upgradeLists" :key="index">
					<image class="image" mode="aspectFill" :src="item.image"></image>
					<view class="flex-column flex-1">
						<view class="text-bold">{{ item.name }}</view>
						<view class="desc">{{ item.desc }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 白银特权
			privilegeLists: [
				{
					image: '../../../static/images/benefit-privilege-01.png',
					text: '会员权益'
				},
				{
					image: '../../../static/images/benefit-privilege-02.png',
					text: '会员升级'
				},
				{
					image: '../../../static/images/benefit-privilege-03.png',
					text: '会员折扣'
				},
				{
					image: '../../../static/images/benefit-privilege-04.png',
					text: '会员免费课'
				},
				{
					image: '../../../static/images/benefit-privilege-05.png',
					text: '会员优惠券'
				}
			],
			upgradeLists: [
				{
					image: '../../../static/images/benefit-upgrade-01.png',
					name: '购买课程',
					desc: '20元/成长值'
				},
				{
					image: '../../../static/images/benefit-upgrade-02.png',
					name: '购买题库',
					desc: '20元/成长值'
				}
			]
		};
	},
	methods: {}
};
</script>

<style lang="less" src="./style.less"></style>
