<template>
	<view class="ticket">
		<view class="ticket-top">
			<business-common-navigation></business-common-navigation>
			<!-- tabs -->
			<custom-horizontal-tabs @change="onChange" :data="tabsData" :currentIndex="tabsIndex" class="custom-tabs"></custom-horizontal-tabs>
		</view>
		<!-- 优惠卷 -->
		<scroll-view scroll-y="true">
			<block v-for="(item,index) in dataList">
				<view class="ticket-item flex-center-between" @click="actionIndex = index">
					<view class="left flex-column">
						<view class="price flex">
							<view class="unit">¥</view>
							{{ item.couponAmount / 100 }}
						</view>
						<view class="desc">{{item.couponTypeContent}}</view>
					</view>
					<view class="middle flex-column">
						<view class="text">
							{{item.couponName}}
<!--							<text class="color-red">5</text>-->
						</view>
						<view class="tag red">{{item.effectContent}}</view>
					</view>
					<view class="right flex-center-center"><image src="../../../static/images/icons/icon-copy.svg" class="icon-copy" mode="aspectFill"></image></view>
				</view>
				<view class="action" v-if="actionIndex == index">
					<view class="flex-center-between record-row">
						<text class="text">领取使用记录</text>
						<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
					</view>
					<view class="flex-center-between">
						<view class="btn yellow">复制优惠券</view>
						<view class="btn red" @click="deleteTicket">删除</view>
					</view>
				</view>
			</block>
			<!-- 优惠券 -->
<!--			<view class="ticket-item flex-center-between">-->
<!--				<view class="left flex-column">-->
<!--					<view class="price flex">-->
<!--						<view class="unit">¥</view>-->
<!--						5-->
<!--					</view>-->
<!--					<view class="desc">满20元可用</view>-->
<!--				</view>-->
<!--				<view class="middle flex-column">-->
<!--					<view class="text">-->
<!--						产品-->
<!--						<text class="color-red">5</text>-->
<!--						元优惠券-->
<!--					</view>-->
<!--					<view class="tag yellow">剩余XXX天失效</view>-->
<!--				</view>-->
<!--				<view class="right flex-center-center"><image src="../../../static/images/icons/icon-copy.svg" class="icon-copy" mode="aspectFill"></image></view>-->
<!--			</view>-->
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabsData: ['已创建', '已失效'],
			tabsIndex: 0,
			actionIndex: -1,
			dataList: []
		};
	},
	onLoad(){
		this.queryTicket();
	},
	methods:{
		// 查询优惠券列表
		queryTicket(ty){
			this.$http.get('/coupon/queryListByStoreId',{
				status: this.tabsIndex + 1
			},false).then(res => {
				this.dataList = res;
			})
		},
		// 删除优惠券
		deleteTicket(){
			this.$http.get('/coupon/delete',{
				couponId: this.dataList[this.actionIndex].couponId
			},false).then(res => {
				this.dataList = res;
			})
		},
		onChange(data){
			this.tabsIndex = data;
			this.queryTicket()
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
