<template>
	<view class="settlement-page">
		<view class="local bgw bflex">
			<view class="fl aln">
				<image class="icon" src="../../../assets/imgs/shop/local.png" mode=""></image>
				<view class="md">
					<view class="name fs28">
						李梅梅 138****4762
					</view>
					<view class="add">
						江苏省徐州市江湾区江湾区街道绿色华府中心
						西苑3栋1103室
					</view>
				</view>
			</view>
			<view class="">
				<image class="more" src="../../../assets/imgs/index/more.png" mode=""></image>
			</view>
		</view>

		<view class="info-card bgw mt20">
			<view class="card">
				<view class="head bflex bet">
					<view class="name">
						XX上架
						<!-- <uni-badge is-dot text="1" type='error'></uni-badge> -->
					</view>
					<view class="time">
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
			</view>
		</view>
		<view class="bgw mt20 info-card pd24">
			<view class="list fs28 fbolder fl aln bet">
				<view class="lb">
					商品原价
				</view>
				<view class="">
					¥500
				</view>
			</view>

			<view class="list fs28 fl aln bet">
				<view class="lb" style="font-weight: bolder;">
					平台优惠
				</view>
				<view class="" style="font-weight: 300;">
					¥500
				</view>
			</view>

			<view class="list fs28 fl aln bet">
				<view class="lb" style="font-weight: bolder;">
					实际支付
				</view>
				<view class="" style="font-weight: 300;">
					¥500
				</view>
			</view>
			<view class="list">
				<label>
					<checkbox :value="1" /><text>同意<text class="colorblue">《腾云课堂服务协议》</text></text>
				</label>
			</view>
			<view class="list">
				<label>
					<checkbox :value="1" /><text>同意将您的联系方式告知服务商</text>
				</label>
			</view>
		</view>
		<view class="bottom-blank">
			
		</view>
		<view class="bottom-group bgw bflex">
			<view class="bflex">
				<view class="fs28">
					合计
				</view>
				<view class="price fs40">
					￥179.0
				</view>
			</view>
			<view class="bottom-btn">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F8F8F8;
	}

	.settlement-page {
		padding: 24upx;

		.info-card {
			border-radius: 20upx;

			.card {
				padding: 32upx 24upx;
				margin-bottom: 20upx;

				.head {
					border-bottom: 1upx solid #DFE0E6;
					padding-bottom: 32upx;

					.name {
						color: #222222;
						font-size: 30upx;
						font-weight: 600;

						.uni-badge--x {
							margin-left: 16upx;
						}
					}

					.time {
						color: #666666;
						font-size: 26upx;
					}
				}

				.bea {
					.item {
						padding: 24upx 0;
						border-bottom: 1upx solid #DFE0E6;

						&:last-child {
							border-bottom: none;
						}

						.preview {
							width: 240upx;
							height: 160upx;
							border-radius: 20upx;
						}

						.info {
							width: 430upx;
							// height: 160upx;
							position: relative;
							padding-left: 20upx;

							.title {
								font-weight: 600;
								color: #222222;
								font-size: 28upx;
							}

							.tags {
								margin: 20upx 0;
								flex-wrap: wrap;

								.tag {
									background-color: #F4F5F9;
									margin: 0 16upx 16upx 0;
									color: #222222;
									font-size: 24upx;
									padding: 8upx 16upx;
									border-radius: 2upx;
								}
							}

							.bottom {
								// position: absolute;
								// bottom: 0;
								width: 100%;

								.price {
									color: #FF705B;
									font-size: 34upx;
									font-weight: bold;
									margin-right: 20upx;
								}

								.desc {
									font-size: 24upx;
									color: #222222;
								}
							}
						}
					}
				}
			}
		}

		.list {
			padding: 24upx 0upx;

			.lb {
				font-weight: bolder;
			}
		}

		.local {
			padding: 24upx;
			border-radius: 20upx;

			.icon {
				width: 40upx;
				height: 40upx;
				margin-right: 24upx;
			}

			.md {
				width: 520upx;

				.add {
					color: #999999;
					margin-top: 10upx;
				}
			}

			.more {
				width: 32upx;
				height: 32upx;
			}
		}
		.bottom-group {
			.bottom-btn {
				color: #fff;
				background-color: #FF705B;
				padding: 12upx 44upx;
				border-radius: 50upx;
			}
		}
	}
</style>
