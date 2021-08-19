<template>
	<view class="message">
		<view class="tabs fl aln ard">
			<view class="tab" @click="typeChange(0)" :class="type == 0?'act': ''">
				站内消息
				<uni-badge text="1" type='error'></uni-badge>
			</view>
			<view class="tab" @click="typeChange(1)" :class="type == 1?'act': ''">
				系统通知
			</view>
		</view>
		<view class="content">

			<view v-if="type == 0">
				<view class="search">
					<image src="../../../assets/imgs/message/search.png" mode=""></image>
					<input type="text" value="" placeholder="搜索商家名称/聊天记录" />
				</view>
				<view class="items">
					<view class="item fl aln bet" v-for="i in 6" :key='i'>
						<view class="fl aln">
							<image class="avatar" src="../../../assets/imgs/index/girl.png" mode=""></image>
							<view class="c">
								<view class="ct">
									订单通知
								</view>
								<view class="cn">
									您在xx商家的订单下单成功！
								</view>
							</view>
						</view>
						<view class="r fl aln">
							<view class="time">
								2020-12-21
							</view>
							<uni-badge text="1" type='error'></uni-badge>
						</view>
					</view>
				</view>
			</view>


			<view v-else>
				<view class="items">
					<view class="item fl aln bet" v-for="i in 6" :key='i'>
						<view class="fl aln">
							<image class="avatar" src="../../../assets/imgs/index/girl.png" mode=""></image>
							<view class="c">
								<view class="ct">
									订单通知
								</view>
							</view>
						</view>
						<view class="r fl aln">
							<view class="time">
								2020-12-21
							</view>
							<uni-badge text="1" type='error'></uni-badge>
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
				type: 0,
			};
		},
		methods: {
			typeChange(f) {
				this.type = f
			}
		}
	}
</script>

<style lang="less">
	@import url("../../../assets/css/message.less");
</style>
