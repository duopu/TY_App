<!-- 分销活动详情弹窗 -->
<template>
	<uni-popup class="popup" ref="popup" type="bottom" :safeArea="false">
		<view class="popup-main">
			<view class="title text-bold">
				活动详情
				<image @click="close()" class="icon-close" src="../../static/images/icons/icon-cha.svg" mode="aspectFill"></image>
			</view>
			<view class="row">
				<text class="label text-bold">活动名称：</text>
				<text>{{unremittinglyVO.unremittinglyName}}</text>
			</view>
			<view class="row">
				<text class="label text-bold">活动时间：</text>
				<text class="color-6">{{unremittinglyVO.startTime}}-{{unremittinglyVO.endTime}}</text>
			</view>
			<view class="row">
				<text class="label text-bold">活动规则：</text>
				<text class="color-6">{{unremittinglyVO.content}}</text>
			</view>
			<view class="row">
				<text class="label text-bold">活动奖品：</text>
				<text>{{unremittinglyVO.goodsName}}</text>
			</view>
			<view v-if="showBottom" class="row no-border flex-center-between">
				<input v-if="unremittinglyVO.unremittinglyNumberFlag === 1" class="input" type="text" placeholder="请输入活动号" placeholder-class="input-placeholder" v-model="unremittinglyVO.unremittinglyNumber">
				<button class="btn-block" @click="submit">立即参加</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'sales-activity-popup',
	emits: ['submit'],
	props: {
		data: {
			type: Object,
			default: {
				activityPrice: 0,
				content: undefined,
				endTime: undefined,
				goodsId: undefined,
				goodsName: undefined,
				joinFlag: 1,
				startTime: undefined,
				unremittinglyId: undefined,
				unremittinglyName: undefined,
				unremittinglyNumber: undefined,
				unremittinglyNumberFlag: 0
			}
		},
		showBottom: { //是否显示底部操作功能
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			unremittinglyVO:this.data
		};
	},
	watch: {
		data(newV, oldV){
			this.unremittinglyVO = newV;
		}
	},
	methods:{
		// 打开弹窗
		open() {
			this.$refs.popup.open();
		},
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		},
		submit(){
			if(this.unremittinglyVO.unremittinglyNumberFlag === 1 && (this.unremittinglyVO.unremittinglyNumber === undefined || this.unremittinglyVO.unremittinglyNumber.length === 0)){
				this.$tool.showToast("请输入活动号");
				return
			}
			this.$emit('submit',this.unremittinglyVO);
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
