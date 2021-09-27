<!-- 优惠券-选择商品-商品分类弹窗 -->
<template>
	<uni-popup class="popup" ref="popup" type="top" :safeArea="false" @change="onChangePopup">
		<scroll-view scroll-y="true" class="classify-content ">
			<view class="flex-between list">
				<view class="item-column flex-1">
					<view class="text" @click="changeCurriculum(1,index)" :class="{ active: index1 === index }" v-for="(item, index) in curriculumList" :key="index">
						{{ item.courseName }}
					</view>
				</view>
				<view class="item-column text-center flex-1">
					<view class="text" @click="changeCurriculum(2,index)" :class="{ on: index2 === index }" v-for="(item,index) in curriculum2" :key="index">
						{{item.courseClassName}}
					</view>
				</view>
				<view class="item-column text-center flex-1">
					<view class="text" @click="changeCurriculum(3,index)" :class="{ on: index2 === index }" v-for="(item,index) in curriculum3ooooo" :key="index">
						{{item.courseClassName}}
<!--						ffffff-->
					</view>
				</view>
			</view>
		</scroll-view>
	</uni-popup>
</template>

<script>
export default {
	name: 'business-goods-classify-popup',
	data() {
		return {
			curriculumList: [],
			index1: 0, //
			index2: 0,
			index3: 0,
			curriculum2: [],
			curriculum3ooooo: ['','']
		};
	},
	created(){
		console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
		this.queryCurriculumList();
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
		// 弹窗 change valueObject [show,type]
		onChangePopup(valueObject) {
			this.$emit('change', valueObject.show);
		},
		queryCurriculumList(){
			this.$http.get('/course/queryListByStore',{},true).then(res=>{
				console.error('==========')
				console.log(res);
				let data = res.map(item => {
					return {
						...item,
						courseClassName: item.courseName,
					}
				})
				// let arr = data.length > 0 ? data[0].courseClassVOList : [];
				// let arr2 = arr.length > 0 ? arr[0].liveCourseClassList : [];
				this.curriculumList = res;
			})
		},
		// 每列切换
		changeCurriculum(curriculumIndex,index){
			// curriculumIndex = 1 | 2 | 3;
			let list = [];
			if(curriculumIndex === 1){
				this.index2 = 0;
				this.index1 = index;
				list = this.curriculumList[index].courseClassVOList || [];
				console.log(list);
				this.curriculum2 = list;
			} else{
				this.index2 = index;
				this.index3 = 0;
				console.error(index);
				console.log(this.curriculum2[index])
				list = this.curriculum2.length > 0  ? this.curriculum2[index].liveCourseClassList : ['','','',''];
				console.log('======')
				console.log(list);
				this.curriculum3ooooo = list;
			}

		}
	}
};
</script>

<style src="./style.less" lang="less" scoped></style>
