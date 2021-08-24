<!-- 搜索结果 -->
<template>
	<view class="search-result">
		<custom-horizontal-tabs :data="tabsData" :currentIndex="tabsIdex" @change="getCurrentIndex"></custom-horizontal-tabs>
		<swiper class="swiper" :current="tabsIdex" @change="swiperChange">
			<swiper-item>
				<!-- 课程 -->
				<my-scroll-view ref="goods_sv" class="lists" :pageSize="pageSize" @loadData="onLoadGoodsData">
					<template v-slot:list="slotProps">
						<course-lists-item 
						v-for="(item, index) in slotProps.list"
						:key="'goods-${index}'" 
						:data="item"></course-lists-item>
					</template>
				</my-scroll-view>
			</swiper-item>
			<swiper-item>
				<!-- 机构 -->
				<my-scroll-view ref="mechanism_sv" class="lists" :pageSize="pageSize" @loadData="onLoadMechanismData">
					<template v-slot:list="slotProps">
						<merchanism-lists-item 
						v-for="(item, index) in slotProps.list"
						:key="'mechanism-${index}'" 
						:data="item"></merchanism-lists-item>
					</template>
				</my-scroll-view>
				<!-- <scroll-view class="lists" scroll-y="true">
					<view class="group-lists-item" v-for="(item, index) in ['', '', '', '', '', '', '']" :key="index">
						<image class="item-image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
						<view class="item-right flex-column-between">
							<view class="flex-column">
								<view class="name text-ellipsis text-bold">店铺名称</view>
								<view class="desc">补充说明</view>
							</view>
							<view class="flex-center">
								<view class="color-yellow">店铺推荐指数</view>
								<image class="icon-star" :src="item < 3 ? iconStarSelect:iconStar" mode="aspectFill" v-for="item in [1, 2, 3, 4, 5]" :key="item"></image>
							</view>
						</view>
					</view>
				</scroll-view> -->
			</swiper-item>
			<swiper-item>
				<!-- 老师 -->
				<scroll-view class="lists" scroll-y="true">
					<view class="teacher-lists-item" v-for="(item, index) in ['', '', '', '', '', '', '']" :key="index">
						<image class="item-image" src="../../../static/images/other/girl.png" mode="aspectFill"></image>
						<view class="item-right flex-column-between">
							<view class="flex-column">
								<view class="name text-ellipsis text-bold">店铺名称</view>
								<view class="desc">补充说明</view>
							</view>
							<view class="flex-center color-6">
								<text class="color-yellow">30</text>
								个课程
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	name: 'searchResult',
	props: {
		searchText:{   //搜索关键字
			type:String,
			default:""
		}
	},
	data() {
		return {
			tabsData: ['课程', '机构', '老师'],
			tabsIdex: 0,
			// iconStar: '../../../static/images/icons/icon-star.svg',
			// iconStarSelect: '../../../static/images/icons/icon-star-selected.svg',
			pageSize: 20,
			searchString:this.searchText
		};
	},
	watch: {
		searchText(newV,oldV){
			this.searchString = newV;
			// 搜索内容变化时，重新刷新所有列表内容
			this.$refs.goods_sv.onRefresh();
			this.$refs.mechanism_sv.onRefresh();
		}
	},
	methods: {
		
		/**Tab切换回调
		 * @param {Object} value 索引
		 */
		getCurrentIndex(value) {
			this.tabsIdex = value;
		},
		
		/**左右滑动切换回调
		 * @param {Object} e e.detail
		 */
		swiperChange(e){
			this.tabsIdex = e.detail.current;
		},
		
		/** 课程搜索
		 * @param {Object} page
		 * @param {Object} callback
		 */
		onLoadGoodsData(page, callback){
			this.$http.get('/goods/queryPage',{page:page, size:this.pageSize, title:this.searchString},true).then(res=>{
				callback(res);
			}).catch( err => {
				callback(null);
			})
		},
		
		/** 机构搜索
		 * @param {Object} page
		 * @param {Object} callback
		 */
		onLoadMechanismData(page, callback){
			this.$http.get('/merchantSettle/queryMerchantPage',{page:page, size:this.pageSize, storeName:this.searchString},true).then(res=>{
				callback(res);
			}).catch( err => {
				callback(null);
			})
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
