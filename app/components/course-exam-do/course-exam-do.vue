<!-- 存在老的练习题 弹窗 -->
<template>
	<uni-popup ref="popup">
		<view class="popup-main">
			<image class="image-success" src="../../static/images/gantanhao.png" mode="aspectFill" />
			<view class="text-bold title">继续答题？</view>
			<button class="btn btn-block" @click="submit(1)">继续答题</button>
			<button class="btn btn-text" @click="submit(0)">重新开始</button>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'course-exam-submit',
	data() {
		return {};
	},
  props:{
    title:{
      type:String,
      default:''
    }
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
    async submit(v){
      await this.$emit('btnClick',v)
      this.close()
    }
	}
};
</script>

<style lang="less" src="./style.less"></style>
