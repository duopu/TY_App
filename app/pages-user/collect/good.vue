<template>
	<view class="collect-page">


		<view class="bigtabs fl ard aln bgw">
			<view class="tab" :class="tab == 1?'act':''" @click="tabChange(1)">
				<view class="">
					商品收藏
				</view>
				<image v-if="tab == 1" class="underline" src="../../assets/imgs/login/underline.png" mode="">
				</image>
			</view>
			<view class="tab" :class="tab == 2?'act':''" @click="tabChange(2)">
				<view class="">
					店铺收藏
				</view>
				<image v-if="tab == 2" class="underline" src="../../assets/imgs/login/underline.png" mode="">
				</image>
			</view>
			<view class="tab" :class="tab == 3?'act':''" @click="tabChange(3)">
				<view class="">
					我的足迹
				</view>
				<image v-if="tab == 3" class="underline" src="../../assets/imgs/login/underline.png" mode="">
				</image>
			</view>
		</view>

		<view class="pdhead">

			<view class="goods">
				<view class="bea" v-if="tab == 1">
					<view class="item bgw fl aln bet mb20" v-for="item in 3" :key='item'>
						<image class="preview" src="../../assets/imgs/index/avatar.jpg" mode=""></image>
						<view class="info-bx">
							<view class="title">
								幼儿美术基础(免费特级/少儿美术/儿童绘画/随到随学)
							</view>
							<view class="bottom fl aln bet">
								<view class="fl aln">
									<image class="ico48" src="../../assets/imgs/course/shop.png" mode=""></image>
									商家平
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="shops" v-if="tab == 2">
				<view class="shop_info bgw mb20" v-for="item in 4" :key='item'>
					<image class="avatar" src="../../assets/imgs/index/girl.png" mode=""></image>
					<view class="shop_info_content">
						<view class="name">
							<view class="">
								店铺名称
							</view>
							<!-- <image src="" mode=""></image> -->
						</view>
						<view class="desc">
							补充说明
						</view>
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
				tab: 2
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
	@import url('../../assets/css/collect.less');

	page {
		background-color: #F8F8F8;
	}
</style>
