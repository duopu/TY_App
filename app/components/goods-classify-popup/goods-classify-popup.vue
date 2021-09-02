<!-- 商品-属性分类 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<view class="popup-content">
				<view class="flex">
					<image class="avatar-image" mode="aspectFill" :src="goodsThumbnail"></image>
					<view class="flex-center">
						<view class="price" v-if="priceArry.length>0">
							<text class="unit">¥</text>
							{{priceArry[0]}}
						</view>
						<text v-if="priceArry.length > 1" class="line">-</text>
						<view v-if="priceArry.length > 1" class="price">
							<text class="unit">¥</text>
							{{priceArry[1]}}
						</view>
					</view>
				</view>
				<!-- 属性分类 -->
				<view class="title text-bold">属性分类</view>
				<view class="lists">
					<view v-for="(item,index) in goodsAttributesVOList" 
					:key="`goodsAttr-${index}`" 
					class="item" 
					:class="{'on':selectItem.attributesId === item.attributesId}" 
					@click="itemClick(item)">{{item.attributesName}}</view>
				</view>
				<!-- 数量 -->
				<view class="title text-bold">数量</view>
				<uni-number-box class="com-nunmber-box" v-model="count" :min="0"></uni-number-box>
			</view>
			<!-- 底部 -->
			<view class="popup-bottom">
				<button class="btn btn-block" @click="submit()">{{popType === 1 ? '确定' : '立即购买'}}</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'goods-classify-popup',
	emits:['submit'],
	props: {
		goodsInfo:{ //商品信息
			type:Object,
			required:true
		},
		type:{ // 当前弹窗类型  1加入购物车  2立即购买
			type:Number,
			default:1
		}
	},
	data() {
		return {
			goodsAttributesVOList:this.data,
			goodsThumbnail:this.thumbnail,
			selectItem:{}, //当前选中的商品属性
			count:1, //商品数量
			priceArry:[], //显示价格区间
			popType:this.type //当前弹窗类型
		};
	},
	watch:{
		goodsInfo(newV,oldV){
			this.goodsAttributesVOList = newV.goodsAttributesVOList || [];
			this.goodsThumbnail = newV.thumbnail;
			if(newV.minPrice && newV.maxPrice && newV.minPrice!== newV.maxPrice ){
				this.priceArry = [newV.minPrice, newV.maxPrice];
			}else {
				this.priceArry = [newV.price]
			}
		},
		type(newV,oldV){
			this.popType = newV;
		}
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
		/** 商品属性类型点击
		 * @param {Object} item
		 */
		itemClick(item){
			this.selectItem = item;
			this.priceArry = [item.price];
		},
		
		/**
		 * 提交按钮点击
		 */
		submit(){
			if(this.selectItem.attributesId && this.count > 0){
				this.$emit("submit",{goodsAttributes:this.selectItem, count:this.count})
				this.close();
			}else {
				this.$tool.showToast("请选择商品属性");
			}
			
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
