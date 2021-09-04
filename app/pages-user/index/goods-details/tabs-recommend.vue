<template>
	<view class="tabs-recommend" :style="{ height: scrollHeight + 'px' }">
		<my-scroll-view
		:refreshEnable="false"
		@loadData="onLoadRecommendData" 
		>
			<template v-slot:list="slotProps">
				<course-lists-item v-for="(item, index) in slotProps.list"
				:key="`goods-recommend-${index}`" 
				:data="item" 
				@itemClick="courseClick(item)"></course-lists-item>
			</template>
		</my-scroll-view>
	</view>
	
</template>

<script>
export default {
	name: 'tabsRecommend',
	props:{
		goodsBottomHeight:{ //商品详情页底部购物车工具条高度
			type:Number,
			default:0
		},
		tabsHeight:{ //TAB栏目高度
			type:Number,
			default:0
		}
	},
	data(){
		return {
			bottomHeight:this.goodsBottomHeight,
			tabbarHeight:this.tabsHeight,
			scrollHeight:0
		}
	},
	watch:{
		goodsBottomHeight(newV, oldV){
			this.bottomHeight = newV;
			this.getRecommendContentHeight();
		},
			
		tabsHeight(newV, oldV){
			this.tabbarHeight = newV;
			this.getRecommendContentHeight();
		}
	},
	created() {
		this.getRecommendContentHeight();
	},
	methods:{
		
		// 获取商品详情页去掉底部购物车工具类高度后的内容高度
		getRecommendContentHeight(){
			let that = this;
			uni.getSystemInfo({
			    success: function (res) {
					that.scrollHeight = res.windowHeight - that.bottomHeight - that.tabbarHeight;
					that.$store.commit("changeGoodsDetailsHeight");
			    }
			});
		},
		
		/**
		 * 查询推荐商品
		 * @param {Object} page  当前页码
		 * @param {Object} pageSize
		 * @param {Object} callback
		 */
		onLoadRecommendData(page, pageSize, callback){
			this.$http.get('/goods/queryRecommend',{page:page, size:pageSize},true).then(res=>{
				callback(res);
			}).catch( err => {
				callback(null);
			})
		},
		
		/**
		 * 课程点击
		 * @param {Object} item
		 */
		courseClick(item){
			uni.navigateTo({
				url: `/pages-user/index/goods-details/goods-details?goodsId=${item.goodsId}`,
			});
		}
	}
};
</script>

<style lang="less" scoped>
.tabs-recommend {
	padding: 0 20rpx;
	background-color: #ffffff;
}
</style>
