<!-- 配送至 -->
<template>
	<view class="address">
		<!-- 列表 -->
		<scroll-view scroll-y="auto" class="address-lists address-content">
			<block v-if="defaultAddress && defaultAddress.id">
				<!-- 当前配送地址 -->
				<view class="title">当前配送地址</view>
				<!-- 地址 -->
				<address-lists-item :data="defaultAddress" 
				@deleteAddress="deleteAddress(defaultAddress.id)" 
				@setDefault="setDefaultAddress(defaultAddress)" 
				@editClick="goAddAddress(defaultAddress)" 
				@itemClick="setCurrentSelectAddress(defaultAddress)"></address-lists-item>
			</block>
			
			<block v-if="otherAddressList.length > 0">
				<!-- 我的其他收货地址 -->
				<view class="title">我的其他收货地址</view>
				<!-- 地址 -->
				<block v-for="(item, index) in otherAddressList" :key="`other-address-${index}`">
					<address-lists-item :data="item" 
					@deleteAddress="deleteAddress(item.id)" 
					@setDefault="setDefaultAddress(item)" 
					@editClick="goAddAddress(item)"
					@itemClick="setCurrentSelectAddress(item)"></address-lists-item>
				</block>
			</block>
			
			<view class="slot-item"></view>
		</scroll-view>
		<!-- 底部 -->
		<view class="address-bottom"><button class="btn btn-block" @click="goAddAddress()">添加收货地址</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			defaultAddress:this.$store.state.defaultAddress, //当前收货地址
			otherAddressList:[] //其他收货地址
		};
	},
	onLoad() {
		this.getAddresList();
	},
	methods:{
		
		// 查询用户收货地址
		getAddresList(){
			this.$http
				.get('/address/queryList', {}, true)
				.then(res => {
					if(res){
						let addressList = [];
						for(var i=0; i<res.length; i++){
							if(res[i].isDefault === 1){
								if(!this.defaultAddress){
									this.defaultAddress = res[i];
								}else if(this.defaultAddress.id !== res[i].id){
									addressList.push(res[i]);
								}
							}else {
								if(this.defaultAddress === undefined || res[i].id !== this.defaultAddress.id){
									addressList.push(res[i]);
								}
							}
						}
						this.otherAddressList = addressList;
					}else {
						// 这里如果用户的地址是空的，记得把默认地址给清空掉
						this.$store.commit('setDefaultAddress',{});
					}
				});
		},
		
		/**
		 * 删除用户地址
		 * @param {Object} id 地址ID
		 */
		deleteAddress(id){
			uni.showModal({
				title: '提示',
				content: '是否确定删除当前地址',
				confirmText: '确定',
				cancelText: '取消',
				success: res => {
					if (res.confirm) {
						this.$http
							.post('/address/delete', {id:id}, true)
							.then(res => {
								this.getAddresList();
							});
					}
				}
			});
		},
		
		/**
		 * 设置当前地址为默认地址
		 * @param {Object} address
		 */
		setDefaultAddress(address){
			address.isDefault = 1;
			this.$http
				.post('/address/save', address, true)
				.then(res => {
					this.getAddresList();
				});
		},
		
		/**
		 * 跳转到新增/修改地址页面
		 */
		goAddAddress(address){
			let that = this;
			uni.navigateTo({
				url: `/pages-user/index/address/add-address`,
				events: {
				    addressSaveSuccess: function() {
				      that.getAddresList();
				    }
				},
				success: function(res) {
				    // 通过eventChannel向被打开页面传送数据
					if(address){
						res.eventChannel.emit('addressVO', address)
					}
				 }
			});
		},
		
		/**
		 * 地址被点击
		 * @param {Object} address
		 */
		setCurrentSelectAddress(address){
			this.defaultAddress = address;
			this.$store.commit('setDefaultAddress',address);
			uni.navigateBack();
		}
		
	}
};
</script>

<style src="./style.less" lang="less"></style>
