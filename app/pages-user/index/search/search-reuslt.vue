<!-- 搜索结果 -->
<template>
	<view class="search-result">
		<custom-horizontal-tabs :data="tabsData" :currentIndex="tabsIdex" @change="getCurrentIndex"></custom-horizontal-tabs>
		<swiper class="swiper" :current="tabsIdex" @change="swiperChange">
			<swiper-item>
				<!-- 课程 -->
				<my-scroll-view ref="goods_sv" class="lists" @loadData="onLoadGoodsData">
					<template v-slot:list="slotProps">
						<course-lists-item 
						v-for="(item, index) in slotProps.list"
						:key="`goods-${index}`" 
						:data="item"></course-lists-item>
					</template>
				</my-scroll-view>
			</swiper-item>
			<swiper-item>
				<!-- 机构 -->
				<my-scroll-view ref="mechanism_sv" class="lists" @loadData="onLoadMechanismData">
					<template v-slot:list="slotProps">
						<merchanism-lists-item 
						v-for="(item, index) in slotProps.list"
						:key="`mechanism-${index}`" 
						:data="item"></merchanism-lists-item>
					</template>
				</my-scroll-view>
			</swiper-item>
			<swiper-item>
				<!-- 老师 -->
				<my-scroll-view ref="teacher_sv" class="lists" @loadData="onLoadTeacherData">
					<template v-slot:list="slotProps">
						<teacher-lists-item 
						v-for="(item, index) in slotProps.list"
						:key="`teacher-${index}`" 
						:data="item"></teacher-lists-item>
					</template>
				</my-scroll-view>
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
		},
		currentTabIndex: { //当前Tab选中的下标
			type:Number,
			default:0
		}
	},
	data() {
		return {
			tabsData: ['课程', '机构', '老师'],
			tabsIdex: this.currentTabIndex,
			searchString:this.searchText
		};
	},
	watch: {
		searchText(newV,oldV){
			if(newV.length > 0){
				this.searchString = newV;
				// 搜索内容变化时，重新刷新所有列表内容
				this.$refs.goods_sv.onRefresh();
				this.$refs.mechanism_sv.onRefresh();
				this.$refs.teacher_sv.onRefresh();
			}
		},
		currentTabIndex(newV,oldV){
			this.tabsIdex = newV;
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
		 * @param {Object} pageSize
		 * @param {Object} callback
		 */
		onLoadGoodsData(page, pageSize, callback){
			console.log('课程搜索');
			this.$http.get('/goods/queryPage',{page:page, size:pageSize, goodsName:this.searchString},true).then(res=>{
				callback(res);
			}).catch( err => {
				callback(null);
			})
		},
		
		/** 机构搜索
		 * @param {Object} page
		 * @param {Object} pageSize
		 * @param {Object} callback
		 */
		onLoadMechanismData(page, pageSize, callback){
			this.$http.get('/merchantSettle/queryMerchantPage',{page:page, size:pageSize, storeName:this.searchString},true).then(res=>{
				callback(res);
			}).catch( err => {
				callback(null);
			})
		},
		
		/** 老师搜索
		 * @param {Object} page
		 * @param {Object} pageSize
		 * @param {Object} callback
		 */
		onLoadTeacherData(page, pageSize, callback){
			this.$http.get('/teacher/queryTeacherPage',{page:page, size:pageSize, name:this.searchString},true).then(res=>{
				callback(res);
			}).catch( err => {
				callback(null);
			})
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
