<!-- 物流弹窗 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main flex-column-between">
			<!-- 标题 -->
			<view class="title text-bold">
				物流跟踪
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<scroll-view scroll-y="true" class="lists flex-1">
				<view class="item flex" :class="{ on: index === 0 }" v-for="(item, index) in logisticsVO.logisticsData || []" :key="`logistics-${index}`">
					<text class="circle"></text>
					<view class="flex-1 text">{{ item.context }}</view>
					<view class="time">{{ item.time }}</view>
				</view>
			</scroll-view>
			<!-- 底部 -->
			<view class="flex-center-between popup-bottom"><button class="btn flex-1" @click="close()">确定</button></view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'order-logistic-popup',
	props: {
		data: {
			type: Object,
			default: {
				address: undefined,
				isCheck: 0,
				mobile: undefined,
				name: undefined,
				orderNum: undefined,
				logisticsData: []
			}
		}
	},
	data() {
		return {
			logisticsVO: this.data
		};
	},
	watch: {
		data(newV, oldV){
			this.logisticsVO = newV;
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
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
