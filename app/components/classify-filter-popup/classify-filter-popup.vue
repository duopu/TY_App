<!-- 综合排序 -->
<template>
	<uni-popup ref="popup" type="right" :safeArea="false" @change="onChangePopup">
		<view class="popup-content">
			<!-- 滚动 -->
			<scroll-view class="lists-wrapper" scroll-y="true">
				<view class="title text-bold">资源类型</view>
				<view class="horizontal-lists">
					<view class="item" 
					:class="{'on':form.resourceType === item.value}" 
					v-for="(item,index) in resourceTypeList" 
					:key="`resource-type-${index}`" 
					@click="tagClick(item.value, 'resourceType')">{{item.name}}</view>
				</view>
				<view class="title text-bold">课程形式</view>
				<view class="horizontal-lists">
					<view class="item"
					:class="{'on':form.type === item.value}" 
					v-for="(item,index) in typeList" 
					:key="`type-${index}`" 
					@click="tagClick(item.value, 'type')">{{item.name}}</view>
				</view>
				<view class="title text-bold">价格区间</view>
				<view class="flex-center input-area">
					<input class="input" 
					type="digit" 
					placeholder="最低价" 
					placeholder-class="input-placeholder" 
					v-model="form.minPrice">
					<view class="space-line">～</view>
					<input class="input" 
					type="digit" 
					placeholder="最高价" 
					placeholder-class="input-placeholder" 
					v-model="form.maxPrice">
				</view>
			</scroll-view>
			<!-- 底部 -->
			<view class="btn-bottom">
				<button class="btn-light btn" @click="clean()">清空筛选</button>
				<button class="btn-block btn" @click="sumbit()">确定</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'classify-filter-popup',
	emits: ['submit'],
	data() {
		return {
			show: false,
			resourceTypeList:[
				{name:"课程",value:1},
				{name:"题库",value:2},
				{name:"实体商品",value:3},
				{name:"考试认证",value:4}
			],
			typeList:[
				{name:"线上直播",value:3},
				{name:"线下",value:2},
				{name:"录播",value:1}
			],
			mechanismTypeList:[
				{name:"企业",value:2},
				{name:"官方",value:3},
				{name:"个人",value:1},
			],
			form:{
				resourceType:undefined,
				type:undefined,
				maxPrice:undefined,
				minPrice:undefined,
				mechanismType:undefined
			}
		};
	},
	methods: {
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		},
		// 打开弹窗
		open() {
			this.$refs.popup.open();
		},
		toggle() {
			this.show ? this.close() : this.open();
		},
		// 获取当前弹窗状态
		onChangePopup(e) {
			this.show = e.show;
		},
		
		
		/** 筛选标签点击事件
		 * @param {Object} value
		 * @param {Object} type
		 */
		tagClick(value, type){
			this.form[type] = value;
		},
		
		/**
		 * 清空筛选
		 */
		clean(){
			this.form = {
				resourceType:undefined,
				type:undefined,
				maxPrice:'',
				minPrice:'',
				mechanismType:undefined
			}
		},
		
		/**
		 * 提交
		 */
		sumbit(){
			
			var minPriceFlag = false, maxPriceFlag = false;
			if(this.form.minPrice && this.form.minPrice.length > 0){
				this.form.minPrice = parseFloat(this.form.minPrice);
				minPriceFlag = true;
			}
			if(this.form.maxPrice && this.form.maxPrice.length > 0){
				this.form.maxPrice = parseFloat(this.form.maxPrice);
				maxPriceFlag = true;
			}
			
			if((minPriceFlag && !maxPriceFlag) || (!minPriceFlag && maxPriceFlag)) {
				this.$tool.showToast("请完善价格区间");
				return;
			}
			
			if(this.form.minPrice > this.form.maxPrice){
				this.$tool.showToast("请输入正确的价格区间");
				return;
			}
			console.log('筛选条件',this.form);
			this.$emit("submit",this.form);
			this.close();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
