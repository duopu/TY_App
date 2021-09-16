<!-- 观看课程 -->
<template>
	<view class="live-room">
		<!-- 视频 -->
		<view class="live-room-top">
			<video v-if="videoUrl" class="video" :src="videoUrl" controls :autoplay="true" />
			<image v-else :src="detail.img[0]" class="live-img" />
			<view class="flex-center-between text-bold process">
				<text class="title text-bold">{{detail.courseName}}</text>
				<text v-if="!isLocal" class="color-red">{{detail.learnRate || 0}}%</text>
			</view>
		</view>

		<!-- 目录 -->
		<scroll-view class="live-room-category" scroll-y="true">
			<!-- 列表 -->
			<view class="lists-item" v-for="(item, index) in detail.userCourseClassList" :key="index">
				<view class="row flex-center-between" @click="firstCheck(item)">
					<text class="text-bold title">{{(index + 1)}}、{{item.courseClassName}}</text>
					<image class="icon" src="../../../static/images/icons/icon-collapse-arrow.svg" mode="aspectFill" />
				</view>
				<block v-if="item.checked" v-for="(subItem, subIndex) in item.nodes" :key="subIndex">
					<view class="row flex-center-between" @click="secondCheck(subItem)" style="margin-left:10rpx">
						<text
							class="text-bold title">{{(index+1) + '-' + (subIndex + 1)}}、{{subItem.courseClassName}}</text>
						<image class="icon" src="../../../static/images/icons/icon-collapse-arrow.svg"
							mode="aspectFill" />
					</view>
					<view v-if="subItem.checked" class="collapse-content" style="margin-left:20rpx">
						<view v-if="item.nodes" class="flex collapse-item" v-for="(flag, ind) in subItem.liveRecordList"
							:key="ind" @click.stop="periodClick(flag)">
							<image class="icon-video" src="../../../static/images/icons/icon-video.svg"
								mode="aspectFill" />
							<view class="flex-column flex-1">
								<view class="flex-center">
									<text>{{flag.liveName}}</text>
									<text class="tag">上次学到</text>
								</view>
								<view class="flex-center desc">
									<text>{{flag.learnDuration || filterDate}}分钟</text>
									<block>
										<text class="m-left-40">已学习</text>
										<text
											class="color-red">{{ flag.learnDuration | filterProgress(flag.classDuration)}}%</text>
									</block>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
		<!-- 底部 -->
		<view v-if="!isLocal" class="live-room-bottom flex-center-between">
			<view class="item flex-column-center" @click="down">
				<image class="icon" src="../../../static/images/icons/icon-colorful-download.svg" mode="aspectFill" />
				<text>下载</text>
			</view>
			<view class="item flex-column-center" @click="toCustomerService">
				<image class="icon" src="../../../static/images/icons/icon-color-kf.svg" mode="aspectFill" />
				<text>联系客服</text>
			</view>
			<view v-if="detail.isEval" class="item flex-column-center" @click="eval">
				<image class="icon" src="../../../static/images/icons/icon-colorful-evaluate.svg" mode="aspectFill" />
				<text>写评价</text>
			</view>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	export default {
		data() {
			return {
				courseId: '', // 课程id
				// 课程详情
				detail: {
					courseName: '',
					userCourseClassList: [],
					storeId: '',
					avatar: '',
					storeName: '',
					isEval: true,
					type: undefined,
				},
				current: 0,
				videoUrl: '',
				id: '', //课时id
				isLocal: false,
				courseSyncList: uni.getStorageSync('courseList') || []
			};
		},
		filters: {

			// 课时学习进度
			filterProgress(v1, v2) {
				if (!v1 || !v2) {
					return 0
				}
				return parseInt(v1 / v2 * 100)
			},
		},
		async onLoad(option) {
			const {
				courseId,
				from
			} = option || {}
			this.courseId = courseId
			this.isLocal = from === 'local'
			if (this.isLocal) {
				this.setDetail()
			} else {
				this.queryDetail()
			}
		},
		methods: {

			// 课时点击
			periodClick(item) {
				this.id = item.liveId;
				this.videoUrl = item.liveVideoUrl
			},

			//树状结构 第一层点击 
			firstCheck(data) {
				this.detail.userCourseClassList.map(item => {
					if (item.id === data.id) {
						item.checked = !item.checked
					}
				})
			},

			//树状结构 第二层点击 
			secondCheck(data) {
				this.detail.userCourseClassList.map(item => {
					(item.nodes || []).map(flag => {
						if (flag.id === data.id) {
							flag.checked = !flag.checked
						}
					})
				})
			},

			//下载课程 
			down() {
				let that = this;
				if (!this.videoUrl) {
					this.$tool.showToast('请选择您要缓存的课时')
					return;
				}
				const courseSyncList = this.courseSyncList;
				let isSync = false;
				courseSyncList.map(item => {
					(item.userCourseClassList || []).map(subItem => {
						(subItem.nodes || []).map(sub => {
							isSync = (sub.liveRecordList || []).filter(flag => flag.liveId == this
								.id).length > 0;
							if (isSync) {
								this.$tool.showToast('您已经缓存过了')
								return;
							}
						})
					})
				})
				uni.showLoading({
					title: '下载中...'
				})
				uni.downloadFile({
					url: that.videoUrl,
					success: (res) => {
						if (res.statusCode === 200) {
							let tempFilePath = res.tempFilePath;
							that.$tool.showSuccess('下载成功', () => {
								uni.saveFile({
									tempFilePath,
									success: (res) => {
										let savedFilePath = this.fileNameEscape(res
											.savedFilePath);
										this.saveCourseList(savedFilePath)
									},
									fail: (err) => {
										that.$tool.showToast(err.msg || '保存本地失败')
									}
								});
							})

						}
					},
					complete: () => {
						uni.hideLoading()
					}
				});
			},

			/**
			 * 课程信息 存储到本地
			 * @param {String} file
			 */
			saveCourseList(file) {
				const courseSyncList = this.courseSyncList
				const {
					thumbnail,
					courseName,
					storeName,
					userCourseClassList = []
				} = this.detail
				const classList = userCourseClassList;
				classList.map(item => {
					(item.nodes || []).map(flag => {
						(flag.liveRecordList || []).map(sub => {
							if (sub.liveId === this.id) {
								flag.url = file
							} else {
								flag.url = ''
							}
						})

					})
				})
				courseSyncList.push({
					courseId: this.courseId,
					courseName,
					thumbnail,
					storeName,
					userCourseClassList: classList
				})
				uni.setStorageSync('courseList', courseSyncList)
			},

			// 跳转客服页面
			toCustomerService() {
				const {
					storeId,
					storeName,
					avatar
				} = this.detail || {}
				this.$http.get('/im/getIMGroupId', {
					storeId
				}, true).then(res => {
					const groupId = res.groupId;
					const user = getApp().globalData.user || {};
					getApp().globalData.messageParam = {
						groupId: groupId,
						userPortrait: user.portrait,
						userIM: user.imNum,
						userName: user.nickName,
						storeName: storeName,
						storePortrait: avatar
					}

					uni.navigateTo({
						url: '/pages/im-message/im-message'
					})
				})
			},

			// 写评价
			eval() {
				const params = {
					...this.detail,
					goodsId: this.detail.courseId,
				}
				uni.navigateTo({
					url: `/pages-user/mine/evaluate/evaluate?goodsVO=${encodeURIComponent(JSON.stringify(params))}`,
				})
			},

			// 查询课程详情
			async queryDetail() {
				const params = {
					courseId: this.courseId
				}
				const data = await this.$http.get('/userCourse/queryDetail', params, true)
				if (data.userCourseClassList) {
					(data.userCourseClassList || []).map(item => {
						item.checked = false;
						if (item.nodes) {
							(item.nodes || []).map(flag => {
								flag.checked = false;
							})
						}
					})
				}
				this.detail = data;
			},

			// 本地缓存数据-设置详情
			setDetail() {
				const courseList = uni.getStorageSync('courseList')
				const detail = courseList.filter(item => item.courseId == this.courseId)[0]
				this.detail = detail
			}
		}
	};
</script>

<style lang="less" src="./style.less"></style>
