<template>
	<view class="star-rate-box">
		<checked-start :number="100" v-for="count in fullSize"></checked-start>
		<checked-start v-if="floatNumber > 0" :number="floatNumber"></checked-start>
		<checked-start :number="0" v-for="count in emptySize"></checked-start>
	</view>
</template>

<script>
	import CheckedStart from './checked-start.vue';
	export default {
		name:"rate",
		components:{CheckedStart},
		props: {
			number: { //评分  支持小数
				type: Number,
				default: 0
			},
			max: { //最大分值
				type: Number,
				default: 5
			}
		},
		data() {
			return {
				fullSize: 0,//满星个数
				emptySize: 0, //无星个数
				floatNumber: 0 //当前评分小数点的分值
			};
		},
		created(){
			this.fullSize = Math.trunc(this.number); //取评分的整数部分
			if(this.fullSize !== this.number){ //如果评分带小数
				this.floatNumber = (this.number.toFixed(2) - this.fullSize) * 100; //取评分小数部分
			}
			this.emptySize = this.floatNumber > 0 ? this.max - this.fullSize - 1 : this.max - this.fullSize;
		}
	}
</script>

<style lang="less" scoped>
.star-rate-box {
	display: flex;
	flex-direction: row;
}
</style>
