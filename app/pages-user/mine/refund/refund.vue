<!-- 退款服务 -->
<template>
	<scroll-view scroll-y="true" class="refund">
		<view class="store">
			<view class="flex-center-between top"><view class="name">退款商品</view></view>
			<view class="content flex">
				<image class="avatar-image" :src="orderVO.thumbnail" mode="aspectFill"></image>
				<view class="flex-column flex-1 right">
					<view class="title">{{ orderVO.goodsName }}</view>
					<view class="tag">
						<view v-if="orderVO.attributesId" class="tag-item">{{ orderVO.attributesName }}</view>
					</view>
					<view class="flex-center-between">
						<view class="price">
							<text class="unit">¥</text>
							{{ orderVO.goodsPrice }}
						</view>
						<view class="number">×{{ orderVO.goodsNum }}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 退款原因 -->
		<view class="box discount">
			<view class="discount-row flex-center-between">
				<text class="label">退款数量*</text>
				<text class="flex-1">{{ orderVO.goodsNum }}</text>
			</view>
			<view class="discount-row flex-center-between">
				<text class="label">退款原因*</text>
				<picker mode="selector" class="flex-1" :range="reasonList" range-key="reason" :value="reasonIndex" @change="bindPickerChange">
					<view :class="{ 'color-9': reasonIndex === undefined }">{{ reasonIndex !== undefined ? reasonList[reasonIndex].reason : '请选择' }}</view>
				</picker>
				<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-light-arrow.png"></image>
			</view>
			<view class="discount-row flex-center-between" @click="openRefundAmount">
				<text class="label">退款金额*</text>
				<text class="flex-1">¥{{ refundParams.refundAmount }}</text>
				<image class="icon-arrow" mode="aspectFill" src="../../../static/images/icons/icon-light-arrow.png"></image>
			</view>
			<view class="discount-row">
				<text class="label">补充描述</text>
				<textarea class="textarea" placeholder="请详细描述退款原因及要求" placeholder-class="input-placeholder" :auto-height="true" v-model="refundParams.refundAddMsg" />
			</view>
			<uni-file-picker class="image-lists" limit="3" mode="grid" :image-styles="{ width: 98, height: 98 }" :value="refundImgs" @select="selectImg" @delete="deleteImg">
				<view class="flex-center-center image-item"><image class="icon-carme" src="../../../static/images/icons/icon-carme.svg" mode="aspectFill"></image></view>
			</uni-file-picker>
		</view>
		<!-- 提交退款 -->
		<view class="bottom"><button class="btn" @click="applyRefund">提交退款申请</button></view>
		<!-- 退款金额弹窗 -->
		<uni-popup ref="refundAmountPop" type="dialog">
			<uni-popup-dialog
				mode="input"
				title="退款金额"
				:duration="2000"
				:beforeClose="true"
				:value="refundParams.refundAmount"
				@confirm="refundAmountConfirm"
				@close="
					() => {
						$refs.refundAmountPop.close();
					}
				"
			></uni-popup-dialog>
		</uni-popup>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			orderNum: undefined, //订单编号
			orderVO: {}, //订单对象
			reasonList: [], //退款原因
			reasonIndex: undefined, //当前选择的退款原因下标
			refundParams: {
				orderNum: undefined,
				refundAmount: 0,
				refundImg: [],
				refundMsg: undefined,
				refundAddMsg: undefined
			},
			refundUploadImgs: [], //退款原因图片上传数组
			refundImgs: [] //编辑时退款照片数组
		};
	},
	onLoad(option) {
		this.orderNum = option.orderNum;
		this.queryCancelReason();
		this.queryOrderDetail();
	},
	methods: {
		// 查询订单详情
		queryOrderDetail() {
			this.$http.get('/order/queryDetail', { orderNum: this.orderNum }, true).then(res => {
				this.orderVO = res;
				this.refundParams.orderNum = res.orderNum;
				this.refundParams.refundAmount = res.refundAmount || res.payAmount;
				this.refundParams.refundMsg = res.refundMsg;
				this.refundParams.refundAddMsg = res.refundAddMsg;
				this.refundParams.refundImg = res.refundImg;
				
				this.refundImgs = [];
				this.refundUploadImgs = [];
				for(var i=0; i< res.refundImg || []; i++){
					let name = this.formatterImgName(res.refundImg[i]);
					let extname = this.formatterImgType(name);
					this.refundImgs.push({
						name: name,
						extname: extname,
						url: res.refundImg[i]
					});
					this.refundUploadImgs.push({
						tempFilePath: res.refundImg[i],
						serviceFilePath: res.refundImg[i]
					});
				}
				// this.refundImgs = res.refundImg && res.refundImg.map(value => {
				// 	let name = this.formatterImgName(value);
				// 	let extname = this.formatterImgType(name);
				// 	return {
				// 		name: name,
				// 		extname: extname,
				// 		url: value
				// 	};
				// });
				// this.refundUploadImgs = res.refundImg && res.refundImg.map(value => {
				// 	return {
				// 		tempFilePath: value,
				// 		serviceFilePath: value
				// 	};
				// });
				if (res.refundMsg && res.refundMsg.length > 0) {
					for (var i = 0; i < this.reasonList.length; i++) {
						if (this.reasonList[i].reason === res.refundMsg) {
							this.reasonIndex = i;
						}
					}
				}
			});
		},
		// 查询退款原因
		queryCancelReason() {
			this.$http.get('/order/queryCancelReason', {}, true).then(res => {
				this.reasonList = res;
			});
		},
		// 退款原因选择回调
		bindPickerChange(e) {
			this.reasonIndex = e.target.value;
			this.refundParams.refundMsg = this.reasonList[e.target.value].reason;
		},
		// 打开退款金额弹窗
		openRefundAmount() {
			this.$refs.refundAmountPop.open();
		},

		refundAmountConfirm(value) {
			console.log('value == ', value);
			let reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/; //判断是否是正数
			if (!reg.test(value)) {
				this.$tool.showToast('请输入正确的退款金额');
				return;
			} else if (parseFloat(value) === 0) {
				this.$tool.showToast('退款金额必须大于0');
				return;
			} else {
				this.refundParams.refundAmount = parseFloat(value);
				this.$refs.refundAmountPop.close();
			}
		},

		// 图片选择回调
		selectImg(e) {
			let formData = {
				file: e.tempFiles[0].file,
				path: e.tempFilePaths[0]
			};
			this.$http.upload(formData, true).then(res => {
				this.refundUploadImgs.push({
					tempFilePath: formData.path, //本地文件路径
					serviceFilePath: res //上传到服务器后的文件路径
				});
			});
		},

		// 图片删除回调
		deleteImg(e) {
			for (var i = 0; i < this.refundUploadImgs.length; i++) {
				if (this.refundUploadImgs[i].tempFilePath === e.tempFilePath) {
					this.refundUploadImgs.splice(i, 1);
				}
			}
		},

		// 申请退款
		applyRefund() {
			if (!(this.refundParams.refundMsg && this.refundParams.refundMsg.length > 0)) {
				this.$tool.showToast('请选择退款原因');
				return;
			}

			if(this.refundParams.refundAmount < 0){
				this.$tool.showToast("退款金额不能小于0");
				return;
			}

			let orginRefundAmount = this.orderVO.refundAmount || this.orderVO.payAmount;
			if (this.refundParams.refundAmount > orginRefundAmount) {
				this.$tool.showToast('退款金额不能超过支付金额');
				return;
			}

			this.refundParams.refundImg = this.refundUploadImgs.map(function(value) {
				return value.serviceFilePath;
			});

			this.$http.post('/order/applyRefund', this.refundParams, true).then(res => {
				this.$store.commit('setOrderChange');
				uni.redirectTo({
					url: `/pages-user/mine/refund/details?orderNum=${this.orderNum}`
				});
			});
		},

		/**
		 * 通过url获取图片名
		 * @param {Object} path  图片在服务器上的url地址
		 */
		formatterImgName(path) {
			let filename;
			if (path.indexOf('/') > 0) {
				//如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
				filename = path.substring(path.lastIndexOf('/') + 1, path.length);
			} else {
				filename = path;
			}
			return filename;
		},

		/**
		 * 根据图片名获取图片类型
		 * @param {Object} name 图片名
		 */
		formatterImgType(name) {
			var index = name.lastIndexOf('.');
			var ext = name.substr(index + 1);
			return ext;
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
