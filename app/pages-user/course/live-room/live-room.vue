<!-- 观看课程 -->
<template>
	<view class="live-room">
		<!-- 视频 -->
		<view class="live-room-top">
			<video class="video" :src="videoUrl" controls ></video>
			<video class="video" :src="videoUrl2" controls ></video>
			<view class="flex-center-between text-bold process">
				<text class="title text-bold">{{detail.courseName}}</text>
				<text class="color-red">{{detail.learnRate || 0}}%</text>
			</view>
		</view>

		<!-- 目录 -->
		<scroll-view class="live-room-category" scroll-y="true">
			<!-- 列表 -->
			<view v-if="detail.userCourseClassList && detail.userCourseClassList.length>0" class="lists-item" :class="index === current && 'on'" @click="collapseItem(index)" v-for="(item, index) in detail.userCourseClassList" :key="index">
				<view class="row flex-center-between">
					<text class="text-bold title">{{(index + 1)}}、{{item.courseClassName}}</text>
					<image class="icon" src="../../../static/images/icons/icon-collapse-arrow.svg" mode="aspectFill" />
				</view>
				<view class="collapse-content">
					<view v-if="item.nodes" class="flex collapse-item" v-for="(subItem, subIndex) in item.nodes" :key="subIndex" @click.stop="periodClick(subItem)">
						<image class="icon-video" src="../../../static/images/icons/icon-video.svg" mode="aspectFill" />
						<view class="flex-column flex-1">
							<view class="flex-center">
								<text>{{subItem.courseClassName}}</text>
								<text class="tag">上次学到</text>
							</view>
							<view class="flex-center desc">
								<text>{{subItem.learnTime || filterDate}}分钟</text>
								<text class="m-left-40">已学习</text>
								<text class="color-red">{{ subItem.learnTime | filterProgress(subItem.classTime)}}%</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部 -->
		<view class="live-room-bottom flex-center-between">
			<view class="item flex-column-center" @click="down">
				<image class="icon" src="../../../static/images/icons/icon-colorful-download.svg" mode="aspectFill" />
				<text>下载</text>
			</view>
			<view class="item flex-column-center" @click="toCustomerService">
				<image class="icon" src="../../../static/images/icons/icon-color-kf.svg" mode="aspectFill" />
				<text>联系客服</text>
			</view>
			<view v-if="detail.isEval" class="item flex-column-center"  @click="eval">
				<image class="icon" src="../../../static/images/icons/icon-colorful-evaluate.svg" mode="aspectFill" />
				<text>写评价</text>
			</view>
		</view>
	</view>
</template>

<script>
import dayjs from 'dayjs';
export default {
	data() {
		return {
      courseId:'', // 课程id
      // 课程详情
      detail:{
        courseName:'',
        userCourseClassList:[],
        storeId:'',
        avatar:'',
        storeName:'',
        isEval:true
      },
      current:-1,
      videoUrl:'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4',
      videoUrl2:''
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
  async onLoad(option){
    const { courseId } = option || {}
    this.courseId = courseId
    this.queryDetail()
    uni.getSavedFileList({
      success: function (res) {
        // this.videoUrl2 = plus.io.convertLocalFileSystemURL(res.fileList[0].filePath)
        this.videoUrl2 = 'file://' + plus.io.convertLocalFileSystemURL(res.fileList[0].filePath)
        console.log(333,this.videoUrl2)
      }
    });
  },
	methods: {

		// 展开目录
		collapseItem(index) {
      this.current = index;
		},

    // 课时点击
    periodClick(item){
      this.videoUrl = item.url
    },

    //下载课程 
    down(){
      let that = this;
      uni.downloadFile({
          url: that.videoUrl, //仅为示例，并非真实的资源
          success: (res) => {
              if (res.statusCode === 200) {
                  let tempFilePath = this.fileNameEscape(res.tempFilePath);
                  that.$tool.showSuccess('下载成功',()=>{
                    uni.saveFile({
                      tempFilePath,
                      success: (res) => {
                        let savedFilePath = res.savedFilePath;
                        console.log('保存成功',savedFilePath)
                      },
                      complete:(res)=>{
                        console.log('------',res)
                      }
                    });
                  })
                  
              }
          }
      });
    },

    /**
     * ios下文件名中文处理
     * @param {String} filename
     */
    fileNameEscape(filename) {
      if (uni.getSystemInfoSync().platform == "ios") {
        filename = escape(filename);
      }
      return filename;
    },

    // 跳转客服页面
		toCustomerService(){
      const { storeId,storeName,avatar} = this.detail || {}
			this.$http.get('/im/getIMGroupId',{storeId},true).then(res=>{
				const groupId = res.groupId;
				const user = getApp().globalData.user || {};
        const { userName,portrait,imNum } = user
				const url = `/pages/im-message/im-message?groupId=${groupId}&userName=${userName}&userPortrait=${portrait || ''}&userIM=${imNum}&storeName=${storeName}&storePortrait=${avatar || ''}`
				uni.navigateTo({
					url
				})
			})
		},

    // 写评价
    eval(){
      const params = {
        ...this.detail,
        goodsId:this.detail.courseId,
      }
      uni.navigateTo({
        url: `/pages-user/mine/evaluate/evaluate?goodsVO=${encodeURIComponent(JSON.stringify(params))}`,
      })
    },

    // 查询课程详情
    async queryDetail(){
      const params = {
        courseId:this.courseId
      }
      const data = await this.$http.get('/userCourse/queryDetail',params,true)
      if(data.userCourseClassList[0] && data.userCourseClassList[0].nodes[0]){
        this.videoUrl = data.userCourseClassList[0].nodes[0].url
      }
      this.detail = data;
    },
	}
};
</script>

<style lang="less" src="./style.less"></style>
