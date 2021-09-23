<!-- 优惠券-选择商品-包含资源 -->
<template>
	<uni-popup class="popup" ref="popup" type="top" :safeArea="false" @change="onChangePopup">
		<view class="checkbox-list flex-center">
			<view class="checkbox-item flex-center-center" :class="{on:index === 0}" v-for="(item,index) in data" :key="index">{{item}}</view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		name:"business-goods-resource-popup",
		data() {
			return {
				data:['课程','实体商品','题库','考试认证','题库','考试认证']
			};
		},
		methods:{
			// 打开弹窗
			open(){
				this.$refs.popup.open();
			},
			// 关闭弹窗
			close(){
				this.$refs.popup.close();
			},
			// 弹窗 change valueObject[show,type]
			onChangePopup(valueObject){
				this.$emit('change',valueObject.show)
			}
		}
	}
</script>

<style src="./style.less" scoped lang="less"></style>
