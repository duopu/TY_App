<!-- 首页 -->
<template>
  <view class="page-wrapper">
	<!-- 头部 -->
	<view class="top">
		<view class="flex-center-between">
			<view class="flex-center">
				<image class="image-eduction" src="../../../static/images/index/eduction-course.png" mode="aspectFill"></image>
				<text class="line"></text>
				<text class="color-yellow">slogn可换</text>
			</view>
			<view class="flex-center">
				<image class="icon-image" src="../../../static/images/icons/icon-search.svg" mode="aspectFill"></image>
				<image class="icon-image" src="../../../static/images/icons/icon-message.svg" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 横向滚动菜单 -->
		<scroll-view scroll-x="true" class="custom-tabs">
			<view class="custom-tabs-item"></view>
		</scroll-view>
	</view>
    <!-- 轮播图 -->
    <view class="swiper">
      <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
              :duration="duration">
        <swiper-item>
          <image class="swiper-img" src="../../../static/images/login/advert.png" mode=""></image>
        </swiper-item>
        <swiper-item>
          <image class="swiper-img" src="../../../static/images/login/advert.png" mode=""></image>
        </swiper-item>
        <swiper-item>
          <image class="swiper-img" src="../../../static/images/login/advert.png" mode=""></image>
        </swiper-item>
      </swiper>
    </view>


    <!-- 宫格 -->
    <view class="grid fl bet aln">
      <view class="item">
        <image src="../../../static/images/index/type.png" mode=""></image>
        <view class="name">
          分类
        </view>
      </view>
      <view class="item">
        <image src="../../../static/images/index/zhib.png" mode=""></image>
        <view class="name">
          大咖直播
        </view>
      </view>
      <view class="item">
        <image src="../../../static/images/index/tiku.png" mode=""></image>
        <view class="name">
          考试题库
        </view>
      </view>
      <view class="item">
        <image src="../../../static/images/index/zhuanh.png" mode=""></image>
        <view class="name">
          高新转行
        </view>
      </view>
      <view class="item">
        <image src="../../../static/images/index/kec.png" mode=""></image>
        <view class="name">
          精品课程
        </view>
      </view>
    </view>

    <!-- 资讯宫格 -->

    <view class="zixun fl bet aln">
      <view class="zixun-item">
        <view class="">
          <view class="title">
            最新资讯
          </view>
          <image class="zx-img" src="../../../static/images/login/advert.png" mode=""></image>
        </view>
        <view class="zhin">
          人工智能体系课，从入门到实战你觉得行就来
        </view>
      </view>
      <view class="zixun-item">
        <view class="day fl bet aln">
          <image class="day-img" src="../../../static/images/index/type.png" mode=""></image>
          <view class="">
            每日任务
          </view>
          you
        </view>
        <view class="btm fl bet aln">
          <view class="btm-item">
            <view class="btm-title">
              活动推荐
            </view>
            <view class="sub">
              精彩活动推荐
            </view>
          </view>
          <view class="btm-item fx">
            <view class="btm-title">
              分销大使
            </view>
            <view class="sub">
              查看分销大使
            </view>
          </view>
        </view>
      </view>
    </view>


    <!-- 直播分类 -->
    <view class="live">
      <view class="head fl bet aln">
        <view class="lf">
          <view class="fl aln">
            <image class="zbsm" src="../../../static/images/index/zbsm.png" mode=""></image>
            <view class="bold">
              大咖直播
            </view>
          </view>
          <view class="shul">

          </view>
          <view class="norm">
            很多大咖可更换
          </view>
        </view>

        <!-- 更多 -->
        <view class="fl aln">
          <view class="more-text" @click="open">
            更多
          </view>
          <image class="more" src="../../../static/images/index/more.png" mode=""></image>
        </view>
      </view>

      <view class="tabs fl aln">
        <view class="tab act">
          分类一
        </view>
        <view class="tab">
          分类一
        </view>
        <view class="tab">
          分类一
        </view>
      </view>
      <view class="banner">
        <image src="../../../static/images/index/live_img.png" mode=""></image>
      </view>
    </view>


    <!-- 题库 -->
    <view class="question">
      <view class="head fl bet aln">
        <view class="lf">
          <view class="fl aln">
            <image class="zbsm" src="../../../static/images/index/tikum.png" mode=""></image>
            <view class="bold">
              考试题库
            </view>
          </view>

        </view>

        <view class="fl aln">
          <view class="more-text">
            更多
          </view>
          <image class="more" src="../../../static/images/index/more.png" mode=""></image>
        </view>
      </view>

      <view class="slide">
        <swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000"
                :display-multiple-items="1" next-margin='80rpx'>
          <swiper-item v-for="index in 6" :key='index'>
            <view class="item">
              <view class="title">
                <text class="flag">小标题</text>
                <text>2021下半年软考高级职称-45分高数直通车(重学)</text>
              </view>
              <view class="bottom fl aln bet">
                <view class="fl aln bet">
                  <view class="imgs">
                    <image class="avatar" src="../../../static/images/index/avatar.jpg" mode=""></image>
                    <image class="avatar" src="../../../static/images/index/avatar.jpg" mode=""></image>
                    <image class="avatar" src="../../../static/images/index/avatar.jpg" mode=""></image>
                  </view>
                  <view class="description">
                    ···等836人已报名
                  </view>
                </view>
                <view class="rt">
                  <view class="">
                    自定义标签
                  </view>
                  <view class="price">
                    ￥500
                  </view>
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>


    <!-- 高薪转行 -->
    <view class="zhuanh">
      <view class="head fl bet aln">
        <view class="lf">
          <view class="fl aln">
            <image class="zbsm" src="../../../static/images/index/zhuanhm.png" mode=""></image>
            <view class="bold">
              高薪转行
            </view>
          </view>

        </view>

        <!-- 更多 -->
        <view class="fl aln">
          <view class="more-text">
            更多
          </view>
          <image class="more" src="../../../static/images/index/more.png" mode=""></image>
        </view>
      </view>

      <view class="slide">
        <!-- <Swiper :list="cardList" :config="config"></Swiper> -->
        <swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000"
                :display-multiple-items="2" style="height: 400upx;" next-margin='30rpx'>
          <swiper-item v-for="index in 6" :key='index'>
            <view class="z-item">
              <view class="title">
                转薪秘籍
              </view>
              <view class="">
                职场最全加薪秘籍
              </view>
              <view class="">
                史上最牛跳槽达人
              </view>
              <view class="">
                燃爆你的职场生涯
              </view>
              <view class="ft">
                落户，一证多用
              </view>
              <view class="btn">
                查看详情
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>


    <!-- 精品课程 -->
    <view class="live kec">
      <view class="head fl bet aln">
        <view class="lf">
          <view class="fl aln">
            <image class="zbsm" src="../../../static/images/index/kecm.png" mode=""></image>
            <view class="bold">
              精品课程
            </view>
          </view>
        </view>

        <!-- 更多 -->
        <view class="fl aln">
          <view class="more-text">
            更多
          </view>
          <image class="more" src="../../../static/images/index/more.png" mode=""></image>
        </view>
      </view>

      <view class="tabs fl aln">
        <view class="tab act">
          分类一
        </view>
        <view class="tab">
          分类一
        </view>
        <view class="tab">
          分类一
        </view>
      </view>
      <view class="bea">
        <view class="item fl aln bet" v-for="item in 4" :key='item'>
          <image class="preview" src="../../../static/images/index/avatar.jpg" mode=""></image>
          <view class="info">
            <view class="title">
              幼儿美术基础(免费特级/少儿美术/儿童绘画/随到随学)
            </view>
            <view class="bottom fl aln">
              <view class="price">
                ￥500
              </view>
              <view class="desc">
                最近30人报名
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <uni-popup ref="popup" v-if="typesShow" type="bottom">
      <view class="types">
        <view class="title">
          我的兴趣
        </view>
        <view class="content">
          <view class="item">
            <view class="item-title">
              热门分类
            </view>
            <view class="fl aln bet item-content">
              <view class="datum" v-for="index  in 8" :key='index'>
                <image class="item-a" src="../../../static/images/index/avatar.jpg" mode=""></image>
                <view class="name">
                  名称
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="btn" @click="close">
          确定
        </view>

      </view>
    </uni-popup>

  </view>
</template>

<script>
	export default {
    data() {
      return {
        indicatorDots: true,
        autoplay: true,
        interval: 4000,
        duration: 500,
        typesShow: true
      }
    },
    onLoad() {
    },
    created() {
    },

    methods: {
      login() {
        uni.navigateTo({
          url: '/pages/login/login'
        })
      },
      changeIndicatorDots(e) {
        this.indicatorDots = !this.indicatorDots
      },
      changeAutoplay(e) {
        this.autoplay = !this.autoplay
      },
      intervalChange(e) {
        this.interval = e.target.value
      },
      durationChange(e) {
        this.duration = e.target.value
      },
      open() {
        // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
        this.$refs.popup.open('top')
      },
      close() {
        this.$refs.popup.close()
      }
    }
  }
</script>

<style lang="less" src="./style.less"></style>
