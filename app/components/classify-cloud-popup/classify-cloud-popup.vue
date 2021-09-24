<!-- 综合排序 -->
<template>
	<uni-popup ref="popup" type="top" :safeArea="false" @change="onChangePopup">
		<view class="popup-content">
			<scroll-view :scroll-y="true" class="sorts">
				<view class="sorts-content">
					<view class="sorts-column first">
						<view
							class="sorts-item"
							:class="{ on: firstIndex === index }"
							v-for="(item, index) in firstMenu"
							:key="`first-${index}`"
							@click="firstMenuClick(item, index)"
						>
							{{ item.categoryName }}
						</view>
					</view>
					<view class="sorts-column">
						<view
							class="sorts-item"
							:class="{ on: secondIndex === index }"
							v-for="(item, index) in secondMenu[firstIndex]"
							:key="`second-${index}`"
							@click="secondMenuClick(item, index)"
						>
							{{ item.categoryName }}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</uni-popup>
</template>

<script>
export default {
	name: 'classify-cloud-popup',
	emits: ['select'],
	props: {
		category: {
			//当前显示的分类
			type: Object,
			default: () => ({
				categoryName: '全部',
				categoryId: undefined
			})
		}
	},
	data() {
		return {
			show: false,
			firstMenu: [{ categoryName: '全部', categoryId: undefined }, { categoryName: '我的兴趣', categoryId: undefined }, { categoryName: '热门分类', categoryId: undefined }],
			secondMenu: [[], [], []],
			firstIndex: 0,
			secondIndex: -1
		};
	},
	created() {
		this.getInterestList();
		this.getAllCategory();
	},
	methods: {
		// 关闭弹窗
		close() {
			this.$refs.popup.close();
		},
		// 关闭弹窗
		open() {
			this.$refs.popup.open();
		},
		toggle() {
			this.show ? this.close() : this.open();
		},
		// 获取当前弹窗状态
		onChangePopup(e) {
			this.show = e.show;
			this.$emit('change',this.show)
		},
		// 获取全部分类
		getAllCategory() {
			this.$http.get('/category/queryAll', {}, true).then(res => {
				this.secondMenu[2] = res.hotCategoryVOList || [];

				for (var i = 0; i < res.categoryVOList.length; i++) {
					var categoryVO = res.categoryVOList[i];
					this.firstMenu.push({ categoryName: categoryVO.categoryName, categoryId: categoryVO.categoryId });
					this.secondMenu[i + 3] = categoryVO.nodes;

					for (var j = 0; j < categoryVO.nodes.length; j++) {
						var nodeCategoryVO = categoryVO.nodes[j];
						if (nodeCategoryVO.categoryId == this.category.categoryId) {
							this.firstIndex = i + 3;
							this.secondIndex = j;
						}
					}
				}
			});
		},

		// 获取我感兴趣的分类
		getInterestList() {
			this.$http.get('/category/queryInterestList', {}, true).then(res => {
				this.secondMenu[1] =
					res &&
					res.map(value => {
						return {
							categoryId: value.categoryId,
							categoryName: value.interestName,
							img: value.img
						};
					});
			});
		},

		/** 第一列栏目 的点击事件
		 * @param {Object} item
		 * @param {Integer} index
		 */
		firstMenuClick(item, index) {
			this.secondIndex = -1;
			this.firstIndex = index;
			if (index == 0) {
				//如果选中的是全部，则直接关闭弹窗
				this.$emit('select', item);
				this.close();
			}
		},

		/** 第二列栏目 的点击事件
		 * @param {Object} item
		 *  * @param {Integer} index
		 */
		secondMenuClick(item, index) {
			this.secondIndex = index;
			this.$emit('select', item);
			this.close();
		}
	}
};
</script>

<style lang="less" src="./style.less"></style>
