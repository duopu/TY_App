<!-- 分销弹窗 -->
<template>
	<uni-popup class="popup" ref="popup" type="bottom" :safeArea="false">
		<view class="popup-main">
			<!-- 标题 -->
			<view class="popup-top">
				<view class="title text-bold">{{state === 1 ? '平台分销' : '商品分销'}}</view>
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<!-- 内容 -->
			<scroll-view class="popup-content" :scroll-y="true" @scrolltolower="onScrollTolower">
				<view class="row">
					<text class="label text-bold">分销活动：</text>
					<text class="color-6">{{detail.title}}</text>
				</view>
				<view class="row">
					<text class="label text-bold">分销规则：</text>
					<text class="color-6">{{detail.content}}</text>
				</view>
				<!-- 推广记录 -->
				<view class="record-title"><text class="text">推广记录</text></view>
				<view class="flex-center">
					<view class="record-item flex-column">
						<text class="number">{{detail.extensionCount}}</text>
						<text class="text">推广人数</text>
					</view>
					<view class="record-item flex-column">
						<text class="number">{{detail.commission}}</text>
						<text class="text">反佣金币</text>
					</view>
				</view>
				<!-- 表格 -->
				<view class="table">
					<view class="table-header">
						<view class="cell">推广用户</view>
						<view class="cell" v-if="state === 2">用户状态</view>
						<view class="cell">预计分佣</view>
						<view class="cell">分佣状态</view>
					</view>
					<view class="table-row" v-for="(item,index) in dataList" :key="`sales-distribute-{index}`">
						<view class="cell">
							<view class="flex-center">
								<image class="avatar-image" :src="item.avatar" mode="aspectFill"></image>
								<text>{{item.userName}}</text>
							</view>
						</view>
						<view class="cell" v-if="state === 2">已关联</view>
						<view class="cell">{{item.gold}}</view>
						<view class="cell">{{item.commissionStatus === 1 ? '未完成' : '已分佣'}}</view>
					</view>
				</view>
				<uni-load-more :status="loadStatus" :icon-size="16" :content-text="contentText" />
			</scroll-view>
			<!-- 复制链接 -->
			<view class="popup-bottom">
				<button class="btn">复制链接</button>
			</view>
		</view>
		
	</uni-popup>
</template>

<script>
export default {
	name: 'sales-distribute-popup',
	props: {
		state: { //弹窗类型  1平台分销  2商品分销
			type: Number,
			default: 1
		},
		data: { //分销详情
			type: Object,
			default: {
				commission: 0,
				content: undefined,
				extensionCount: 0,
				title: undefined,
				type: 0,
				id: undefined
			}
		}
	},
	watch: {
		data(newV, oldV){
			this.detail = newV;
			this.page = 1;
			this.loadStatus = 'more';
			this.getDataList();
		}
	},
	data() {
		return {
			detail:this.data,
			page: 1, //页码
			pageSize: 20, //每页条数
			loadStatus: 'more', //加载更多状态
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			},
			dataList: []
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
		
		/**
		 * 加载数据
		 * @param {Object} page 页码
		 * @param {Object} pageSize 每页条数
		 * @param {Object} callback
		 */
		getDataList(){
			if(this.state === 1){
				if(!this.detail.id){
					return;
				}
				this.$http
					.get('/platformDistribution/queryCommissionPage', {id:this.detail.id, page:this.page, size: this.pageSize}, true)
					.then(res => {
						if(this.page == 1){
							this.dataList = res.content;
						}else {
							this.dataList = this.dataList.concat(res.content);
						}
						if(res.totalSize <= this.page * this.pageSize){
							this.loadStatus = "noMore"
						}else{
							this.loadStatus = "more"
						}
					}).catch(err => {
						if(this.page > 1){
							this.loadStatus = "more";
							this.page -= 1;
						}
					});
			}
		},
		
		/**
		 * 上拉加载
		 */
		onScrollTolower(){
			if(this.loadStatus !== 'noMore'){
				this.loadStatus = 'more';
				this.page += 1;
				this.getDataList();
			}
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
