<!-- 配送至 -->
<template>
	<view class="address">
		<!-- 列表 -->
		<scroll-view scroll-y="auto" class="address-content add-address">
			<view class="form-address">
				<view class="row">
					<text class="label text-bold">收货人</text>
					<input type="text" placeholder-class="input-placeholder"  class="input border-bottom" placeholder="名字" v-model="form.name"/>
				</view>
				<view class="row">
					<text class="label text-bold">手机号码</text>
					<input type="text" placeholder-class="input-placeholder"  class="input border-bottom" placeholder="手机号" v-model="form.phone"/>
				</view>
				<view class="row">
					<text class="label text-bold">选择地区</text>
					<view class="border-bottom flex-1 flex-center">
						<input type="text" placeholder-class="input-placeholder" class="input" :placeholder="'省、市、区'" :disabled="true" :value="cityAddress" @click="openCityPicker"/>
						<image class="icons" src="../../../static/images/icons/icon-light-arrow.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="row">
					<text class="label text-bold">详细地址</text>
					<view class="textarea-bottom flex flex-1">
						<textarea placeholder-class="input-placeholder" class="textarea flex-1" placeholder="小区楼栋/乡村名称" v-model="form.address"/>
						<button class="btn-text" @click="getLocation">定位</button>
					</view>
				</view>
				<view class="flex-center row">
					<text class="label text-bold">设为默认地址</text>
					<view class="radio" :class="{on:form.isDefault === 1}" @click="setDefaultAddress"></view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部 -->
		<view class="address-bottom"><button class="btn btn-block" @click="saveAddress">保存</button></view>
		
		
		<my-city-picker ref="myCityPicker" :data="[form.provinceCode, form.cityCode, form.areaCode, form.streetCode]" @submit="citySubmit"></my-city-picker>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				id:undefined,
				name:undefined,
				phone:undefined,
				streetCode:undefined,
				streetName:undefined,
				areaCode:undefined,
				areaName:undefined,
				cityCode:undefined,
				cityName:undefined,
				provinceCode:undefined,
				provinceName:undefined,
				address:undefined,
				isDefault:1,
			}
		};
	},
	computed:{
		// 省市区地址回显字段
		cityAddress:function(){
			var str = undefined;
			if(this.form.provinceName && this.form.cityName && this.form.areaName && this.form.streetName){
				str = `${this.form.provinceName} ${this.form.cityName} ${this.form.areaName} ${this.form.streetName}`;
			}
			return str;
		}
	},
	onLoad(option) {
		let that = this;
		const eventChannel = this.getOpenerEventChannel();	 
		// 获取上个页面传过来的配送地址对象
		eventChannel.on('addressVO', function(data) {
			that.form = data;
		}) 
	},
	methods:{  
		openCityPicker(){
			this.$refs.myCityPicker.open();
		},
		
		/**
		 * 省市区选择确定回调
		 * @param {Object} cityVO  省市区对象
		 */
		citySubmit(cityVO){
			console.log("cityVO ==",cityVO);
			this.form = {...this.form, ...cityVO};
		},
		
		// 设置为默认地址
		setDefaultAddress(){
			this.form.isDefault = this.form.isDefault === 1 ? 0 : 1;
		},
		
		// 定位
		getLocation(){
			uni.getLocation({
			    type: 'wgs84',
				geocode: true,
			    success: function (res) {
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
					console.log('当前位置的地址信息：' + res.address);
			    }
			});
		},
		
		// 保存配送地址信息
		saveAddress(){
			console.log("this.form == ",this.form);
			if(!this.form.name){
				this.$tool.showToast("请输入收货人姓名");
				return
			}
			
			if(!this.form.phone){
				this.$tool.showToast("请输入手机号码");
				return
			}
			
			if(!this.cityAddress){
				this.$tool.showToast("请选择地区");
				return
			}
			
			if(!this.form.address){
				this.$tool.showToast("请输入详细地址");
				return
			}
			this.$http
				.post('/address/save', this.form, true)
				.then(res => {
					// 通知上个页面进行刷新
					const eventChannel = this.getOpenerEventChannel();	 
					eventChannel.emit('addressSaveSuccess');
					uni.navigateBack();
				});
		}
	}
};
</script>

<style src="./style.less" lang="less"></style>
