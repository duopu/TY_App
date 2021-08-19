<template>
	<view class="careers-page">
		<view class="tabs fl aln">
			<view class="tab">
				<view class="">
					推荐
				</view>
			</view>
			<view class="tab">
				<view class="">
					活动
				</view>
			</view>
			<view class="tab act">
				<view class="">
					高新转行
				</view>
				<image class="underline" src="../../assets/imgs/login/underline.png" mode=""></image>
			</view>
			<view class="tab">
				<view class="">
					认证
				</view>
			</view>
			<view class="tab">
				<view class="">
					提升
				</view>
			</view>
			<view class="tab">
				<view class="">
					好物
				</view>
			</view>
		</view>
		<view class="bea mt20">
			<view class="item fl aln bet" v-for="index in 3" :key='index'>
				<image class="preview" src="../../assets/imgs/index/avatar.jpg" mode=""></image>
				<view class="info">
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
</template>

<script>
</script>

<style lang="less">
	.careers-page {
		padding: 24upx 20upx;

		.head {
			margin-bottom: 20upx;

			.lf {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.shul {
					width: 2upx;
					height: 24upx;
					background-color: #FFB55B;
					margin: 0 16upx;
				}

				.slogn {
					color: #FFB55B;
					font-size: 26upx;
				}
			}

			.head-icon {
				width: 40upx;
				height: 40upx;
				margin: 0 12upx;
			}
		}

		.tech {
			width: 208upx;
			height: 42upx;
		}

		.tabs {
			flex-wrap: wrap;

			.tab {
				margin-right: 48upx;
				color: #666666;
				font-size: 26upx;
				position: relative;
			}

			.act {
				color: #000000;
				font-size: 32upx;
				font-weight: bold;
			}

			.underline {
				width: 20upx;
				height: 6upx;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				margin-top: 10upx;
			}
		}

		.bea {
			.item {
				padding: 24upx 0;

				.preview {
					width: 240upx;
					height: 160upx;
					border-radius: 20upx;
				}

				.info {
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
