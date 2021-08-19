<template>
	<view class="news-page">


		<view class="item">
			<view class="title">
				华为自动驾驶实力超特斯拉？优势和困局都很明显
			</view>
			<view class="bottom bflex">
				<view class="fl aln">
					<image class="avatar" src="../../assets/imgs/index/avatar.jpg" mode=""></image>
					<view class="name">
						商家有山
					</view>
				</view>
				<view class="fl aln">
					<image class="eye" src="../../assets/imgs/index/eye.png" mode=""></image>
					<view class="nums">
						28267
					</view>
					<view class="">
						2021-10-10
					</view>
				</view>
			</view>
		</view>

		<view class="info">
			一路“象”北还在继续。

			6月2日21时55分，象群继续向北迁移，进入昆明市晋宁区双河乡，目前位于双河乡火草坝附近。

			云南发布消息，云南省林草局协调无人机监测团队、应急处置团队、亚洲象专家全部转场，提前研判和通报迁移线路，指导当地全面开展布防工作，要求高度警醒、高度戒备、全力防控，切实保障人象安全。

			对一路“象”北的象群，人们纷纷好奇，它们究竟要去哪里？还要向北走多远呢？
		</view>


		<view class="news">

			<view class="title">
				相关文章
			</view>
			<view class="item" v-for="index in 6" :key='index'>
				<view class="title">
					华为自动驾驶实力超特斯拉？优势和困局都很明显
				</view>
				<view class="bottom bflex">
					<view class="fl aln">
						<image class="avatar" src="../../assets/imgs/index/avatar.jpg" mode=""></image>
						<view class="name">
							商家有山
						</view>
					</view>
					<view class="fl aln">
						<image class="eye" src="../../assets/imgs/index/eye.png" mode=""></image>
						<view class="nums">
							28267
						</view>
						<view class="">
							2021-10-10
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
	.news-page {
		padding: 24upx 20upx;

		.news {
			margin-top: 30upx;

			.item {
				border-bottom: 1px solid #DFE0E6;
			}

			.title {
				font-size: 30upx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #222222;
			}

		}

		.info {
			font-size: 26upx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #222222;
			line-height: 36px;
			border-bottom: 1px solid #DFE0E6;
			padding-bottom: 20upx;
		}

		.item {
			padding: 22upx 0;

			.title {
				color: #222222;
				font-size: 28upx;
				font-weight: bold;
			}

			.bottom {
				margin-top: 40upx;

				.avatar {
					width: 72upx;
					height: 72upx;
					border-radius: 72upx;
					margin-right: 16upx;
				}

				.name {
					color: #222222;
					font-size: 26upx;
				}

				.eye {
					width: 48upx;
					height: 48upx;
				}

				.nums {
					margin: 0 26upx 0 8upx;
				}
			}
		}
	}
</style>
