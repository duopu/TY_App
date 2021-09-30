<template>
	<view class="star-rate-box">
		
		<!-- 满星 -->
		<checked-start :number="100" 
		v-for="count in fullSize" 
		@click="startClick(count)"></checked-start>
		
		<!-- 半星 -->
		<checked-start v-if="floatNumber > 0" 
		:number="floatNumber" 
		@click="startClick(fullSize + 1)"></checked-start>
		
		<!-- 空星 -->
		<checked-start :number="0" 
		v-for="count in emptySize" 
		@click="startClick(fullSize + (floatNumber > 0 ? 1 : 0) + count)"></checked-start>
		
		<text class="number">{{fullSize + floatNumber}}</text>
	</view>
</template>

<script>
	import CheckedStart from './checked-start.vue';
	export default {
		name:"rate",
		components:{ CheckedStart },
		emits: ['change'],
		props: {
			number: { //评分  支持小数
				type: Number,
				default: 0
			},
			max: { //最大分值
				type: Number,
				default: 5
			},
			readonly: { //是否为只读状态
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				fullSize: 0,//满星个数
				emptySize: 0, //无星个数
				floatNumber: 0 //当前评分小数点的分值
			};
		},
		watch: {
			number(newV, oldV){
				this.initView(newV);
			}
		},
		created(){
			this.initView(this.number);
		},
		methods: {
			
			/**
			 * 初始化
			 * @param {Object} number 评分
			 */
			initView(number){
				this.fullSize = Math.trunc(number); //取评分的整数部分
				if(this.fullSize !== number){ //如果评分带小数
					this.floatNumber = (number.toFixed(2) - this.fullSize) * 100; //取评分小数部分
				}
				this.emptySize = this.floatNumber > 0 ? this.max - this.fullSize - 1 : this.max - this.fullSize;
			},
			
			// 星星被点击
			startClick(index){
				if(!this.readonly){
					this.initView(index);
					this.$emit('change',index);
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.star-rate-box {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.number {
	font-size: 28rpx;
	color: #FF9340;
	margin-left: 16rpx;
}
</style>
