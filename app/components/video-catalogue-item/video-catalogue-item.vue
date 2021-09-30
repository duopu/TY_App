<!-- 视频目录 -->
<template>
	<view class="catalogue-item">
		<view class="flex-center-between" :class="{'root-item':isFolder}" @click="toggle()">
			<text class="serial-number">{{index}}</text>
			<text class="text flex-1 text-ellipsis">{{model.courseClassName}}</text>
			<!-- <view class="flex-center" @click.stop="goWatchVideo()">
				<image src="../../static/images/icons/icon-video.svg" class="image-video" mode="aspectFill"></image>
				<text class="color-yellow">试看</text>
			</view> -->
		</view>
		<view class="sub" v-show="open" v-if="isFolder">
			<video-catalogue-item v-for="(item,i) in model.nodes" :data="item" :index="`${index}.${i+1}`"></video-catalogue-item>
		</view>
	</view>
</template>

<script>
export default {
	name: 'video-catalogue-item',
	props: {
		index: {
			type:String,
			default:0,
			required:true
		},
		data:{
			type:Object,
			default:{
				courseClassName:"",
				courseClassId:0,
				classTime:"",
				courseId:0,
				nodes:[],
				parentId:0,
				url:""
			},
			required:true
		}
	},
	data() {
		return {
			model:{
				courseClassName:this.data.courseClassName,
				courseClassId:this.data.courseClassId,
				classTime:this.data.classTime,
				courseId:this.data.courseId,
				nodes:this.data.nodes || [],
				parentId:this.data.parentId,
				url:this.data.url
			},
			open: false //节点打开状态
		};
	},
	watch:{
		data(newV, oldV){
			this.model = {
				courseClassName:newV.courseClassName,
				courseClassId:newV.courseClassId,
				classTime:newV.classTime,
				courseId:newV.courseId,
				nodes:newV.nodes || [],
				parentId:newV.parentId,
				url:newV.url
			};
		}
	},
	computed: {
		// 是否还有子节点
		isFolder: function() {
			return this.model.nodes && this.model.nodes.length
		}
	},
	methods:{
		
		/**
		 * 目录点击
		 */
		toggle(){
			if (this.isFolder) {
				this.open = !this.open;
				this.$store.commit("changeGoodsDetailsHeight");
			}
		},
		
		/**
		 * 试看
		 */
		goWatchVideo(){
			//TODO: 当前先不做这个功能
			console.log("去试看");
		}
	}
};
</script>

<style lang="less" src="./style.less" scoped></style>
