<!-- 我的钱包 -->
<template>
	<view class="wallet">
		<view class="wallet-top">
			<view class="wallet-money text-bold">
				<text>{{goldCoin}}</text>
				<text class="unit">金币</text>
			</view>
			<button class="btn text-bold" @click="openWithdrawal">我要提现</button>
			<view class="title text-bold">提现规则：</view>
			<view class="desc">1、满500金币即可提现。2、100金币等于人民币1元</view>
		</view>
		<!-- 金币变动明细 -->
		<view class="wallet-details">
			<view class="title text-bold">金币变动明细：</view>
			<view class="list-item flex-center-between" v-if="dataList" v-for="(item,index) in dataList" :key="index">
				<view class="flex-column">
					<view>{{item.remark}}</view>
					<view class="color-9">{{item.createTime}}</view>
				</view>
				<view class="money text-bold" :class="item.type != 1  && 'color-red'">{{ item.type == 1 ? '+' : '-' }}{{item.gold}}金币</view>
			</view>
		</view>
		<!-- 提现弹窗 -->
		<wallet-withdrawal-popup ref="withdrawalPopup" @submit="_submit"></wallet-withdrawal-popup>
	</view>
</template>

<script>
let page = 1,size = 10,hasMoreData = false;
export default {
	data() {
		return {
      goldCoin:0,
      dataList:[]
    };
	},
  
  onLoad(){
    this._refresh()
  },

  onShow(){
    this.queryInfo()
  },

  onPullDownRefresh() {
      this._refresh()
  },

  onReachBottom(options) {
    if (hasMoreData) {
        this.queryList();
    } else {
        console.log("没有更多");
    }
  },

  methods:{

    // 打开弹窗
		openWithdrawal() {
      if(parseInt(this.goldCoin) < 500){
        this.$tool.showToast('金币小于500不可提现')
        return;
      }
			this.$refs['withdrawalPopup'].open();
		},

    _submit(form){
      const params = {...form, goldCoin:this.goldCoin}
      this.$http.post('/user/withdraw',params,true).then(res=>{
        this.$tool.showSuccess('提现成功',()=>{
          this.queryInfo()
          this._refresh()	
				})
      })
    },

    // 查询用户信息(金币)
    async queryInfo(){
      const data = await this.$http.get('/user/queryInfo',{},true) || {}
      this.goldCoin = data.goldCoin
    },

    _refresh(){
        page = 1
        size = 10
        this.queryList();
    },

    // 列表
    async queryList(){
      const params = {
        page,
        size
      }
      const data = await this.$http.get('/userGold/queryPage',params,true)
      let dataList = data.content || [];
      if (dataList) {
          uni.stopPullDownRefresh();
          if (page == 1) {
              this.dataList = dataList;
          } else {
              this.dataList = this.dataList.concat(dataList);
          }
          if (this.dataList.length < data.totalSize) {
              hasMoreData = true;
              page++;
          } else {
              hasMoreData = false;
          }
      }
    }
  }
};
</script>

<style lang="less" src="./style.less"></style>
