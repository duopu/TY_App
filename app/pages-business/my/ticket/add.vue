<!-- 添加优惠券 -->
<template>
	<view class="add-ticket">
		<view class="add-ticket-top flex-center">
			<text class="color-9">取消</text>
			<text class="title text-bold">创建优惠券</text>
			<text @click="createdTicket">创建</text>
		</view>
		<!-- 内容 -->
		<scroll-view class="add-ticket-content" scroll-y="true">
			<view class="box">
				<view class="row flex-center">
					<text class="label">优惠劵名称:</text>
					<input type="text" @blur="fromChange" data-key="couponName" class="border input" placeholder-class="input-placeholder" placeholder="请输入" />
				</view>
				<view class="row flex-center">
					<text class="label">面值:</text>
					<input type="number" @blur="fromChange" data-key="couponAmount"  class="border money input" />
				</view>
				<view class="row">
					<text class="label">订单金额:</text>
					<view class="flex-center m-top-8">
						<view class="radio flex-center">
							<text class="radio-circle" @click="radioIndex = 1" v-bind:class="radioIndex === 1 ? 'on' : ''"></text>
							<text class="desc">不限制</text>
						</view>
						<view class="radio flex-center">
							<text class="radio-circle" @click="radioIndex = 2" v-bind:class="radioIndex === 2 ? 'on' : ''"></text>
							<text class="desc">满</text>
							<input type="number" @blur="fromChange" data-key="couponConditionAmount" class="border money input" />
							<text class="desc">元可使用</text>
						</view>
					</view>
				</view>
				<view class="row flex-center">
					<text class="label">发放总量:</text>
					<input type="number" @blur="fromChange" data-key="couponCount" class="border money input" />
					<text class="desc">张</text>
				</view>
				<view class="row">
					<view class="flex">
						<view class="radio flex-center">
							<text class="radio-circle" @click="timeRadio = 1" v-bind:class="timeRadio === 1 ? 'on' : ''"></text>
						</view>
						<view>
							<view class="label">优惠券使用开始日期~优惠券使用结束日期</view>
							<view class="flex-center m-top-8 flex-1">
								<picker mode="date" class="border" @change="fromChange" data-key="effectStartDate">
									<view>{{ ticketFormData.effectStartDate }}</view>
								</picker>
								<text class="middle">~</text>
								<picker mode="date" class="border" @change="fromChange" data-key="effectEndDate">
									<view>{{ ticketFormData['effectEndDate'] }}</view>
								</picker>
							</view>
						</view>
					</view>
					<view class="radio flex-center" style="margin-top: 10px">
						<text class="radio-circle" @click="timeRadio = 2" v-bind:class="timeRadio === 2 ? 'on' : ''"></text>
						<text class="desc">领券当日起</text>
						<input type="number" @blur="fromChange" data-key="effectValue" class="border money input" />
						<text class="desc">天内可用</text>
					</view>
				</view>
