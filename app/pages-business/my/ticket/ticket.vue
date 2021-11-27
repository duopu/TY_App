<template>
	<view class="ticket">
		<business-common-navigation @search="onSearch" @jump="jumpMessage"></business-common-navigation>
		<!-- tabs -->
		<custom-horizontal-tabs @change="onChange" :data="tabsData" :currentIndex="tabsIndex" class="custom-tabs"></custom-horizontal-tabs>

		<!-- 优惠卷 -->
<!--		<scroll-view scroll-y="true">-->
		<my-scroll-view ref="myScrollView" @loadData="queryTicket">
			<template v-slot:list="slotProps">
				<block v-for="(item, index) in slotProps.list" :key="index">
					<view class="ticket-item flex-center-between" @click="actionIndex = index">
						<view class="left flex-column">
							<view class="price flex">
								<view class="unit">¥</view>
								{{ item.couponAmount }}
							</view>
							<view class="desc text-ellipsis">{{ item.couponTypeContent }}</view>
						</view>
						<view class="middle flex-column">
							<view class="text">
								{{ item.couponName }}
								<!--							<text class="color-red">5</text>-->
							</view>
							<view class="tag red text-ellipsis">{{ item.effectContent }}</view>
						</view>
						<view class="right flex-center-center" @click="copy(item.couponId)"><image src="../../../static/images/icons/icon-copy.svg" class="icon-copy" mode="aspectFill"></image></view>
					</view>
					<view class="action" v-if="actionIndex == index">
						<view class="flex-center-between record-row" @click="jumpHistory(item.couponId)">
							<text class="text">领取使用记录</text>
							<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-arrow-right.svg"></image>
						</view>
						<view class="flex-center-between">
							<view class="btn yellow" @click="copy(item.couponId)">复制优惠券</view>
							<view class="btn red" @click="deleteTicket(item.couponId)">删除</view>
						</view>
					</view>
				</block>
			</template>

		</my-scroll-view>
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
<!--		</scroll-view>-->
	</view>
</template>

<script>
import config from '../../../utils/config.js';
export default {
	data() {
		return {
			tabsData: ['已创建', '已失效'],
			tabsIndex: 0,
			actionIndex: -1,
			dataList: [],
			searchText: ''
		};
	},
	onLoad() {
		// this.queryTicket();
	},
	methods: {
		// 查询优惠券列表
		// queryTicket(ty) {
		// 	this.$http
		// 		.get(
		// 			'/coupon/queryListByStoreId',
		// 			{
		// 				status: this.tabsIndex + 1
		// 			},
		// 			false
		// 		)
		// 		.then(res => {
		// 			this.dataList = res;
		// 		});
		// },
		queryTicket(pageNum = 1, pageSize, callback){
			let params = {
				status: this.tabsIndex + 1,
				searchText: this.searchText
			};
			this.$http.get('/coupon/queryListByStoreId',{page: pageNum,size: pageSize,...params},true).then(res =>{
				console.log(res || {});
				callback(res);
			}).catch( err => {
				callback(null);
			})
		},
		// 删除优惠券
		deleteTicket(id) {
			console.log(id);
			uni.showModal({
				title: '提示',
				content: '是否确认删除该优惠券?',
				success: (res) => {
					if(res.confirm){
						this.$http.post('/coupon/delete',
							{
								couponId: id
							},
							false
						).then(res => {
								this.$refs.myScrollView.onRefresh();
								// this.dataList = res;
							});
					}
				}

			})
		},
		onChange(data) {
			this.tabsIndex = data;
			// this.queryTicket();
			this.$refs.myScrollView.onRefresh();
		},
		jumpHistory(id){
			uni.navigateTo({
				url: `/pages-business/my/ticket/history?couponId=${id}`
			});
		},
		onSearch(searchValue){
			this.searchText = searchValue;
			this.$refs.myScrollView.onRefresh();
		},
		jumpMessage(){
			uni.navigateTo({
				url: `/pages-business/main/main`,
				success: (res) => {
					res.eventChannel.emit('changeTab', { data: 1 })
				}
			});
		},
		copy(couponId){
			const linkType = config.linkType.ticketShare;
			const url = `${config.urlLink.shareTicketUrl}?linkType=${linkType}&couponId=${couponId}`;
			const shareMsg = `分享一张优惠券给你：${url}`;
			uni.setClipboardData({
			    data: shareMsg,
			    success: () => {
					uni.hideToast(); //这里去掉系统级粘贴成功的弹窗效果
					this.$tool.showToast('链接已复制到剪贴板，快分享给小伙伴吧');
			    }
			});
		}
	}
};
</script>

<style src="./style.less" lang="less" scoped></style>
