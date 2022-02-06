<!-- 大咖直播 -->
<template>
	<view class="page-wrapper live">
		<view class="live-time flex-center">
			<image class="image-live" src="../../../static/images/live/new-live.png" mode="aspectFill"></image>
			<text class="text">{{hotLive.startTime}}</text>
		</view>
		<!-- 商家信息 -->
		<view class="flex-center-between live-profile">
			<text class="text-bold">{{hotLive.goodsName}}</text>
			<view class="flex-center">
				<image class="image-name" :src="hotLive.storeAvatar" mode="aspectFill"></image>
				<text class="font-24">{{hotLive.storeName}}</text>
			</view>
		</view>
		<!-- 广告 -->
		<view class="live-advertise">
			<image class="image-advertise" :src="hotLive.thumbnail" mode="aspectFill"></image>
			<button class="btn btn-block yellow" @click="gotoGoodsDetail(hotLive)">立即购买</button>
		</view>
		<!-- 列表 -->
		<view class="live-lists">
			<view class="live-lists-item flex-center-between" v-for="(item, index) in liveList" :key="index">
				<image class="item-image" :src="item.thumbnail" mode="aspectFill"></image>
				<view class="item-right">
					<view class="name text-bold">{{item.goodsName}}</view>
					<view class="flex-center-between">
						<view class="flex-center">
							<image class="image-name" :src="item.storeAvatar" mode="aspectFill"></image>
							<text class="font-24">{{item.storeName}}</text>
						</view>
						<button class="btn yellow" @click="gotoGoodsDetail(item)">立即购买</button>
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
			liveList:[],
			hotLive:{}
		};
	},
	onReady() {
		this.queryLiveList()
	},
	methods:{
		// 查询直播列表
		queryLiveList(){
			this.$http.get('/live/queryLivePage',{pageSize:1000,pageIndex:1},true).then(res=>{
				if(res.content && res.content.length > 0){
					this.hotLive = res.content[0]
					this.liveList = res.content.slice(1);
					console.log(this.liveList);
				}
			})
		},
		// 跳转商品详情
		gotoGoodsDetail(liveData){
			uni.navigateTo({
				url: `/pages-user/index/goods-details/goods-details?goodsId=${liveData.goodsId}`
			});
		},
		
	}
};
</script>

<style lang="less" src="./style.less"></style>
