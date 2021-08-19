<template>
	<view class="message">
		<view class="tabs fl aln ard">
			<view class="tab act">
				站内消息
				<uni-badge text="1" type='error'></uni-badge>
			</view>
			<view class="tab">
				系统通知
			</view>
		</view>
		<view class="content">
			<!-- <view class="search">
				<image src="../../../assets/imgs/message/search.png" mode=""></image>
				<input type="text" value="" placeholder="搜索商家名称/聊天记录" />
			</view> -->

			<view class="cards">
				<view class="card" v-for="i in 6" :key='i'>
					<view class="head bflex bet">
						<view class="name">
							XX上架 <uni-badge is-dot text="1" type='error'></uni-badge>
						</view>
						<view class="time">
							2020-12-21 06:45:00
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
	@import url("../../../assets/css/message.less");
</style>
