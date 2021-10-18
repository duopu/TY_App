<template>
	<view>
		<my-scroll-view ref="scroll" class="lists" @loadData="onLoadUnremittingly">
			<template v-slot:list="slotProps">
				<view class="insist-lists-item" v-for="(item, index) in slotProps.list" :key="`unremittingly-${index}`">
					<view class="flex-column">
						<text>{{item.unremittinglyName}}</text>
						<text class="price">奖品：{{item.goodsName}}</text>
					</view>
					<button class="btn" @click="submitUnremittingly(item.unremittinglyId)">报名活动</button>
				</view>
			</template>
		</my-scroll-view>
		
		<!-- 坚持不懈活动详情 弹窗 -->
		<sales-activity-popup ref="salesActivityPopup" 
		:data="unremittinglyVO" 
		@submit="openApp"></sales-activity-popup>
		

	</view>
</template>

<script>
	import salesActivityPopup from './sales-activity-popup/sales-activity-popup.vue';
	import config from '../../utils/config.js';
	export default {
		components: { salesActivityPopup },
		data() {
			return {
				linkType: undefined,
				userId: undefined,
				unremittinglyVO: {}
			}
		},
		onLoad(option) {
			this.linkType = option.linkType;
			this.userId = option.userId;
		},
		methods: {
			/** 查询坚持不懈
			 * @param {Object} page
			 * @param {Object} pageSize
			 * @param {Object} callback
			 */
			onLoadUnremittingly(page, pageSize, callback){
				this.$http.get('/unremittingly/queryPage',{page:page, size:pageSize},true).then(res=>{
					callback(res);
				}).catch( err => {
					callback(null);
				})
			},
			
			/**
			 * 打开参与拼团的弹窗
			 * @param {Object} groupBuyId 组团优惠ID
			 */
			submitUnremittingly(unremittinglyId){
				// 查询活动详情
				this.$http
					.get('/unremittingly/queryInfo', {unremittinglyId: unremittinglyId}, true)
					.then(res => {
						this.unremittinglyVO = res;
						this.$refs.salesActivityPopup.open();
					});	
			},
			
			/**
			 * 打开App
			 */
			openApp(){
				let url = `${config.copyUrl}?linkType=${this.linkType}&userId=${this.userId}`;
				let shareMsg = `推荐一个超划算的活动给你：${url}`;
				this.$tool.openApp(shareMsg)
			}
		}
	}
</script>

<style lang="scss">
//坚持不懈
.insist-lists-item {
	display: flex;
	position: relative;
	margin: 20rpx;
	padding: 32rpx 24rpx;
	font-weight: bold;
	background-color: #ffeaea;
	border-radius: 20rpx;
	z-index: 1;
	&::after{
		content: '';
		position: absolute;
		bottom: -5rpx;
		left: 50%;
		width: 160rpx;
		height: 100rpx;
		background-image: url(../../static/images/gift.png);
		background-repeat: no-repeat;
		background-size: 100%;
		z-index: -1;
	}
	.flex-column {
		flex: 1;
		justify-content: space-between;
	}
	.name {
		font-size: 28rpx;
	}
	.price {
		margin-top: 40rpx;
		color: #ff6e6e;
	}
	.btn {
		align-self: center;
		margin: 0 0 0 10rpx;
		padding: 0 28rpx;
		height: 56rpx;
		font-size: 26rpx;
		line-height: 56rpx;
		color: #ffffff;
		background-color: #222222;
		border-radius: 32rpx;
		&.disable {
			background-color: #cccccc;
		}
	}
}
</style>
