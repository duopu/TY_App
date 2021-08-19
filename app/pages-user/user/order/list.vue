<template>
	<view class="order-page ">

		<view class="bgw">
			<view class="pdhead">

				<view class="head bflex bgw">
					<input class="search-input" confirm-type="search" type="text" value="" />
					<view class="search-btn" @click="searched = 1;">
						搜索
					</view>
				</view>
			</view>



			<view class="bigtabs fl ard aln">
				<view class="tab" :class="tab == 1?'act':''" @click="tabChange(1)">
					<view class="">
						待付款
					</view>
					<image v-if="tab == 1" class="underline" src="../../../assets/imgs/login/underline.png" mode="">
					</image>
				</view>
				<view class="tab" :class="tab == 2?'act':''" @click="tabChange(2)">
					<view class="">
						待发货
					</view>
					<image v-if="tab == 2" class="underline" src="../../../assets/imgs/login/underline.png" mode="">
					</image>
				</view>
				<view class="tab" :class="tab == 3?'act':''" @click="tabChange(3)">
					<view class="">
						待收货
					</view>
					<image v-if="tab == 3" class="underline" src="../../../assets/imgs/login/underline.png" mode="">
					</image>
				</view>
				<view class="tab" :class="tab == 4?'act':''" @click="tabChange(4)">
					<view class="">
						已完成
					</view>
					<image v-if="tab == 4" class="underline" src="../../../assets/imgs/login/underline.png" mode="">
					</image>
				</view>
			</view>
		</view>

		<view class="orders pdhead">
			<view class="card bgw" v-for="item in 4" :key='item'>
				<view class="cardhead bflex bet">
					<view class="name">
						XX上架
						<!-- <uni-badge is-dot text="1" type='error'></uni-badge> -->
					</view>
					<view class="time">
						待发货
					</view>
				</view>
				<view class="bea">
					<view class="item fl bet">
						<image class="preview" src="../../../assets/imgs/index/smbanner.png" mode=""></image>
						<view class="info">
							<view class="title">
								幼儿美术基础(免费特级/少儿美术/儿童绘画/随到随学)
							</view>
							<view class="tags fl ">
								<view class="tag" v-for="i in 6" :key='i'>
									型号一
								</view>
							</view>
							<view class="bottom fl aln bet">
								<view class="price">
									￥500
								</view>
								<view class="desc">
									x1
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cardbottom pt20 fl aln flend">
					<view class="btn cancel">
						取消订单
					</view>
					<view class="btn pay">
						支付订单
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
				tab: 1,
			};
		},
		methods: {
			tabChange(f) {
				this.tab = f;
			}
		}
	}
</script>

<style lang="less">
	@import url('../../../assets/css/order.less');

	page {
		background-color: #F8F8F8;
	}
</style>
