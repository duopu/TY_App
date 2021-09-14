<!-- 物流弹窗 -->
<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup-main">
			<!-- 标题 -->
			<view class="title text-bold">
				物流跟踪
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<view class="lists">
				<view class="item flex-center-between" :class="{ on: index === 0 }" v-for="(item, index) in logisticsVO.logisticsData || []" :key="`logistics-${index}`">
					<text class="circle"></text>
					<view class="flex-1">{{ item.context }}</view>
					<view class="time">{{ item.time }}</view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="flex-center-between popup-bottom"><button class="btn flex-1" @click="close()">确定</button></view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'order-logistic-popup',
	props: {
		orderNum: {
			type: String,
			default: undefined
		}
	},
	data() {
		return {
			logisticsVO: {
				logisticsData:[]
			}
		};
	},
	watch: {
		orderNum(newV, oldV){
			this.queryLogistics(newV);
		}
	},
	created(){
		this.queryLogistics(this.orderNum);
	},
	methods: {
		// 打开弹窗
		open() {
			this.$refs.popup.open();
		},
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		},
		
		/**
		 * 查询物流信息
		 * @param {Object} orderNum 订单编号
		 */
		queryLogistics(orderNum){
			if(!orderNum){
				return
			}
			this.$http
				.get('/order/logistics', {orderNum:orderNum}, true)
				.then(res => {
					this.logisticsVO = res;
				});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
