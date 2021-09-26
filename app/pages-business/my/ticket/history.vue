<!-- 优惠券领取使用记录 -->
<template>
	<view class="history">
		<!-- 人数 -->
		<view class="flex-center-center top">
			<text class="item">总使用人数：{{useCount}}</text>
			<text class="on item">总领取人数：{{list.length}}</text>
		</view>
		<!-- 列表 -->
		<scroll-view class="list" scroll-y="true">
			<view class="item flex-center-between" v-for="(item,index) in list">
				<image class="avatar-image" :src="item.userAvatar" mode="aspectFill"></image>
				<text class="name text-bold">{{ item.userName }}</text>
				<text class="describe" :class="[index === 1 ? 'red':'blue']">{{ typeText[item.status]}}</text>
				<text class="time">{{item.receiveTime }}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				couponId: '',
				page: 1,
				size: 10,
				useCount: 0,
				typeText: {
					1: '已领取',
					2: '已使用',
					3: '已过期',
				}
			};
		},
		onLoad(options){
			this.couponId = options.couponId;
			this.queryList();
			this.queryStatistics();
		},
		methods:{
			queryList(){
				let params = {
					couponId: this.couponId,
					page: this.page,
					size: this.size
				};
				this.$http.get('/userCoupon/queryPageByCoupon',params).then(res => {
					this.list = res.content;
				})
			},
			queryStatistics(){
				let params = { couponId: this.couponId, };
				this.$http.get('/userCoupon/queryStatistics',params).then(res => {
					this.useCount = res.useCount;
				})
			}
		}
	}
</script>

<style src="./style.less" lang="less" scoped></style>