<!--				<view class="row flex-center">-->
<!--					<text class="label stick-width">优惠劵类型:</text>-->
<!--					<view class="input border flex-center-between">-->
<!--						<picker mode="selector" class="flex-1" @change="onChange" data-type="type"  :value="typeIndex" range-key="name" :range="typeRange">-->
<!--							<view class="uni-input">{{typeRange[typeIndex].name}}</view>-->
<!--						</picker>-->
<!--						<image class="icon-down" src="../../../static/images/icons/icon-down-arrow.svg" mode="aspectFill"></image>-->
<!--					</view>-->
<!--				</view>-->
				<view class="row flex-center">
					<text class="label stick-width">推广渠道:</text>
					<view class="input border flex-center-between">
						<picker mode="selector" class="flex-1" @change="onChange" data-type="channel"  :value="channeIndex" range-key="name" :range="channelRange">
							<view class="uni-input">{{channelRange[channeIndex].name}}</view>
						</picker>
						<image class="icon-down" src="../../../static/images/icons/icon-down-arrow.svg" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row flex-center">
					<text class="label stick-width">适用范围:</text>
					<view class="input border flex-center-between">
						<picker mode="selector" class="flex-1" @change="onChange" data-type="apply" :value="applyIndex" range-key="name" :range="applyRange">
							<view class="uni-input">{{applyRange[applyIndex].name}}</view>
						</picker>
						<image class="icon-down" src="../../../static/images/icons/icon-down-arrow.svg" mode="aspectFill"></image>
					</view>
				</view>

				<view class="row flex-center" v-if="applyIndex === 1" @click="jump(1)">
					<text class="label stick-width">选择商品:</text>
					<view class="input border flex-center-between">
						{{ selectedGoods.map(item => item.goodsName).join(',') }}
						<image class="icon-down" src="../../../static/images/icons/icon-down-arrow.svg" mode="aspectFill"></image>
					</view>
				</view>

				<view class="row flex-center">
					<text class="label stick-width">优惠劵说明:</text>
					<input type="text" class="border input" @blur="fromChange" data-key="ruleDescription"  placeholder-class="input-placeholder" placeholder="请输入" />
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
let typeRangeArray = [
	{ name: '日常优惠', key: 1 },
	{ name: '推广促销', key: 2 },
];
let channelRangeArray = [
	{ name: '全网推广', key: 1 },
	{ name: '自有渠道推广', key: 2 },
];
let applyRangeArray = [
	{ name: '全站', key: 1 },
	{ name: '固定商品', key: 2 },
];
export default {
	data() {
		return {
			radioIndex: 1,
			typeRange: typeRangeArray,
			channelRange: channelRangeArray,
			applyRange: applyRangeArray,
			selectedGoods: [],
			typeIndex: 0,
			channeIndex: 0,
			applyIndex: 0,
			timeRadio: 1,
			ticketFormData: {},
			goodList: []
		};
	},
	onLoad(){
		console.log(32222);
		this.queryGoodList();
		uni.$on('selectCallBack',(data)=>{
			console.log('拿到了');
			console.log(data);
			this.selectedGoods = data;
		})
	},
	methods: {
		// 查询优惠劵类型
		queryTicketTypeList(){

		},

		// 查询推广渠道列表
		queryTicket() {
		},

		// select 切换回掉处理
		onChange(event){
			switch (event.target.dataset.type){
				case 'type':
					this.typeIndex = event.detail.value;
					// this.ticketFormData[objectKey] = event.detail.value;
					break;
				case 'channel':
					this.channeIndex = event.detail.value;
					break
				case 'apply':
					this.applyIndex = event.detail.value;
					break;
				case 'goods':
					this.applyIndex = event.detail.value;
					break;
			}
		},

		// 数据处理
		fromChange(event){
			let objectKey = event.target.dataset.key;
			console.log(event);
			this.ticketFormData[objectKey] = event.detail.value;
			this.ticketFormData = { ...this.ticketFormData }
		},

		// 创建优惠券
		createdTicket(){
			let params = {
				...this.ticketFormData,
				couponType: this.radioIndex,
				channeIndex: this.channeIndex,
				effectType: this.timeRadio,
				promoteType	: this.timeRadio,
				goodsType: this.applyRange[this.applyIndex].key,
				goodsIdList: [],
				type: 2
			};

			if(params.effectType == 1) {
				delete params.effectValue
			}else{
				delete params.effectStartDate
				delete params.effectEndDate
			}

			this.$http.post('/coupon/create',params).then(res => {
				uni.redirectTo({
					url:`/pages-business/my/ticket/ticket`
				})
			})

		},

		// 查询已上架商品列表
		queryGoodList(params){
			this.$http.get('/goods/queryPageByStoreId',{page: 1,size: 9999, status: 1},true).then(res =>{
				this.goodList = res.content;
			})
		},

		//
		selectedChange(data){
			console.log(data);
			this.selectedGoods = data;
		},
		jump(type){
			uni.navigateTo({
				url: '/pages-business/my/ticket/select-goods'
			});
		}
	},
};
</script>

<style lang="less" src="./style.less"></style>
