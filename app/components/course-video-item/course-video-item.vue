<!-- 课程列表项 -->
<template>
	<!-- 项 -->
	<view class="course-lists-item" @click="itemOnClick()">
		<image :src="data.thumbnail" mode="aspectFill" class="item-image" />
		<view class="item-content">
			<view class="flex-1">
				<view class="name text-bold text-ellipsis">{{state === 0 ? data.courseName : data.title}}</view>
				<view class="learn-color" v-if="state === 0">
					已学习
					<text class="learn-process">{{data.learnCount}}</text>
				</view>
			</view>
			<view class="flex-center-between">
				<view class="flex-center flex-1">
					<image src="../../static/images/course/shop.png"  mode="aspectFill" class="icon-image" />
					<text>{{data.storeName}}</text>
				</view>
				<button class="btn btn-block black" v-if="state === 0" @click.stop="btnClick()">观看学习</button>
				<button class="btn btn-block black" v-else @click.stop="btnClick()">开始做题</button>
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
			this.$emit("clickItem",this.data.id)
		},
    // 观看学习 | 开始做题 点击事件
    btnClick(){
      this.$emit("btnClick",this.data)
    },
	}
};
</script>

<style lang="less" src="./style.less"></style>
