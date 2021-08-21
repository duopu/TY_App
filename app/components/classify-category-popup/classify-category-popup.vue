<!-- 选择分类组件 -->
<template>
	<uni-popup class="coustom-popup" :type="'bottom'" ref="popup" :safe-area="false">
		<view class="popup-wrapper">
			<!-- 标题 -->
			<view class="popup-title text-bold">我的兴趣</view>
			<!-- 列表 -->
			<scroll-view :scroll-y="true" class="popup-content">
				<view class="subtitle text-bold">热门分类</view>
				<view class="category-lists flex-center">
					<view class="item flex-column-center" :class="{on:isItemSelect(item.categoryId)}"
						v-for="(item, index) in hotCategoryVOList" :key="item.categoryId" @click="itemClick(item)">
						<image class="icon" :src="item.img" mode="aspectFill"></image>
						<text class="text-ellipsis text">{{item.categoryName}}</text>
					</view>
				</view>
				<block v-for="(item, index) in categoryVOList" :key="item.categoryId">
					<view class="subtitle text-bold">{{item.categoryName}}</view>
					<view class="category-lists flex-center">
						<view class="item flex-column-center" :class="{on:isItemSelect(node.categoryId)}"
							v-for="(node, nodeIndex) in item.nodes" :key="node.categoryId" @click="itemClick(node)">
							<image class="icon" :src="node.img" mode="aspectFill"></image>
							<text class="text-ellipsis text">{{node.categoryName}}</text>
						</view>
					</view>
				</block>
			</scroll-view>
			<!-- 底部 -->
			<view class="flex-center-center popup-bottom"><button class="btn text-bold" @click="submit">确定</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		name: 'classify-category-popup',
		emits: ['submitSuccess'],
		props: {
			data: {
				type: Object,
				default () {
					return {
						hotCategoryVOList: [], //热门分类
						interestCategoryVOList: [], //我的兴趣分类
						categoryVOList: [] //分类
					}
				}
			}
		},
		data() {
			return {
				hotCategoryVOList: this.data.hotCategoryVOList.concat([]),
				interestCategoryVOList: this.data.interestCategoryVOList.concat([]),
				categoryVOList: this.data.categoryVOList.concat([])
			};
		},
		watch: {
			data: { //深度监听，可监听到对象、数组的变化
				handler(newV, oldV) {
					// do something, 可使用this
					this.hotCategoryVOList = newV.hotCategoryVOList.concat([]);
					this.interestCategoryVOList = newV.interestCategoryVOList.concat([]);
					this.categoryVOList = newV.categoryVOList.concat([]);
				},
				deep: true
			}
		},
		methods: {
			// 打开弹窗
			open() {
				this.$refs.popup.open();
			},
			// 关闭弹窗
			close() {
				this.$refs.popup.close();
			},

			/** 判断当前分类是否是用户已感兴趣的分类
			 * @param {Object} categoryId
			 * @return {boolean} 选中或者没选中
			 */
			isItemSelect(categoryId) {
				var v = this.interestCategoryVOList.find(item => item.categoryId == categoryId)
				return v ? true : false
			},

			/** 类型点击
			 * @param {Object} item
			 */
			itemClick(item) {
				if (this.isItemSelect(item.categoryId)) {
					var deletIndex = this.interestCategoryVOList.findIndex(value => value.categoryId === item.categoryId)
					this.interestCategoryVOList.splice(deletIndex, 1);
				} else {
					this.interestCategoryVOList.push(item);
				}
			},

			// 提交
			submit() {
				let categoryIds = this.interestCategoryVOList.map(item => {
					return item.categoryId
				})
				// 保存感兴趣的类型
				this.$http.post('/category/interested', {
					categoryId: categoryIds
				}, true).then(res => {
					this.$emit('submitSuccess');
					this.close();
				})
			}
		}

	};
</script>

<style lang="less" src="./style.less"></style>
