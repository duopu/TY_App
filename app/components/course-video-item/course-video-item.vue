<!-- 课程列表项 -->
<template>
	<!-- 项 -->
	<view class="course-lists-item" @click="itemOnClick">
		<image :src="data.storeAvatar || data.avatar" mode="aspectFill" class="item-image" />
		<view class="item-content">
			<view class="flex-1">
				<view class="name text-bold text-ellipsis">{{state === 1 ? data.title : data.courseName }}</view>
				<view class="learn-color" v-if="state === 0">
					已学习
					<text class="learn-process">{{parseInt(data.learnCount * 100)}}%</text>
				</view>
			</view>
			<view class="flex-center-between">
				<view class="flex-center flex-1">
					<image src="../../static/images/course/shop.png"  mode="aspectFill" class="icon-image" />
					<text>{{data.storeName}}</text>
				</view>
				<button class="btn btn-block black" v-if="state === 1">开始做题</button>
        <button class="btn btn-block black" v-else>观看学习</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'course-video-item',
	emits: ['clickItem'],
	props: {
		state: {
			type: Number,
			default: 0
		},
		data: { //这里的数据的属性值请严格按照下面的写
			type: Object,
			default() {
				return {
					title: '', //标题
					shopName: '', //商家姓名
					thumbnail: '../../static/images/course/shop.png', //缩略图
					id: undefined, //ID
					progress:'0%' //进度
				}
			}
		}
	},
	data() {
		return {};
	},
	methods: {
		itemOnClick(){
			this.$emit("clickItem",this.data)
		},
    // 观看学习 | 开始做题 点击事件
    // btnClick(){
    //   this.$emit("btnClick",this.data)
    // },
	}
};
</script>

<style lang="less" src="./style.less"></style>
