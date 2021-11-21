<!-- 查看直播记录 -->
<template>
	<scroll-view scroll-y="true" class="live record padding">
		<!-- 记录 -->
		<view class="record-lists-item" v-for="(item,index) in dataList" :key="item.liveId" >
			<image class="image" :src="item.thumbnail" mode="aspectFill"></image>
			<!-- 直播 -->
			<view class="row flex-center-between" v-if="item.liveState < 2">
				<view class="left flex-column flex-1">
					<view class="flex-center">
						<text class="circle"></text>
						<text class="text-bold">{{item.createTime}}</text>
						<text class="color-6">{{ item.liveName }}</text>
					</view>
				</view>
				<!-- 直播-live -->
				<view class="right flex-center-center live" @click="gotoLiveRoom(item.liveId)">
					<image class="icons" src="../../../static/images/icons/icon-live-play.svg" mode="aspectFill"></image>
				</view>
			</view>
			<!-- 回放 -->
			<view class="row flex-center-between" v-else >
				<view class="left flex-column flex-1">
					<view class="flex-center">
						<text class="circle"></text>
						<text class="text-bold">{{item.createTime}}</text>
						<text class="color-6">{{ item.liveName }}</text>
					</view>
					<view class="time">【回放】{{item.playbackTime}}</view>
				</view>
				<view class="right flex-center-center live" @click="gotoLiveRoom(item.liveId)">
					<image class="icons" src="../../../static/images/icons/icon-live-playback.svg" mode="aspectFill">		
					</image>
				</view>
			</view>
		</view>
		<view @click="startLive" class="publishLive">发起直播</view>
	</scroll-view>

</template>

<script>
export default {
	data() {
		return {
			dataList: []
		};
	},
	onReady() {
		this.queryPageByStore();
	},
	methods:{
		startLive(){
			uni.navigateTo({
				url:'/pages-business/index/live/publish',
			})
		},
		queryPageByStore(){
			this.$http.get('/live/queryPageByStore',{ page: 1, size: 1000 }).then(res => {
				this.dataList = res.content;
			})
		},
		// 跳转直播详情
		gotoLiveRoom(liveId){
			uni.navigateTo({
				url:`/pages-business/index/room/room?liveId=${liveId}`
			})
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
