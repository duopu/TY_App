<!-- 活动-分销大使-商品分销 -->
<template>
	<!-- data.status === 2 的时候，代表的是已取消的分销商品 -->
	<view class="sales-goods-lists-item">
		<view class="item-top">
			<view class="goods-image-box">
				<view class="cancel flex-column-center" v-if="data.status === 2">
					<image class="cancel-image" src="../../static/images/activity-cancel.png" mode="aspectFill"></image>
				</view>
				<image class="goods-image" :src="data.thumbnail" mode="aspectFill"></image>
			</view>
			<view class="right flex-column-between">
				<view class="name">{{ data.goodsName }}</view>
				<view class="flex-center-between">
					<view class="">售价:¥{{ data.entityGoodsCheck === 2 ? data.maxPrice : data.price }}</view>
					<view class="flex-center">
						预计佣金:
						<view class="price">
							{{ data.gold }}
							<text class="unit">金币</text>
						</view>
					</view>
				</view>
				<view class="flex-center process">
					<view class="process-item">
						<text class="number">{{ data.waitNum }}</text>
						等待下单
					</view>
					<view class="process-item">
						<text class="number">{{ data.waitRebateNum }}</text>
						等待返佣
					</view>
					<view class="process-item">
						<text class="number">{{ data.rebateNum }}</text>
						已返佣
					</view>
				</view>
			</view>
		</view>
		<view class="item-bottom flex-center-end">
			<!-- 这里只有状态是正常的商品分销，才显示下面的按钮 -->
			<button v-if="data.status === 1 && data.reviewStatus === 1" class="btn btn-border grey" @click="cancel">取消分销</button>
			<button v-if="data.status === 1 && data.reviewStatus === 2" class="btn btn-border black" @click="apply">重新申请</button>
			<button class=" btn btn-block" @click="openDetail">查看详情</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'sales-goods-lists-item',
	emits: ['openDetail', 'cancel', 'apply'],
	props: {
		data: {
			type: Object,
			required: true
		}
	},

	data() {
		return {};
	},
	methods: {
		// 查看详情
		openDetail() {
			this.$emit('openDetail');
		},
		// 取消分销
		cancel() {
			uni.showModal({
				title: '提示',
				content: '是否取消分销',
				confirmText: '确定',
				cancelText: '取消',
				success: res => {
					if (res.confirm) {
						this.apply();
					}
				}
			});
		},
		// 重新申请
		apply() {
			// this.$http
			// 	.post('/distribution/goodsApply', {goodsId:this.data.goodsId, storeId:this.data.storeId}, true)
			// 	.then(res => {
			// 		this.$store.commit('setOrderChange');
			// 	});
			this.$http.post('/distribution/operation', { id: this.data.id }, true).then(res => {
				this.$store.commit('setOrderChange');
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
