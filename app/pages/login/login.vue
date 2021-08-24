<!-- 登录页面 -->
<template>
	<view class="login-page">
    <view class="top">
      <view class="logo flex-center-center">
		  <image class="logo-image" src="../../static/images/logo.png" mode="aspectFill"></image>
	  </view>
      <!-- tabs -->
      <view class="flex-center tabs-title">
        <view class="tabs-title-item" :class="{ on: roleStatus === 0 }" @click="onChangeRole(0)">用户版</view>
        <view class="tabs-title-item" :class="{ on: roleStatus === 1 }" @click="onChangeRole(1)">商家版</view>
      </view>
    </view>
    <view class="form-wrapper">
      <!-- 手机号/验证码登录 -->
      <view v-if="loginMethod === 0">
        <input class="input" placeholder-class="input-placeholder" type="text" v-model="phone" placeholder="请输入手机号"/>
        <view class="helper">未注册手机号验证后自动注册</view>
        <view class="login-btn" @click="onGetCode">获取验证码</view>
        <view class="huo">或</view>
        <view class="password-login" @click="loginMethod = 1">密码登录</view>
      </view>
      <!-- 密码登录 -->
      <view v-else>
        <input class="input" placeholder-class="input-placeholder" type="text" v-model="phone" placeholder="请输入手机号或用户名"/>
        <view class="flex-center-between input-with-icon">
          <input class="input" placeholder-class="input-placeholder" :type="eye == 1 ? 'password' : 'text'" v-model="pwd" placeholder="请输入密码"/>
          <image class="icon" v-if="eye == 1" @click="toggleEye" src="../../static/images/login/eye-close.png"
                 mode="aspectFill"></image>
          <image class="icon" v-if="eye == 2" @click="toggleEye" src="../../static/images/login/eye.png"
                 mode="aspectFill"></image>
        </view>
        <navigator url="../reset-password/reset-password" class="helper forget" @click="forget">忘记密码？</navigator>
        <view class="login-btn">登录</view>
        <view class="huo">或</view>
        <view class="password-login" @click="loginMethod = 0">快速登录</view>
      </view>
    </view>
    <!-- 底部 -->
    <view class="bottom">
      <view class="rules">
        注册即同意
        <text>《腾云课堂服务协议》</text>
      </view>
      <view class="through flex-center-center">
        <text>其他登录方式</text>
      </view>

      <view class="methods flex-center-center">
        <image class="methods-image" src="../../static/images/login/qq.png" mode="aspectFill"></image>
        <image class="methods-image" src="../../static/images/login/wx.png" mode="aspectFill"></image>
        <image class="methods-image" src="../../static/images/login/zfb.png" mode="aspectFill"></image>
      </view>
      <image class="advert-image" src="../../static/images/other/advertise.png" mode="aspectFill"></image>
    </view>
  </view>
</template>

<script>
export default {
	data() {
		return {
			roleStatus: 0, //0-用户版 1-商家版
			loginMethod: 0, //0-手机号/验证码，1-密码登录
			eye: 1, // 密码登录， 密码输入框的那个小眼睛 标记
			phone:'',// 手机号
			pwd:'',// 密码
		};
	},
	methods: {
		// 选择登录角色
		onChangeRole(value) {
			if (value === this.roleStatus) return;
			this.roleStatus = value;
		},
		toggleEye() {
			this.eye = this.eye == 1 ? 2 : 1;
		},
		// 验证码 按钮
		onGetCode() {
			if(!this.phone){
				this.$tool.showToast('请输入手机号')
				return
			}
			// 发送验证码
			this.$http.get('/user/getSmsCode',{phone:this.phone,smsType:1},true).then(res=>{
				uni.navigateTo({
					url: `/pages/validate-code/validate-code?phone=${this.phone}&roleStatus=${this.roleStatus}`
				});
			})
		},
		forget() {
			uni.navigateTo({
				url: '/pages/login/reset'
			});
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
