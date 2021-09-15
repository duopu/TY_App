<!-- 大咖直播 -->
<template>
	<view class="page-wrapper live">
		<!-- 商家信息 -->
		<view class="flex-center-between live-profile">
			<text class="text-bold">{{detail.courseName}}</text>
			<view class="flex-center">
				<image class="image-name" :src="detail.avatar" mode="aspectFill" />
				<text class="font-24">{{detail.storeName}}</text>
			</view>
		</view>
		<view class="live-advertise" v-if="detail.img && detail.img.length>1">
			<image class="image-advertise" :src="detail.img[0]" mode="aspectFill" />
		</view>
		
    	<!-- 目录 -->
		<scroll-view class="live-room-category" scroll-y="true">
			<!-- 列表 -->
			<view  class="lists-item" v-for="(item, index) in detail.userCourseClassList" :key="index">
				<view class="row flex-center-between" @click="firstCheck(item)">
					<text class="text-bold title">{{(index + 1)}}、{{item.courseClassName}}</text>
					<image class="icon" src="../../../static/images/icons/icon-collapse-arrow.svg" mode="aspectFill" />
				</view>
        <block v-if="item.checked" v-for="(subItem, subIndex) in item.nodes" :key="subIndex">
          <view class="row flex-center-between" @click="secondCheck(subItem)" style="margin-left:10rpx">
            <text class="text-bold title">{{(index+1) + '-' + (subIndex + 1)}}、{{item.courseClassName}}</text>
            <image class="icon" src="../../../static/images/icons/icon-collapse-arrow.svg" mode="aspectFill" />
          </view>
          <view v-if="subItem.checked" class="collapse-content" style="margin-left:20rpx" >
            <view v-if="item.nodes" class="flex collapse-item" v-for="(flag, ind) in subItem.liveRecordList" :key="ind" @click.stop="periodClick(flag)">
              <image class="icon-video" src="../../../static/images/icons/icon-video.svg" mode="aspectFill" />
              <view class="flex-column flex-1">
                <view class="flex-center">
                  <!-- 直播状态 0:未开始 1:直播中 2:已结束 -->
                  <text>{{flag.liveName}}</text>
                  <text v-if="flag.liveState===0" class="tag">未开始</text>
                  <text v-if="flag.liveState===1" class="tag">直播中</text>
                  <text v-if="flag.liveState===2" class="tag">上次学到</text>
                </view>
                <view class="flex-center desc">
                  <text v-if="flag.liveState===0" >直播时间:{{flag.createTime}}</text>
                  <text v-if="flag.liveState===2">{{flag.learnTime || filterDate}}分钟</text>
                  <block v-if="flag.liveState===2">
                    <text class="m-left-40">已学习</text>
                    <text class="color-red">{{ flag.learnTime | filterProgress(flag.classTime)}}%</text>
                  </block>
                </view>
              </view>
            </view>
          </view>
        </block>
			</view>
		</scroll-view>

	</view>
</template>

<script>
export default {
	data() {
		return {
      courseId:'',
      current:0,
      detail:{
        img:[],
        userCourseClassList:[]
      },
      id:'', //课时id
    };
	},
  filters:{

    // 时间转分钟
    filterDate(v){
      if(!v) return 0;
      return dayjs(v).minute()
    },

    // 课时学习进度
    filterProgress(v1,v2){
      if(!v1 || !v2){
        return 0
      }
      return parseInt(v1/v2 * 100)
    },
  },
  onLoad(option){
    const { courseId,from } = option || {}
    this.courseId = courseId
    this.queryDetail();
  },
  methods:{

    periodClick(item){
      const { livePullUrl } = item || {}
      uni.navigateTo({
          url:`/pages-user/index/live/room?livePullUrl=${livePullUrl}`
      })
    },

    //树状结构 第一层点击 
    firstCheck(data){
      this.detail.userCourseClassList.map(item=>{
        if(item.id === data.id){
          item.checked = !item.checked
        }
      })
    },

    //树状结构 第二层点击 
    secondCheck(data){
       this.detail.userCourseClassList.map(item=>{
        (item.nodes || []).map(flag=>{
          if(flag.id === data.id){
            flag.checked = !flag.checked
          }
        })
      })
    },

     // 查询课程详情
    async queryDetail(){
      const params = {
        courseId:this.courseId
      }
      const data = await this.$http.get('/userCourse/queryDetail',params,true)
      if(data.userCourseClassList){
        (data.userCourseClassList || []).map(item=>{
          item.checked = false;
          if(item.nodes){
            (item.nodes || []).map(flag=>{
              flag.checked = false;
            })
          }
        })
      }
      this.detail = data;
    },

  }
};
</script>

<style lang="less" src="./style.less"></style>
