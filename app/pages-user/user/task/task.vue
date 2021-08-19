<template>
	<view class="task-page">
		<view class="head">
			<view class="btn">
				<image src="../../../assets/imgs/task/btn.png" mode=""></image>
			</view>
			<view class="coins">
				<image src="../../../assets/imgs/task/task_coin.png" mode=""></image>
				<view class="">
					500
				</view>
			</view>
		</view>
		<view class="content">
			<view class="calendar">
				<view class="title">
					连续签到 <text class="count">3天</text>
				</view>
				<view class="subtitle">
					连续7天签到有惊喜
				</view>
				<view class="times">
					<view class="time">
						<image class="bg" src="../../../assets/imgs/task/task_base_coin.png" mode=""></image>
						<view class="num">
							29
						</view>
					</view>
					<view class="time">
						<image class="bg" src="../../../assets/imgs/task/task_base_coin.png" mode=""></image>
						<view class="num">
							30
						</view>
					</view>
					<view class="time">
						<image class="bg" src="../../../assets/imgs/task/task_base_coin.png" mode=""></image>
						<view class="num">
							1
						</view>
					</view>
					<view class="time">
						<image class="bg" src="../../../assets/imgs/task/task_bg_coin.png" mode=""></image>
						<view class="num">
						</view>
					</view>
					<view class="time">
						<image class="bg" src="../../../assets/imgs/task/task_bg_coin.png" mode=""></image>
						<view class="num">
						</view>
					</view>
					<view class="time">
						<image class="bg" src="../../../assets/imgs/task/task_bg_coin.png" mode=""></image>
						<view class="num">
						</view>
					</view>
					<view class="time">
						<image class="bg" src="../../../assets/imgs/task/gift.png" mode=""></image>
						<view class="num">
						</view>
					</view>
				</view>
			</view>
			<view class="calendar mgt">
				<view class="title">
					每日任务
				</view>
				<view class="items">
					<view class="item bet aln" v-for="i in 4" :key='i'>
						<view class="">
							<view class="p1 fl aln">
								<view class="item-title">
									学习100分钟
								</view>
								<view class="tip-btn">
									<image class="btn_coin" src="../../../assets/imgs/task/task_coin.png" mode="">
									</image>
									<text>+100</text>
								</view>
							</view>
							<view class="process">
								今天已完成: 10/100
							</view>
						</view>
						<view class="btn">
							去完成
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

			};
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F8F8F8;
	}

	.task-page {
		.head {
			background-image: url("../../../assets/imgs/task/task_bg.png");
			background-size: 100% 100%;
			background-repeat: no-repeat;
			height: 400upx;
			padding-top: 164upx;
			position: relative;

			.btn {
				width: 208upx;
				height: 208upx;
				position: relative;
				left: 50%;
				transform: translateX(-50%);

				image {
					width: 100%;
					height: 100%;
				}
			}

			.coins {
				position: absolute;
				top: 48upx;
				right: 44upx;
				display: flex;
				align-items: center;
				border: 1upx solid #867BAE;
				padding: 12upx 20upx;
				border-radius: 40upx;
				color: #fff;
				font-size: 36upx;
				font-weight: bold;

				image {
					width: 48upx;
					height: 48upx;
					margin-right: 16upx;
				}
			}
		}

		.content {
			padding: 0 20upx;
			top: -140upx;
			position: relative;
			z-index: 9;

			.calendar {
				background-color: #fff;
				padding: 30upx 24upx 40upx 24upx;
				border-radius: 20upx;

				.title {
					font-weight: bold;
					font-size: 30upx;

					.count {
						color: #8576B0;
						margin-left: 10upx;
					}
				}

				.subtitle {
					color: #999999;
					font-size: 24upx;
					margin-top: 10upx;
				}

				.times {
					margin-top: 40upx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.time {
						width: 64upx;
						height: 64upx;
						position: relative;

						image {
							width: 100%;
							height: 100%;
							position: absolute;
						}

						.num {
							position: relative;
							z-index: 9;
							color: #fff;
							font-size: 26upx;
							text-align: center;
							line-height: 64upx;
						}
					}
				}
			}

			.mgt {
				margin-top: 20upx;
			}

			.items {
				margin-top: 40upx;
			}

			.item {
				margin-top: 40upx;
				display: flex;

				.btn_coin {
					width: 32upx;
					height: 32upx;
				}

				.p1 {
					padding: 22upx 0;

					.item-title {
						color: #222;
						font-size: 28upx;
						font-weight: 600;

					}

					.tip-btn {
						background: #FBE4DE;
						border-radius: 8upx;
						height: 40upx;
						display: flex;
						align-items: center;
						padding: 4upx 16upx;
						margin-left: 40upx;
					}
				}

				.process {
					color: #666666;
					font-size: 26upx;
				}

				.btn {
					height: 56upx;
					background: #D8D8D8;
					width: 144upx;
					text-align: center;
					line-height: 56upx;
					border-radius: 56upx;
					font-weight: 600;
					color: #fff;
					background: linear-gradient(to bottom, #FFA690, #EF7354);
				}

				&:nth-child(2n) {
					.btn {
						background: linear-gradient(to bottom, #FFEB92, #FCC43A);
					}
				}
			}
		}
	}
</style>
