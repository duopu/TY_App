<template>
	<view class="classify-page">
		<view class="pdhead">
			<view class="head bflex">
				<input class="search-input" confirm-type="search" type="text" value="" />
				<view class="search-btn" @click="searched = 1;">
					搜索
				</view>
			</view>
		</view>



		<!-- 已搜索 -->
		<view class="searched">
			<view class="filter">
				<view class="tabs fl aln">
					<view class="tab">
						<view class="">
							综合排序
						</view>
						<image class="filter-icon" src="../../assets/imgs/active/down.png" mode=""></image>
					</view>
					<view class="tab">
						<view class="">
							云计算
						</view>
					</view>
					<view class="tab">
						<view class="" @click="open()">
							筛选
						</view>
					</view>
				</view>

				<!-- 筛选 -->
				<view class="filter-content" v-if="false">
					<view class="cnt bgw pd">
						<view class="sort" v-if="flase">
							<view class="li fl aln">
								<view class="dui">
									<image src="../../assets/imgs/active/dui1@2x.png" mode=""></image>
								</view>
								综合
							</view>
							<view class="li fl aln">
								<view class="dui">
									<image src="../../assets/imgs/active/dui1@2x.png" mode=""></image>
								</view>
								销量降序
							</view>
							<view class="li fl aln">
								<view class="dui">
									<image src="../../assets/imgs/active/dui1@2x.png" mode=""></image>
								</view>
								销量升序
							</view>
							<view class="li fl aln">
								<view class="dui">
									<image src="../../assets/imgs/active/dui1@2x.png" mode=""></image>
								</view>
								价格降序
							</view>
							<view class="li fl aln">
								<view class="dui">
									<image src="../../assets/imgs/active/dui1@2x.png" mode=""></image>
								</view>
								价格升序
							</view>
						</view>

						<view class="cloud fl">
							<view class="li" :class="item == 1? 'act':''" v-for="item in 18" :key='item'>
								一级类目
							</view>
						</view>
						<view class="fil">
							
						</view>
					</view>
				</view>
			</view>

			<view class=" pdlr">
				<view class="kcb">
					<view class="live kec">
						<view class="bea">
							<view class="item fl aln bet" v-for="index in 3" :key='index'>
								<image class="preview" src="../../assets/imgs/index/smbanner.png" mode=""></image>
								<view class="info">
									<view class="title">
										幼儿美术基础(免费特级/少儿美术/儿童绘画/随到随学)
									</view>
									<view class="bottom fl aln">
										<view class="price">
											￥500
										</view>
										<view class="desc">
											最近30人报名
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<uni-popup ref="popup" type="right">
			<view class="types">
				<view class="title">
					我的兴趣
				</view>
				<view class="content">
					<view class="item">
						<view class="item-title">
							热门分类
						</view>
						<view class="fl aln bet item-content">
							<view class="datum" v-for="index  in 8" :key='index'>
								<image class="item-a" src="../../assets/imgs/index/avatar.jpg"
									mode=""></image>
								<view class="name">
									名称
								</view>
							</view>
						</view>
					</view>
				</view>
		
				<view class="btn" @click="close()">
					确定
				</view>
		
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				filterShow: true
			};
		},
		methods: {
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="less">
	@import url('../../assets/css/classify.less');
</style>
