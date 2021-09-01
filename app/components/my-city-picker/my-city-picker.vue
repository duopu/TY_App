<template>
	<uni-popup ref="popup" :safeArea="false" type="bottom">
		<view class="popup">
			<view class="picker-btn">
				<view class="left" @click="close">取消</view>
				<view class="right" @click="confirm">确定</view>
			</view>
			<picker-view class="picker-view" :indicator-style="indicatorStyle" :value="valueArr" @change="bindChange">
				<picker-view-column>
					<view class="item" v-for="(item,index) in province" :key="index">{{item.name}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in city" :key="index">{{item.name}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in area" :key="index">{{item.name}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in street" :key="index">{{item.name}}</view>
				</picker-view-column>
			</picker-view>
		</view>		
	</uni-popup>

</template>

<script>
	export default {
		name:"my-city-picker",
		emits:['submit'],
		props: {
			data:{ //当前选中的省市区街道code码
				type:Array
			}
		},
		data() {
			return {
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`, //每行的高度
				valueArr: [0, 0, 0, 0], // 当前选中各列的下标
				province: [] // 省市区街道结构树  例如[{code:1,name:'北京',children:[]}]
			};
		},
		computed:{
			city:function(){
				var cityList = [];
				if(this.province.length > 0 && this.province[this.valueArr[0]] && this.province[this.valueArr[0]].children){
					cityList = this.province[this.valueArr[0]].children;
				}
				return cityList;
			},
			area:function(){
				var areaList = [];
				if(this.province.length > 0 && this.province[this.valueArr[0]] && this.province[this.valueArr[0]].children && this.province[this.valueArr[0]].children[this.valueArr[1]] && this.province[this.valueArr[0]].children[this.valueArr[1]].children){
					areaList = this.province[this.valueArr[0]].children[this.valueArr[1]].children;
				}
				return areaList;
			},
			street:function(){
				var streetList = [];
				if(this.province.length > 0 && this.province[this.valueArr[0]] && this.province[this.valueArr[0]].children && this.province[this.valueArr[0]].children[this.valueArr[1]] && this.province[this.valueArr[0]].children[this.valueArr[1]].children && this.province[this.valueArr[0]].children[this.valueArr[1]].children[this.valueArr[2]] && this.province[this.valueArr[0]].children[this.valueArr[1]].children[this.valueArr[2]].children){
					streetList = this.province[this.valueArr[0]].children[this.valueArr[1]].children[this.valueArr[2]].children;
				}
				return streetList;
			}
		},
		watch:{
			province(newV, oldV){
				if(this.data && this.data.length === 3){
					for(let i=0; i< newV.length; i++){
						if(newV[i].code === this.data[0]){
							this.valueArr[0] = i;
							
							for(let j=0; j<newV[i].children.length; j++){
								if(newV[i].children[j].code === this.data[1]){
									this.valueArr[1] = j;
									
									for(let k=0; k<newV[i].children[j].children.length;k++){
										if(newV[i].children[j].children[k].code === this.data[2]){
											this.valueArr[2] = k;
											
											for(let l=0; l<newV[i].children[j].children[k].children.length; l++){
												if(newV[i].children[j].children[k].children[l].code === this.data[3]){
													this.valueArr[3] = l;
													break;
												}
											}
											
											break;
										}
									}
									break
								}
								
							}
							break;
						}
					}
				}
			}
		},
		created() {
			this.initLoadArea();
		},
		methods:{
			
			open() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			},
			
			// 加载省数据
			initLoadArea() {
				this.$http
					.get('/sysArea/queryProvinceList', {}, true)
					.then(res => {
						this.province = res;
						if(res && res.length > 0){
							this.loadCity(this.province[0].code)
						}
					});
			},
			
			// 加载市数据
			loadCity(provinceCode) {
				this.$http
					.get('/sysArea/queryCityList', {province:provinceCode}, true)
					.then(res => {
						if(res && res.length > 0){
							if (this.province[this.valueArr[0]].children === undefined) {
								this.$set(this.province[this.valueArr[0]], 'children', [])
								res.forEach(item => {
									this.province[this.valueArr[0]].children.push(item)
								})
								this.loadArea(this.province[this.valueArr[0]].children[this.valueArr[1]].code)
							}
						}
					});
			},
			
			// 加载区数据
			loadArea(cityCode) {
				this.$http
					.get('/sysArea/queryDistrictList', {city:cityCode}, true)
					.then(res => {
						if(res && res.length > 0){
							if (this.province[this.valueArr[0]].children[this.valueArr[1]].children === undefined) {
								this.$set(this.province[this.valueArr[0]].children[this.valueArr[1]], 'children', [])
								res.forEach(item => {
									this.province[this.valueArr[0]].children[this.valueArr[1]].children.push(item)
								})
								this.loadStreet(this.province[this.valueArr[0]].children[this.valueArr[1]].children[this.valueArr[2]].code)
							}
						}
					});
			},
			
			// 加载街道数据
			loadStreet(areaCode){
				this.$http
					.get('/sysArea/queryStreetList', {area :areaCode}, true)
					.then(res => {
						if(res && res.length > 0){
							if (this.province[this.valueArr[0]].children[this.valueArr[1]].children[this.valueArr[2]].children === undefined) {
								this.$set(this.province[this.valueArr[0]].children[this.valueArr[1]].children[this.valueArr[2]], 'children', [])
								res.forEach(item => {
									this.province[this.valueArr[0]].children[this.valueArr[1]].children[this.valueArr[2]].children.push(item)
								})
							}
						}
					});
			},
			
			bindChange(e) {
				const val = e.detail.value;
				if (this.valueArr[0] !== val[0] && this.province[val[0]].children === undefined) {
					this.loadCity(this.province[val[0]].code)
				} else if (this.valueArr[1] !== val[1] && this.province[val[0]].children[val[1]].children === undefined) {
					this.loadArea(this.province[val[0]].children[val[1]].code)
				} else if (this.valueArr[2] !== val[2] && this.province[val[0]].children[val[1]].children[val[2]].children === undefined){
					this.loadStreet(this.province[val[0]].children[val[1]].children[val[2]].code)
				}
				this.valueArr = val
			},
			
			/**
			 * 确定
			 */
			confirm(){
				let cityVO = {
					provinceCode: this.province[this.valueArr[0]].code,
					provinceName: this.province[this.valueArr[0]].name,
					cityCode: this.province[this.valueArr[0]].children[this.valueArr[1]].code,
					cityName: this.province[this.valueArr[0]].children[this.valueArr[1]].name,
					areaCode: this.province[this.valueArr[0]].children[this.valueArr[1]].children[this.valueArr[2]].code,
					areaName: this.province[this.valueArr[0]].children[this.valueArr[1]].children[this.valueArr[2]].name,
					streetCode: this.province[this.valueArr[0]].children[this.valueArr[1]].children[this.valueArr[2]].children[this.valueArr[3]].code,
					streetName: this.province[this.valueArr[0]].children[this.valueArr[1]].children[this.valueArr[2]].children[this.valueArr[3]].name
				}
				this.$emit("submit",cityVO)
				this.close();
			}
			
		}
	}
</script>

<style lang="less" src="./style.less"></style>
