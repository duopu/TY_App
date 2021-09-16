<!-- 退款详情 -->
<template>
	<scroll-view scroll-y="true" class="refund">
		<!-- 处理状态 -->
		<view class="box">
			<!-- 申请退款中 -->
			<block v-if="orderVO.orderState === 5 || orderVO.orderState === 11">
				<view class="state text-bold flex-center">
					<image class="image-state" src="../../../static/images/icons/icon-refund-time.svg" mode="aspectFill"></image>
					<text>商家处理中</text>
				</view>
				<view class="desc">您已成功发起退款申请，请耐心等待商家处理</view>
			</block>
			
			<!-- 商家允许退款待填写发货信息 -->
			<block v-else-if="orderVO.orderState === 12">
				<view class="state text-bold flex-center">
					<image class="image-state" src="../../../static/images/icons/icon-refund-gou.svg" mode="aspectFill"></image>
					<text>商家已同意退款，请寄回退货商品</text>
					<view class="tips">{{timeRemaining}}后自动关闭退款申请</view>
				</view>
				<view class="desc">请按商家提供的地址退货，并及时填写运单信息</view>
			</block>
			
			<!-- 用户已填写发货单待商家退款 -->
			<block v-if="orderVO.orderState === 14">
				<view class="state text-bold flex-center">
					<image class="image-state" src="../../../static/images/icons/icon-refund-time.svg" mode="aspectFill"></image>
					<text>已寄回退货商品，等待商家确认</text>
				</view>
				<view class="desc">商家确认后，退款将原路返回至支付账户</view>
			</block>
			
			<!-- 拒绝退款 -->
			<block v-if="orderVO.orderState === 7 || orderVO.orderState === 13">
				<view class="state text-bold flex-center">
					<image class="image-state" src="../../../static/images/icons/icon-refund-stop.svg" mode="aspectFill"></image>
					<text>商家已拒绝退款</text>
				</view>
				<view class="desc">请与商家协商后，修改退款申请，并重新提交</view>
			</block>
			
			<!-- 退款中 -->
			<block v-if="orderVO.orderState === 6 || orderVO.orderState === 15">
				<view class="state text-bold flex-center">
					<image class="image-state" src="../../../static/images/icons/icon-refund-time.svg" mode="aspectFill"></image>
					<text v-if="orderVO.entityGoodsId">商家已收到货，等待退款到账</text>
					<text v-else>商家已同意退款，等待退款到账</text>
				</view>
				<view class="desc">正在退款中，退款将原路返回至支付账户</view>
			</block>
			
			
			<!-- 退款失败 -->
			<block v-if="orderVO.orderState === 8 || orderVO.orderState === 16">
				<view class="state text-bold flex-center">
					<image class="image-state" src="../../../static/images/icons/icon-refund-stop.svg" mode="aspectFill"></image>
					<text>退款失败</text>
				</view>
				<view class="desc">请及时联系商家</view>
			</block>
			
			<!-- 退款完成 -->
			<block v-if="orderVO.orderState === 9">
				<view class="state text-bold flex-center">
					<image class="image-state" src="../../../static/images/icons/icon-refund-gou.svg" mode="aspectFill"></image>
					<text v-if="orderVO.entityGoodsId">商家已收到货，退款成功</text>
					<text v-else>退款成功</text>
				</view>
				<view class="desc">退款将原路返回至支付账户</view>
			</block>
		</view>
		
		<!-- 运单 -->
		<view class="box" v-if="orderVO.orderState !== 11 && orderVO.orderState !== 5 || orderVO.refundDeliveryNum !== null">
			<view class="discount-row">
				<text class="label">退货地址：{{storeAddressVO.receiver}} {{storeAddressVO.receiverPhone}}</text>
			</view>
			<view class="discount-row">
				<text class="label">{{storeAddressVO.storeAddress}}</text>
			</view>
			<view class="discount-row flex-center-between">
				<text class="label">快递单号*</text>
				<input class="input" type="text" placeholder="请输入快递单号" v-model="deliveryNum" :disabled="orderVO.orderState !== 12"/>
			</view>
		</view>
		
		<!-- 商品 -->
		<view class="store">
			<view class="flex-center-between top"><view class="name">退款商品</view></view>
			<view class="content flex">
				<image class="avatar-image" :src="orderVO.thumbnail" mode="aspectFill"></image>
				<view class="flex-column flex-1 right">
					<view class="title">{{orderVO.goodsName}}</view>
					<view class="tag"><view v-if="orderVO.attributesId" class="tag-item">{{orderVO.attributesName}}</view></view>
					<view class="flex-center-between">
						<view class="price">
							<text class="unit">¥</text>
							{{orderVO.goodsPrice}}
						</view>
						<view class="number">×{{orderVO.goodsNum}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 退款原因 -->
		<view class="box discount">
			<view class="discount-title text-bold">退款信息</view>
			<view class="discount-row flex-center-between">
				<text class="label">退款数量*</text>
				<text class="flex-1">{{orderVO.goodsNum}}</text>
			</view>
			<view class="discount-row flex-center-between">
				<text class="label">退款原因*</text>
				<text class="flex-1">{{orderVO.refundMsg}}</text>
			</view>
			<view class="discount-row flex-center-between">
				<text class="label">退款金额*</text>
				<text class="flex-1">¥{{orderVO.refundAmount}}</text>
			</view>
			<view class="discount-row">
				<text class="label">补充描述*</text>
				<view class="remark">{{orderVO.refundAddMsg}}</view>
				<!-- 图片展示 -->
				<uni-file-picker class="image-lists"
				mode="grid" 
				:image-styles="{width:100, height:100}" 
				:readonly="true" 
				:value="refundImgs">
				</uni-file-picker>	
			</view>
		</view>
		<!-- 底部操作按钮 -->
		<view class="bottom">
			<button v-if="orderVO.orderState === 7 || orderVO.orderState === 13" class="edit" @click="editRefund">修改退款申请</button>
			<button v-if="orderVO.orderState === 5 || orderVO.orderState === 11 || orderVO.orderState === 7 || orderVO.orderState === 13" class="btn" @click="openPop('cancelRefundPop')">撤销退款申请</button>
			<button v-if="orderVO.orderState === 12" class="btn" @click="returnSales">提交运单信息</button>
		</view>
		
		<!-- 撤销退款提示弹窗 -->
		<uni-popup ref="cancelRefundPop" type="dialog">
		    <uni-popup-dialog content="是否确认撤销退款申请？" :duration="2000" @confirm="cancelRefund"></uni-popup-dialog>
		</uni-popup>
		
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			orderNum: undefined,
			orderVO: {},
			deliveryNum: undefined, //快递单号
			storeAddressVO: {}, //商家收货地址
			refundImgs:[] //退款照片数组
		};
	},
	computed: {
		// 剩余自动退款的时间
		timeRemaining(){
			const surplusHour = this.orderVO.surplusHour;
			if(surplusHour && surplusHour >= 0){
				const day = surplusHour / 24;
				const hour = surplusHour % 24;
				return `${day}天￥{hour}小时`
			}
		}
	},
	onLoad(option) {
		this.orderNum = option.orderNum;
		this.queryOrderDetail();
	},
	methods: {
		// 查询订单详情
		queryOrderDetail() {
			this.$http.get('/order/queryDetail', { orderNum: this.orderNum }, true).then(res => {
				this.orderVO = res;
				this.deliveryNum = res.refundDeliveryNum;
				this.refundImgs = res.refundImg.map((value)=>{
					let name = this.formatterImgName(value);
					let extname = this.formatterImgType(name);
					return {
						name: name,
						extname: extname,
						url: value
					}
				});
				
				// 只有需要显示运单的几种状态时，才可以查询商家收货地址
				if( res.orderState !== 11 && res.orderState !== 5 || res.refundDeliveryNum !== null){
					this.queryStoreAddress();
				}
			});
		},
		
		// 查询商家收货地址
		queryStoreAddress(){
			this.$http.get('/order/queryStoreAddress', { orderNum: this.orderNum }, true).then(res => {
				this.storeAddressVO = res;
			});
		},
		
		// 取消退款
		cancelRefund(){
			this.$http.post('/order/cancelRefund', { orderNum: this.orderNum }, true).then(res => {
				this.$store.commit('setOrderChange');
				uni.navigateBack();
			});
		},
		// 修改退款信息
		editRefund(){
			uni.redirectTo({
				url: `/pages-user/mine/refund/refund?orderNum=${this.orderNum}`
			});
		},
		// 提交运单信息
		returnSales(){
			if(!(this.deliveryNum && this.deliveryNum.length > 0)){
				this.$tool.showToast("请输入运单号");
				return
			}
			this.$http.post('/order/returnSales', { orderNum: this.orderNum,  deliveryNum: this.deliveryNum}, true).then(res => {
				this.$store.commit('setOrderChange');
				this.queryOrderDetail();
			});
		},
		
		/**
		 * 打开弹窗
		 * @param {Object} popName 弹窗名
		 */
		openPop(popName){
			this.$refs[popName].open();
		},
		
		/**
		 * 通过url获取图片名
		 * @param {Object} path  图片在服务器上的url地址
		 */
		formatterImgName(path){
			let filename;
			if (path.indexOf("/") > 0) //如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
			{
				filename = path.substring(path.lastIndexOf("/") + 1, path.length);
			} else {
				filename = path;
			}
			return filename;	
		},
		
		/**
		 * 根据图片名获取图片类型
		 * @param {Object} name 图片名
		 */
		formatterImgType(name){
			var index= name.lastIndexOf(".");
			var ext = name.substr(index+1);
			return ext;
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
