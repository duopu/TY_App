<!-- 订单详情(订单和消息交易) -->
<template>

</template>

<script>
  export default {
    data() {
      return {
        list: [],
        index: -1
      };
    },
    onLoad(option){
      this.orderId = option.orderId;
      this.queryInfo();
    },
    methods: {
      queryInfo(){
        this.$http.get('/order/queryExpress',{orderNum: this.orderId}).then(res => {
          this.list = res;
        })
      },
      publishGoods(){
        this.$http.get('/order/queryDetail',{orderNum: this.orderId}).then(res => {
          this.orderInfo = res;
        })
      },
      bindPickerChange(){

      }
    }
  };
</script>

<style src="./style.less" lang="less"></style>
