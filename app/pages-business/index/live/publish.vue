<!-- 发布直播 -->
<template>
	<view class="live publish">
		<view class="form-row">
			<text class="label">选择课程1</text>
			<picker class="input" @change="bindPickerChange" :value="selectedIndexArr" @columnchange="columnchange" range-key="courseClassName"  mode="multiSelector"  :range="curriculumList">
				<view class="uni-input">{{ selectedNames.join('/') }}</view>
			</picker>
		</view>
		<view class="form-row">
			<text class="label">直播名称</text>
			<input placeholder-class="input-placeholder" class="input" type="text" v-model="liveName" placeholder="请输入" />
		</view>
		<view class="form-row">
			<text class="label">直播简介</text>
			<textarea placeholder-class="input-placeholder" class="textarea"  v-model="liveIntro" placeholder="请输入"></textarea>
		</view>
		<view class="form-row"><button class="btn" @click="getLivePushUrl">下一步</button></view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			courseId: null,
			courseClassId: null,
			liveName:'',
			liveIntro:'',
			curriculumList: [],
			selectedIndexArr: [],
			selectedNames:[]
			
		};
	},
	onLoad(){
		this.queryCurriculumList();
	},
	methods:{
		getLivePushUrl(){
			const param = {
				courseId:this.courseId,
				liveName:this.liveName,
				liveIntro:this.liveIntro,
				courseClassId:this.courseClassId
			}
			
			this.$http.get('/live/getPushUrl',param,true).then(res=>{
				const pushUrl = res.pushUrl;
				const navUrl = `/pages-business/index/live/live-broadcast?pushUrl=${pushUrl}&courseId=${this.courseId}&liveName=${this.liveName}&liveIntro=${this.liveIntro}&courseClassId=${this.courseClassId}`
				console.log('导航去直播页面',navUrl);
				uni.navigateTo({
					url:navUrl
				})
			})
		},

		queryCurriculumList(){
			this.$http.get('/course/queryListByStore',{},true).then(res=>{
				console.log(res);
				let data = res.map(item => {
					return {
						...item,
						courseClassName: item.courseName,
					}
				})
				let arr = data.length > 0 ? data[0].courseClassVOList : [];
				let arr2 = arr.length > 0 ? arr[0].liveCourseClassList : [];
				this.curriculumList = [data,arr,arr2];
			})
		},
		columnchange(event){

			let columnIndex = event.detail.column;
			let valueIndex  = event.detail.value;
			let data = this.curriculumList;

			let arr,arr2;

			if(columnIndex === 0){
				arr = data[columnIndex][valueIndex].courseClassVOList || [];
				arr2 = arr.length > 0 ? arr[0].liveCourseClassList : [];
				this.curriculumList = [this.curriculumList[0],arr,arr2];
			}else if(columnIndex === 1){
				arr2 = data[columnIndex][valueIndex].liveCourseClassList.length > 0 ? data[[columnIndex]][valueIndex].liveCourseClassList : [];
				this.curriculumList = [this.curriculumList[0],this.curriculumList[1],arr2];
			}
		},
		bindPickerChange(event){
			let arr = [];
			event.detail.value.map((item,index) => {
				arr.push(this.curriculumList[index][item].courseClassName)
			});

			this.courseClassId = this.curriculumList[2][event.detail.value[2]].courseClassId;
			this.courseId = this.curriculumList[2][event.detail.value[2]].courseId;
			this.selectedNames = arr;
			this.selectedIndexArr = event.detail.value
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
