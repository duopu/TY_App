<template>
	<view class="shop-page pd24">
		<view class="shop_desc">
			<view class="shop_info" style="padding: 0;">
				<image class="avatar" src="../../../assets/imgs/index/girl.png" mode=""></image>
				<view class="shop_info_content">
					<view class="name fl bet">
						<view class="">
							店铺名称
						</view>
						<view>
							<image class="ico48 ico" src="../../../assets/imgs/shop/collect.png" mode=""></image>
							<image class="ico48 ico" src="../../../assets/imgs/shop/share.png" mode=""></image>
						</view>
						<!-- <image src="" mode=""></image> -->
					</view>
					<view class="desc">
						补充说明补充说明补充说明
					</view>
					<view class="bottom">
						<view class="ms">
							综合评分
						</view>
						<uni-rate :value="1.35" :size='14' :margin="10" />
						<view class="">
							1.35
						</view>
					</view>
				</view>
			</view>
		</view>


		<view class="tabs fl ard aln mt40">
			<view class="tab" :class="tab == 1?'act':''" @click="tabChange(1)">
				<view class="">
					推荐
				</view>
				<image v-if="tab == 1" class="underline" src="../../../assets/imgs/login/underline.png" mode=""></image>
			</view>
			<view class="tab" :class="tab == 2?'act':''" @click="tabChange(2)">
				<view class="">
					全部宝贝
				</view>
				<image v-if="tab == 2" class="underline" src="../../../assets/imgs/login/underline.png" mode=""></image>
			</view>
			<view class="tab" :class="tab == 3?'act':''" @click="tabChange(3)">
				<view class="">
					新品
				</view>
				<image v-if="tab == 3" class="underline" src="../../../assets/imgs/login/underline.png" mode=""></image>
			</view>
		</view>

		<view class="live mt40" v-if="tab == 1">
			<view class="head fl bet aln">
				<view class="lf">
					<view class="fl aln">
						<image class="zbsm" src="../../../assets/imgs/index/zbsm.png" mode=""></image>
						<view class="bold">
							大咖直播
						</view>
					</view>
					<view class="shul">

					</view>
					<view class="norm">
						很多大咖可更换
					</view>
				</view>

				<!-- 更多 -->
				<view class="fl aln">
					<view class="more-text">
						更多
					</view>
					<image class="more" src="../../../assets/imgs/index/more.png" mode=""></image>
				</view>
			</view>
			<view class="banner">
				<image src="../../../assets/imgs/index/live_img.png" mode=""></image>
			</view>
		</view>

		<!-- 精品课程 -->
		<view class="live kec" v-if="tab == 1">
			<view class="head fl bet aln">
				<view class="lf">
					<view class="fl aln">
						<image class="zbsm" src="../../../assets/imgs/index/kecm.png" mode=""></image>
						<view class="bold">
							精品课程
						</view>
					</view>
				</view>

				<!-- 更多 -->
				<view class="fl aln">
					<view class="more-text">
						更多
					</view>
					<image class="more" src="../../../assets/imgs/index/more.png" mode=""></image>
				</view>
			</view>

			<view class="bea">
				<view class="item fl aln bet" v-for="item in 3" :key='item'>
					<image class="preview" src="../../../assets/imgs/index/avatar.jpg" mode=""></image>
					<view class="info-bx">
						<view class="title">
							幼儿美术基础(免费特级/少儿美术/儿童绘画/随到随学)
						</view>
						<view class="bottom fl aln">
							<view class="price">
								￥500
							</view>
							<view class="desc">
								最近30人报名
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 全部宝贝 -->
		<view class="live kec mt20" v-if="tab == 2 || tab == 3">
			<view class="filter">
				<view class="tabs fl aln">
					<view class="tab">
						<view class="">
							综合排序
						</view>
						<image class="filter-icon" src="../../../assets/imgs/active/down.png" mode=""></image>
					</view>
					<view class="tab">
						<view class="">
							云计算
						</view>
					</view>
					<view class="tab">
						<view class="">
							筛选
						</view>
					</view>
				</view>
			</view>
			<view class="bea">
				<view class="item fl aln bet" v-for="item in 3" :key='item'>
					<image class="preview" src="../../../assets/imgs/index/avatar.jpg" mode=""></image>
					<view class="info-bx">
						<view class="title">
							幼儿美术基础(免费特级/少儿美术/儿童绘画/随到随学)
						</view>
						<view class="bottom fl aln">
							<view class="price">
								￥500
							</view>
							<view class="desc">
								最近30人报名
							</view>
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
				this.tab = f
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../assets/css/shop.less");
	@import url("../../../assets/css/classify.less");
	@import url("../../../assets/css/home.less");

	.shop-page {
		.bea {
			.item {
				padding: 24upx 0;

				.preview {
					width: 240upx;
					height: 160upx;
					border-radius: 20upx;
				}

				.info-bx {
					width: 430upx;
					height: 160upx;
					position: relative;
					padding-left: 20upx;

					.title {
						font-weight: 600;
						color: #222222;
						font-size: 28upx;
					}

					.bottom {
						position: absolute;
						bottom: 0;
						width: 100%;

						.price {
							color: #FF705B;
							font-size: 34upx;
							font-weight: bold;
							margin-right: 20upx;
						}

						.desc {
							font-size: 24upx;
							color: #666666;
						}
					}
				}
			}
		}
	}
</style>
