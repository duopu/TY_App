<!-- 综合排序 -->
<template>
	<uni-popup ref="popup" type="top" :safeArea="false" @change="onChangePopup">
		<view  class="popup-content">
			<scroll-view :scroll-y="true" class="sorts">
				<view class="sorts-content">
					<view class="sorts-column first">
						<view class="sorts-item" 
						:class="{'on':firstIndex === index}" 
						v-for="(item,index) in firstMenu" 
						:key="`first-${index}`" 
						@click="firstMenuClick(item,index)">{{item.name}}</view>
					</view>
					<view class="sorts-column">
						<view class="sorts-item" 
						:class="{'on':secondIndex === index}" 
						v-for="(item,index) in secondMenu[firstIndex]" 
						:key="`second-${index}`" 
						@click="secondMenuClick(item,index)">{{item.categoryName}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'classify-cloud-popup',
	emits: ['select'],
	props: {
	},
	data() {
		return {
			show: false,
			firstMenu:[
				{name:"全部",categoryId:undefined},
				{name:"我的兴趣",categoryId:undefined},
				{name:"热门分类",categoryId:undefined}
			],
			secondMenu:[[],[],[]],
			firstIndex:0,
			secondIndex:-1
		};
	},
	created() {
		this.getAllCategory();
	},
	methods: {
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		},
		// 关闭弹窗
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
		
		// 获取全部分类
		getAllCategory(){
			this.$http.get('/category/queryAll',{},true).then(res=>{
				
				var allTypeArray = [];
				res.categoryVOList && res.categoryVOList.map(value => {
					allTypeArray = allTypeArray.concat(value.nodes);
				});
				this.secondMenu[0] = allTypeArray;
				this.secondMenu[1] = res.interestCategoryVOList && res.interestCategoryVOList.map(value => {
					return {
						categoryId:value.categoryId,
						categoryName:value.interestName,
						img:value.img,
					}
				});
				this.secondMenu[2] = res.hotCategoryVOList || [];
				
				for(var i=0; i<res.categoryVOList.length; i++){
					var categoryVO = res.categoryVOList[i];
					this.firstMenu.push({name:categoryVO.categoryName,categoryId:categoryVO.categoryId});
					this.secondMenu[i+3] = categoryVO.nodes;
				}

			})
		},
		
		/** 第一列栏目 的点击事件
		 * @param {Object} item
		 * @param {Integer} index
		 */
		firstMenuClick(item,index){
			this.firstIndex = index;
		},
		
		
		/** 第二列栏目 的点击事件
		 * @param {Object} item
		 *  * @param {Integer} index
		 */
		secondMenuClick(item,index){
			this.secondIndex = index;
			this.$emit("select",item);
			this.close();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
