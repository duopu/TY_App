<!-- 商家订单的店铺列表项组件 -->
<template>
	<view class="store-order-lists-item">
		<!-- 商家 -->
		<view class="flex-center-between top">
			<view class="name">{{ storeGoodsVO.storeName }}</view>
		</view>

		<!-- 多个商品 -->
		<view class="flex-column" v-for="(item,index) in storeGoodsVO.orderItemList" :key="`goods-${index}`">
			<view class="content flex" @click="goodsClick">
				<image class="avatar-image" :src="item.thumbnail" mode="aspectFill"></image>
				<view class="flex-column flex-1 right">
					<view class="title">{{item.goodsName}}</view>
					<view class="tag"><view v-if="item.attributesId" class="tag-item">{{item.attributesName}}</view></view>
					<view class="flex-center-between">
						<view class="price">
							<text class="unit">¥</text>
							{{item.goodsPrice}}
						</view>
						<view class="number">×{{item.goodsNum}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'merchanism-order-lists-item',
	emits: ['goodsClick'],
	props: {
		storeGoodsVO: { //商品
			type: Object,
			required: true,
			default: {
				orderItemList:[{
					attributesId: undefined,
					attributesName: undefined,
					goodsPrice: 0,
					goodsId:undefined,
					goodsNum:0,
					goodsName:undefined,
					thumbnail:undefined,
					deliveryState:undefined, //发货状态 -1:无需发货 0:未发货 1:已发货 2：已收货
					examState:undefined //是否有电子凭证 0:无 1:有
				}],
				storeId:undefined,
				storeName:undefined,
				orderState: undefined
			}
		}
	},
	data() {
		return {};
	},
	methods: {
		// 商品点击
		goodsClick(){
			this.$emit("goodsClick");
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
