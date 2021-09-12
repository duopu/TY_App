<!-- 会员权益 -->
<template>
	<view class="benefit">
		<!-- tab -->
		<view class="tabs-lists flex-center-between">
			<view 
        v-if="detail.memberLevelList" v-for="(item,index) in detail.memberLevelList" 
        :key="index" class="item" :class="current === index && 'on'"
        @click="tabChange(index)"
      >{{item.levelName}}</view>
		</view>
    <swiper class="swiper" @change="swiperChange" :current="current" :duration="duration">
        <swiper-item v-for="(item,index) in detail.memberLevelList" :key="index">
            <view class="benefit-silver">
              <image class="image" :src="item.logo || '../../../static/images/benefit-silver.png'" mode="widthFix" />
              <view class="describe flex-column-between">
                <view class="name text-bold">{{item.levelName}}</view>
                <view class="text flex-1">
                  <!-- <text v-if="detail.level > item.levelId ">当前高于该等级</text>
                  <text v-else-if="item.levelId === detail.level">{{detail.conditions}}</text>
                  <text v-else>成长值达到{{item.growth}}可升级</text> -->
                  <text>{{item.conditions}}</text>
                </view>
                <view v-if="item.levelId === detail.level" class="process">
                  <view class="process-bar" :style="{width: ((detail.userGrowth / item.growth).toFixed(2) * 100 || 0) + '%'}" ></view>
                </view>
              </view>
            </view>
        </swiper-item>
    </swiper>

    <block v-if="current === index" v-for="(item,index) in detail.memberLevelList" :key="index">
      <view class="box privilege">
        <view class="title text-bold">{{item.levelName}}特权</view>
        <view class="privilege-list">
          <view class="flex-column item" v-if="item.discount">
            <image class="image" mode="aspectFill" src="../../../static/images/benefit-privilege-03.png" />
            <text>会员折扣{{item.discount}}折</text>
          </view>
          <view class="flex-column item" v-if="item.memberGoodsList && item.memberGoodsList.length>0"  @click="course(item.memberGoodsList)">
            <image class="image" mode="aspectFill" src="../../../static/images/benefit-privilege-04.png" />
            <text>会员免费课</text>
          </view>
        </view>
      </view>
    </block>
    
	
		<!-- 获取成长值去升级 -->
		<view class="box upgrade">
			<view class="title text-bold">获取成长值去升级</view>
			<view class="upgrade-list">
				<view class="item flex-center-between">
					<image class="image" mode="aspectFill" src="../../../static/images/benefit-upgrade-01.png" />
					<view class="flex-column flex-1">
						<!-- <view class="text-bold">{{ detail.method }}</view> -->
						<view class="text-desc">{{ detail.method }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
      detail:{

      },
      current:0,
      duration:300,
		};
	},
  onLoad(){
    this.queryDetail()
  },
	methods: {

    // tab 点击事件
    tabChange(current){
      if(Math.abs(current - this.current)>1){
        this.duration = 100
      }else{
        this.duration = 300
      }
      this.current = current
    },
    
    // 轮播 点击事件
    swiperChange(e){
      this.current = e.detail.current
    },

    // 跳转到课程列表
    course(list){
      if(this.detail.level != this.detail.memberLevelList[this.current].levelId){
        return;
      }
      uni.navigateTo({
        url:`/pages-user/mine/benefit/course-list?list=${encodeURIComponent(JSON.stringify(list))}`
      })
    },

    // 查询会员权益
    async queryDetail(){
      const data =  await this.$http.get('/member/queryMemberDetail',{},true) || {}
      this.detail = data
    }
  }
};
</script>

<style lang="less" src="./style.less"></style>
