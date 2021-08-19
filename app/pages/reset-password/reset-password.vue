<!-- 忘记密码 -->
<template>
  <view class="code-reset pd">
    <view class="title">重置密码</view>
    <view class="form">
      <input class="input item" placeholder-class="input-placeholder" type="text" value="" placeholder="请输入手机号"/>
      <view class="item">
        <input class="input" placeholder-class="input-placeholder" type="text" value="" placeholder="请输入验证码"/>
        <view class="getCode">获取验证码</view>
      </view>
      <view class="item">
        <input class="input" placeholder-class="input-placeholder" type="text" value=""
               placeholder="请输入密码(6～20位任意字符组合)"/>
        <image class="icon" src="../../static/images/login/eye-close.png"></image>
      </view>
      <view class="item">
        <input class="input" placeholder-class="input-placeholder" type="text" value="" placeholder="请再次输入密码"/>
        <image class="icon" src="../../static/images/login/eye-close.png"></image>
      </view>
    </view>
    <view class="login-btn">确认</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      eyeImage: ''
    };
  },
  onLoad() {
  },
  methods: {}
};
</script>

<style lang="less" src="./style.less"></style>
