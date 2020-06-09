<template>
	<view class="index">
		<Status :bgc = "'#C9281C'"></Status>
		<!-- 头部 -->
		<view class="header-wrapper">
			<view class="index-header">
					<view class="header-box">
						<view class="posfix">
							<view class="header-title">电商平台</view>
							<view class="center-box">
								<view class="header-center" @click="goToSearch">
									<image src="../../static/image/ych/index/search.png" mode=""></image>
									<view class="placeHolder">AirPods无线耳机低至5折</view>
								</view>
								<image src="../../static/image/ych/index/kefuphone.png" mode="" class="kefu-ph" @click.stop="handleCallPhone"></image>
							</view>
						</view>
						<view class="swiper-box">
							<swiper circular :autoplay="true" :interval="3000" :duration="1000" style="overflow: hidden;border-radius: 8rpx;">
								<swiper-item class="swiper-item-box" v-for="swipermain in swiperMain" :key = "swipermain.id">
									<view class="swiper-item">
										<image :src="swipermain.image" mode="aspectFill"></image>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>		
				
			</view>
		</view>
		<!-- 区域选择 -->
		<view class="index-center">
			<view class="index-center-box">
				<view class="index-center-box">
					<view class="index-center-item" @click="goToTopPage(index)" v-for="(item, index) in indexCenterList" :key = "index">
						<image :src="indexCenterListImage[index]" class="index-center-item-top"></image>
						<view class="index-center-item-bottom">{{item}}</view>
					</view>
				</view>
				<view class="index-center-box">
					<view class="index-center-item" @click="goToBottomPage(index)" v-for="(item, index) in indexCenterList1" :key = "index">
						<image :src="indexCenterListImage1[index]" class="index-center-item-top"></image>
					
						<view class="index-center-item-bottom">{{item}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 消息 -->
		<view class="index-message">
			<view class="index-message-left">
				<image src="../../static/image/ych/index/laba.png" mode=""></image>
				<view class="jingxuan">精选</view>
				<view class="jignxuanshu"></view>
			</view>
			<view class="index-message-right">
				<swiper :disable-touch = "true" :autoplay="true" :interval="3000" :duration="1000" :vertical = "true" :circular = "true" class="index-message-right-swiper">
					<swiper-item  @click="goToNewBargin" v-for="(newBaginItem, index) in QuKanMessageArr" :key = "index">
						<view class="index-message-right-swiper-item">
							恭喜 <span>{{newBaginItem.userName}}</span> 以 <span>¥{{newBaginItem.amount}}</span>抢到{{newBaginItem.itemName}}
						</view>
					</swiper-item>
				</swiper>
			
			</view>
			<image src="../../static/image/ych/index/more.png" mode="" style="width: 20rpx;height: 16rpx; transform: translateX(-18rpx);"></image>
			<!-- <image src="../../static/image/ych/index/right.png" mode="" style="width: 10rpx;height: 10rpx; transform: translateX(-18rpx);"></image> -->
		</view>
		<!-- 邀请好友 榜单 -->
		<view class="index-banner">
			<image src="../../static/image/ych/index/invite.png" mode="" @click="goToInvite"></image>
			<image src="../../static/image/ych/index/list.png" mode="" @click="goToPopular"></image>
		</view>
		<!-- 正在砍 -->
		<view class="index-bargain-wrapper" style="background-color: #FFFFFF;">
		<view class="index-bargain">
			<view class="index-bargain-title" @click="goToClassify">
				<view class="index-bargain-title-left">正在砍</view>
				<view class="index-bargain-title-right">
					查看更多
					<image src="../../static/image/ych/index/sanjiao.png" mode="" style="width: 8rpx;height: 12rpx;margin-left: 6rpx;"></image>
					</view>
			</view>
			<view class="index-bargain-center">限时超值特惠</view>
			<view class="index-bargain-main">
				<view class="index-bargain-main-item" @click="goToQukan(item.id)" v-for="(item, index) in QukaningShopArr" :key = "index">
					<view class="index-bargain-main-item-top">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
					<view class="index-bargain-main-item-center">00:00:{{item.time}}</view>
					<view class="index-bargain-main-item-footer">立即砍价</view>
					
				</view>
			</view>
			
		</view>
		</view>
		<!-- 列表头部 -->
		<view class="index-tabTitle" ref = "indexTabTitle" :class="{wrapTop: tabTopFlag}">
			<scroll-view scroll-x="true" :scroll-into-view="toChildId" scroll-with-animation>
				<view class="index-tabTitle-wrapper" >
					<view class="index-tabTitle-wrapper-item" :id="tab.childFlagId" @click="handleTabIndex(index)" :class="{on: tabIndex == index}" v-for="(tab, index) in tabList" :key = "index">{{tab.name}}</view>
				</view>
			</scroll-view>
		</view>
		<!-- 列表内容 -->
		<view class="index-tabList" style="position: relative;">
			<swiper :style="{height: tabListHeight}" @change="swiperChange" :current="tabIndex">
					
				<swiper-item v-for="(item, index) in tabList" :key = "index" >
					<!-- <scroll-view scroll-y="true" @scrolltolower="lower"> -->
						<view class="swiper-item" >
							
							<view class="index-tabList-wrapper">
								<view class="index-tabList-wrapper-item" v-for="(item, index) in tabInfo" :key = "index" @click="goToQukan(item.id)">
									<view class="index-tabList-wrapper-item-top">
										<image :src="item.image" mode="aspectFill"></image>
									</view>
									<view class="index-tabList-wrapper-item-center">
										<view class="index-tabList-wrapper-item-center-box">
											<view class="index-tabList-wrapper-item-center-right">
												<view class="index-tabList-wrapper-item-center-right-left">
													<text class="index-tabList-wrapper-item-center-left">趣砍爆款</text>
													<text>{{item.title}}</text>
													</view>
												</view>
										</view>	
									</view>
									<view class="index-tabList-wrapper-item-price">
										<view class="index-tabList-wrapper-item-price-left">¥{{item.nowPrice}}</view>
										<view class="index-tabList-wrapper-item-price-right">原价¥{{item.price}}</view>
									</view>
									<view class="index-tabList-wrapper-item-bottom">立即趣砍</view>
								</view>
							</view>
						</view>
						
					<!-- </scroll-view> -->
					
					<!-- <uniLoadMore bgColor="rgba(244, 244, 244)" :status="hasFlag ? 'loading' : 'noMore'" :class="{uniLoadMoreShow: uniLoadMoreFlag}"></uniLoadMore> -->
					<uniLoadMore bgColor="rgba(244, 244, 244)" :status="hasFlag ? 'loading' : 'noMore'" ></uniLoadMore>
				</swiper-item>
				
			</swiper>
			
		</view>
		<image v-if="pageScrollY > tabOffsetTop" @click="goToTop" src="../../static/image/ych/gototop.png" mode="" class="goTopimg"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indexCenterList: ['趣砍', '抽奖活动', '活动专区', '大市场'], // tab头部
				indexCenterList1: ['充值', '邀请赚钱', '签到有礼', '新手指引'], // tab底部
				indexCenterListImage: ['../../static/image/ych/index/indexcenter1.png', "../../static/image/ych/index/indexcenter2.png",'../../static/image/ych/index/indexcenter3.png', "../../static/image/ych/index/indexcenter4.png",'../../static/image/ych/index/indexcenter5.png', "../../static/image/ych/index/indexcenter6.png",
										'../../static/image/ych/index/indexcenter7.png', "../../static/image/ych/index/indexcenter8.png"], //tab头部图
				indexCenterListImage1: ['../../static/image/ych/index/indexcenter5.png', "../../static/image/ych/index/indexcenter6.png", 
										'../../static/image/ych/index/indexcenter7.png', "../../static/image/ych/index/indexcenter8.png"], // tab底部图
				hasFlag: true, // 是否更多
				tabList: [], // 底部选项卡
				tabIndex: 0 ,// 底部选项卡index,
				tabOffsetTop: 0, // 底部选项卡与头部距离
				pageScrollY: 0, // 页面滚动距离
				tabHeight: 0 ,// 选项卡高度
				swiperMain: [], // 轮播图
				pageNum: 0,
				pageSize: 10,
				tabInfo: [], // 列表内容
				uniLoadMoreFlag: false,
				QukaningShopArr: [], // 正在砍
				tabTopFlag: false,
				tabListHeight: 0, // 列表高度 
				swiperFlag: true ,// 由于写法 导致执行2次请求数据列表 
				toChildId: '',
				QuKanMessageArr: [], // 趣砍消息列表
				qkTimer: null,
				kfPhone: ''
			}
		},
		onLoad() {
			// tab数据
			// this.getIndexInfo()
			// 轮播数据
			this.getSwiperMain()
			
			// 正在砍的商品
			this.QukaningShop()
			// 获取轮播消息
			this.getQuKanMessage()
			// 获取电话
			this.getPhNum()
			
		},
		onShow() {
	
			// this.tabIndex = 0
			// this.pageNum = 0
			// this.pageSize = 10
			// this.hasFlag = true
			// this.swiperFlag = false
			// this.tabInfo = []
			this.getIndexInfo()
			if (uni.getStorageSync('token')) {
				this.getUserInfo()
			}
			// 获取剪贴板内容
			this.getClip()

		},
		onPullDownRefresh () {
			
			this.tabIndex = 0
			this.pageNum = 0
			this.pageSize = 10
			this.hasFlag = true
			this.swiperFlag = false
			this.tabInfo = []
			this.getIndexInfo()

			uni.stopPullDownRefresh()
		},
		mounted() {
			// 获取tab列顶部距离
			this.initTabOffsetTop()
		},
		onReachBottom () {
			this.getClassifyInfo()
		},
		methods: {
			// 获取电话
			async getPhNum () {
				let res = await this.$fetch(this.$api.getPhonenumber, {}, "GET", 'FORM')
				console.log(res)
				this.kfPhone = res.msg
			},
			// 去搜索
			goToSearch () {
				uni.navigateTo({
					url: '../Search/Search'
				})
			},
			// 富文本
			goToAtricle (index) {
				uni.navigateTo({
					url:'../article/article?id=' + index
				})
			},
			// 打电话
			handleCallPhone(){
				if (this.kfPhone) {
					uni.showModal({
						title:'我的客服',
						content:'客服电话：' + this.kfPhone,
						success: (res) => {
							if(res.confirm){
								uni.makePhoneCall({
									phoneNumber:'1388888888'
								})
							}
						}
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '暂未开通'
					})
				}
			},
			getClip () {
				uni.getClipboardData({
				    success: async (res) => {
						this.clipMain = res.data
						if(res.data.indexOf('复制这条信息后打开APP以领取红包') != -1) {
							uni.setClipboardData({
							    data: ' ',
							    success: function () {
							        console.log('success');
							    }
							});
							let msg = await this.$fetch(this.$api.checkActivityCode, {code: res.data}, "GET", 'FORM')
							if (msg.data.jump) {
								uni.navigateTo({
									url:'../ActivityArea/ActivityArea?code=' + res.data
								})
							}
						} 
			
				    }
				});
			},
			// 去最新成交
			goToNewBargin () {
				uni.navigateTo({
					url: '../NewBargin/NewBargin'
				})
			},
			// 头部跳转
			goToTopPage (index) {
				if (index == 0) {
					uni.navigateTo({
						url: '../Bargaing/Bargaing'
					})
				}
				if (index == 1) {
					uni.navigateTo({
						url:'../Lottery/Lottery'
					})
				}
				if (index == 2) {
					// uni.navigateTo({
					// 	url: '../ActivityArea/ActivityArea'
					// })
					this.checkActivity()
				}
				if (index == 3) {
					uni.switchTab({
						url: '../Market/Market'
					})
				}
			},
			//　底部跳转
			goToBottomPage (index) {
				if (index == 0) {
					uni.switchTab({
						url: '../Find/Find'
					})
				}
				if (index == 1) {
					uni.navigateTo({
						url:'../Invite/Invite'
					})
				}
				if(index == 2){
					uni.navigateTo({
						url:'../Punch/Punch'
					})
				}
				if(index == 3){
					uni.navigateTo({
						url:'../article/article?id=3'
					})
				}
			},
			// 去王者榜单
			goToPopular () {
				uni.navigateTo({
					url: '../PopularShop/PopularShop'
				})
			
			},
			// 去趣砍详情
			goToQukan (id) {
				console.log(id);
				uni.navigateTo({
					url: '../QuKan/QuKan?id='+id
				})
			},
			// 去趣砍
			goToClassify () {
				uni.navigateTo({
					url: '../Bargaing/Bargaing'
				})
			},
			// 去邀请
			goToInvite () {
				uni.navigateTo({
					url: '../Invite/Invite'
				})
			},
			// 获取用户信息
			async getUserInfo(){
				let res = await this.$fetch(this.$api.getUserInfo,{},'GET')
				
				uni.setStorageSync('MyUserId', res.data.userId)
				
			},
			// 更换tab选项卡坐标
			handleTabIndex (index) {
				this.tabIndex = index
				this.pageNum = 0
				this.pageSize = 10
				this.hasFlag = true
				this.swiperFlag = false
				this.tabInfo = []
				this.getClassifyInfo()
			},
			// 获取tab顶部距离
			initTabOffsetTop () {
				let tabDom = uni.createSelectorQuery().in(this).select(".index-tabTitle");
				tabDom.boundingClientRect(data => {
				console.log(data)
				this.tabOffsetTop = Number(data.top).toFixed(2) // 头部距离
				console.log(this.tabOffsetTop)
				this.tabHeight =  data.height * 2 + 20
		
				}).exec();
				
			},
			// 回到顶部
			goToTop () {
				uni.pageScrollTo({
				    scrollTop: this.tabOffsetTop - this.tabHeight,
				    duration: 500
				});
			},
			// 轮播切换
			swiperChange (e) {
				if (this.swiperFlag) {
					this.tabIndex = e.detail.current
					this.handleTabIndex(this.tabIndex)
				}
				
			},
			// 获取tab信息
			async getIndexInfo () {
				let res = await this.$fetch(this.$api.getIndex, {}, "GET", "FORM")
				// console.log(res)
				this.tabList = res.data.categoryList
				res.data.qukanList.forEach(item =>{
					item.time = '10'
				})
				this.QukaningShopArr = res.data.qukanList.splice(0, 3)
				this.cutdown()
				// 分类数据
				
				this.getClassifyInfo()
			},
			// 获取轮播图
			async getSwiperMain () {
				let res = await this.$fetch(this.$api.getPicasaList, {}, "GET", "FORM")
				// console.log(res)
				this.swiperMain = res.data
			},
			//　获取分类商品
			async getClassifyInfo () {
				if (!this.hasFlag) return
				console.log(this.pageNum)
				this.pageNum = ++this.pageNum
				this.uniLoadMoreFlag = true
				console.log(this.tabList)
				let res = await this.$fetch(this.$api.getIndexQukanGoodsList, {pageNum: this.pageNum, pageSize: this.pageSize, id: this.tabList[this.tabIndex].id}, "GET", "FORM")
				this.tabInfo = [...this.tabInfo, ...res.rows]

				if (this.tabInfo.length == 0) {
					this.uniLoadMoreFlag = true
					this.tabListHeight = 620 + 'rpx'
				} else {
					let tabLength = this.tabInfo.length
					this.uniLoadMoreFlag = false
					if (tabLength % 2 == 1) {
						tabLength = tabLength + 1 
					}
					
					if (this.pageNum > 1) {
						// this.tabListHeight = tabLength / 2 * 640 - this.pageNum * 200 + 'rpx'
						this.tabListHeight = tabLength / 2 * 640 - tabLength / 2 * 10 + 'rpx'
					} else {
						this.tabListHeight = tabLength / 2 * 640 + 'rpx'
					}
					
				}
				this.tabInfo.forEach((item) => {
					item.childFlagId = 'childId' + item.id
				})
				this.swiperFlag = true
				this.hasFlag = this.pageNum * 10 < res.total
				console.log(this.hasFlag)
				this.toChildId = this.tabIndex == 0 ? this.tabInfo[this.tabIndex].childFlagId : this.tabInfo[this.tabIndex - 1].childFlagId
			},
			
			async QukaningShop () {
				// let res = await this.$fetch(this.$api.getIndexQukanGoods, {pageNum: 1, pageSize: 10}, "GET", "FORM")
				// console.log(res)
				// res.rows.forEach(item =>{
				// 	item.time = '10'
				// })
				// this.QukaningShopArr = res.rows.splice(0, 3)
				// this.cutdown()
			},
			// 模拟出价倒计时
			cutdown(){
				let endTime1 = this.$u.random(1,9)
				let endTime2 = this.$u.random(1,9)
				let endTime3 = this.$u.random(1,9)
				let time1 = 10
				let time2 = 10
				let time3 = 10
				if (this.qkTimer != null) {
					clearInterval(this.qkTimer)
					this.qkTimer = null
				}
				this.qkTimer = setInterval(()=>{
					this.QukaningShopArr.forEach((item,index) =>{
						if(index == 0){
							time1 --;
							item.time = '0'+time1
						}else if(index == 1){
							time2 --;
							item.time = '0'+time2
						}else if(index == 2){
							time3 --;
							item.time = '0'+time3
						}
						if(index == 0 && time1 == endTime1){
							item.time = '10'
							time1 = 10
							endTime1 = this.$u.random(1,9)
						}else if(index == 1 && time2 == endTime2){
							item.time = '10'
							time2 = 10
							endTime2 = this.$u.random(1,9)
						}else if(index == 2 && time3 == endTime3){
							item.time = '10'
							time3 = 10
							endTime3 = this.$u.random(1,9)
						}
					})
				},1000)
			},
			// 活动跳转
			async checkActivity () {
				let res = await this.$fetch(this.$api.checkActivity, {}, 'GET')
				if (res.code == 500) {
					return uni.showToast({
						icon: 'none',
						title: res.msg
					})
				}
				if(!res.data.isNew){
					uni.navigateTo({
						url:'../RandomRedBag/RandomRedBag'
					})
				}else{
					uni.navigateTo({
						url:'../ActivityArea/ActivityArea'
					})
				}
			},	
			async getQuKanMessage () {
				let res = await this.$fetch(this.$api.getRollMessage, {type: '2', count: ''}, 'GET', 'FORM')
				console.log(res)
				this.QuKanMessageArr = res.data
			}
		},
		onPageScroll (e) {
			
			this.pageScrollY = e.scrollTop
			// console.log(this.tabOffsetTop)

			if (this.pageScrollY + 100 > this.tabOffsetTop) {
				// console.log(';12313123y87127812398')
				this.tabTopFlag = true
			} else {
				this.tabTopFlag = false
			}
			// if (!this.scrollFlag) return
			// this.scrollFlag = false
			// this.timerId && clearTimeout(this.timerId)
			// this.timerId = setTimeout(() => {
			// 	this.scrollFlag = true
			// 	this.pageScrollY = e.scrollTop
			// 	console.log(this.pageScrollY)
			// }, 1000)
		}
	}
</script>

<style lang="less" scoped>
	
	.index{
		width: 100%;
		// touch-action: none;
		background-color: rgb(243,243,243);
		// padding-bottom: 90rpx;
		.header-wrapper{
			width: 100%;
			// height: 514rpx;
			// height: 522rpx;
			// height: 532rpx;
			height: calc(480rpx + var(--status-bar-height));
			
	
			background-color: #fff;
		}
		.index-header{
			width: 100%;
			height: 404rpx;
			background: url('../../static/image/ych/index/header.png') no-repeat;
			background-size: cover;
			.header-box{
				width: 100%;
				position: absolute;
				top: var(--status-bar-height);
				// padding-left: 30rpx;
				// padding-right: 30rpx;
				box-sizing: border-box;
				.posfix{
					width: 100%;
					position: fixed;
					top: var(--status-bar-height);
					z-index: 999;
					background-color: #C9281C;
				}
				.header-title{
					width: 100%;
					font-family: PingFangSC-Regular;
					font-size: 17px;
					color: #FFFFFF;
					text-align: center;
					line-height: 32px;
				}
				.center-box{
					width: 100%;
					display: flex;
					align-items: center;
					padding-top: 30rpx;
					padding-bottom: 10rpx;
					margin-left: 30rpx;
					box-sizing: border-box;
					.header-center{
						width: 618rpx;
						height: 70rpx;
						background: #FFFFFF;
						border-radius: 17.5px;
						padding: 14rpx 0 12rpx 30rpx;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						image{
							width: 28rpx;
							height: 30rpx;
						}
						.placeHolder{
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #888888;
							letter-spacing: -0.34px;
							line-height: 22px;
							padding-left: 21.4rpx;
							box-sizing: border-box;
						}
					}
					.kefu-ph{
						width: 42rpx;
						height: 42rpx;
						margin-left: 30rpx;
						box-sizing: border-box;
					}
				}
				.swiper-box{
					width: 690rpx;
					height: 288rpx;
					padding-top: 30rpx;
					// padding-left: 30rpx;
					// padding-right: 30rpx;
					margin-left: 30rpx;
					margin-right: 30rpx;
					box-sizing: border-box;
					// position: relative;
					transform: translateY(160rpx);
					border-radius: 8rpx;
					overflow: hidden;
					.swiper-item-box{
						border-radius: 8rpx;
						overflow: hidden;
					}
					.swiper-item{
						width: 100%;
						height: 100%;
						border-radius: 8rpx;
						overflow: hidden;
						image{
							width: 100%;
							height: 100%;
							border-radius: 8rpx;
							overflow: hidden;
						}
					}
				}
			}
			
		}
		.index-center{
			width: 100%;
			// padding-top: 50rpx;
			box-sizing: border-box;
			background-color: #fff;
			.index-center-box{
				display: flex;
				flex-wrap: wrap;
				.index-center-box{
					width: 100%;
				}
				.index-center-item{	
					
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					// margin-right: 99rpx;
					box-sizing: border-box;
					flex: 1;
					&:nth-child(4n) {
						margin-right: 0;
					}
					&:nth-child(1) {
						margin-bottom: 30rpx;
					}
					&:nth-child(2) {
						margin-bottom: 30rpx;
					}
					&:nth-child(3) {
						margin-bottom: 30rpx;
					}
					&:nth-child(4) {
						margin-bottom: 30rpx;
					}
					
					.index-center-item-top{
						width: 90rpx;
						height: 90rpx;
					}
					.index-center-item-bottom{
						white-space : nowrap;
						padding-top: 10rpx;
						box-sizing: border-box;
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #222222;
						letter-spacing: -0.29px;
					}
				}
			}
		}
		
		.index-message{
			width: 100%;
			height: 90rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			background-color: #fff;
			.index-message-left{
				display: flex;
				align-items: center;
				image{
					width: 44rpx;
					height: 38rpx;
				}
				.jingxuan{
					
					padding-left: 10rpx;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #222222;
					letter-spacing: -0.34px;
				}
				.jignxuanshu{
					margin-left: 20rpx;
					width: 1px;
					height: 30rpx;
					background: #D8D8D8;
					border-radius: 0.5px;
				}
			}
			.index-message-right{
				flex: 1;
				height: 90rpx;
				.index-message-right-swiper{
					height: 90rpx;
					.index-message-right-swiper-item{
						width: 518rpx;
						height: 90rpx;
						line-height: 90rpx;
						white-space : nowrap;
						overflow:hidden;
						text-overflow: ellipsis;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #222222;
						letter-spacing: -0.34px;
						padding-left: 20rpx;
						box-sizing: border-box;
						span{
							font-weight: bold;
						}
					}
				}
			
			}
		}
		.index-banner{
			display: flex;
			justify-content: space-between;
			padding: 30rpx;
			padding-top: 20rpx;
			box-sizing: border-box;
			background-color: #fff;
			image{
				width: 334rpx;
				height: 160rpx;
			}
		}
		.index-bargain{
			width: 690rpx;
			height: 536rpx;
			background-image: linear-gradient(0deg, #FFFFFF 0%, #C9281C 100%);
			border-radius: 7px;
			margin-left: 30rpx;
			margin-right: 30rpx;
			padding: 30rpx 20rpx;
			box-sizing: border-box;
			background-color: #fff;
			.index-bargain-title{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.index-bargain-title-left{
					font-family: PingFangSC-Semibold;
					font-size: 20px;
					color: #FFFFFF;
					letter-spacing: -0.48px;
				}
				.index-bargain-title-right{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 136rpx;
					height: 42rpx;
					line-height: 42rpx;
					border: 1px solid rgba(255,255,255,0.40);
					border-radius: 10.5px;
					box-sizing: border-box;
					text-align: center;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: rgba(255,255,255,0.70);
					letter-spacing: -0.29px;
				}
			}
			.index-bargain-center{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: -0.34px;
				padding-bottom: 20rpx;
				box-sizing: border-box;
			}
			.index-bargain-main{
				display: flex;
				// justify-content: space-between;
				// flex-direction: column;
				// align-items: center;
				// justify-content: center;
				.index-bargain-main-item{
					width: 210rpx;
					height: 336rpx;
					border-radius: 4px 4px 0 0;
					box-shadow: 0 2px 9px 0 rgba(205,60,50,0.20);
					border-radius: 4px;
					margin-right: 10rpx;
					box-sizing: border-box;
					overflow: hidden;
					// flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					background-color: #fff;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #222222;
					letter-spacing: -0.34px;
					&:last-child{
						margin-right: 0;
					}
					.index-bargain-main-item-top{
						image{
							width: 210rpx;
							height: 210rpx;
						}
					}
					.index-bargain-main-item-center{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #222222;
						letter-spacing: -0.34px;
						padding-bottom: 10rpx;
						box-sizing: border-box;
					}
					.index-bargain-main-item-footer{
						border: 1px solid #C9281C;
						border-radius: 2px;
						font-family: PingFangSC-Regular;
						font-size: 12px;
						color: #C9281C;
						letter-spacing: -0.29px;
						text-align: center;
						padding: 2rpx 14rpx;
						box-sizing: border-box;
					}
				}
			}
		}
		.index-tabTitle{
			width: 100%;
			height: 90rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			background-color: #fff;
			// &.wrapTop{
			// 		position: -webkit-sticky;
			// 		position: sticky;
			// 		z-index: 999;
			// 		transition: all 3s;
			// 		top: 220rpx;
			// 	}
			.index-tabTitle-wrapper{
				display: inline-block;
				white-space: nowrap;
				
				.index-tabTitle-wrapper-item{
					width: 138rpx;
					height: 90rpx;
					line-height: 90rpx;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #222222;
					letter-spacing: -0.34px;
					text-align: center;
					display: inline-block;
					position: relative;
					&::after{
						content: '';
						width: 0;
						height: 0;
						border-bottom: 4rpx solid #C9281C;
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						transition: .5s;
					}
					&.on{
						font-family: PingFangSC-Semibold;
						font-size: 17px;
						color: #C9281C;
						letter-spacing: -0.41px;
						&::after{
							width: 50%;
						}
					}
				}
			}
		}
		.index-tabList{
			padding: 30rpx;
			box-sizing: border-box;
			background-color: rgb(243,243,243);
			.index-tabList-wrapper{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.index-tabList-wrapper-item{
					width: 340rpx;
					height: 610rpx;
					box-shadow: 0 2px 4px 0 rgba(0,0,0,0.03);
					border-radius: 7px;
					background-color: #fff;
					box-sizing: border-box;
					margin-bottom: 10rpx;
					overflow: hidden;
					.index-tabList-wrapper-item-top{
						image{
							width: 340rpx;
							height: 340rpx;
						}
					}
					.index-tabList-wrapper-item-center{
						display: -webkit-box;    
						-webkit-box-orient: vertical;    
						-webkit-line-clamp: 2;    //控制行数
						overflow: hidden;
						padding-top: 18rpx;
						padding-bottom: 16rpx;
						box-sizing: border-box;
						.index-tabList-wrapper-item-center-box{
							display: flex;
							
							.index-tabList-wrapper-item-center-left{
								// width: 100rpx;
								height: 32rpx;
								background: #C9281C;
								border-radius: 2px;
								font-family: PingFangSC-Regular;
								font-size: 10px;
								color: #FFFFFF;
								letter-spacing: -0.24px;
								padding: 2rpx 6rpx;
								margin-right: 14rpx;
								box-sizing: border-box;
							
							}
							.index-tabList-wrapper-item-center-right{
								display: flex;
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #222222;
								letter-spacing: -0.34px;
								margin-left: 14rpx;
								box-sizing: border-box;
								.index-tabList-wrapper-item-center-right-left{
									height: 84rpx;
									padding-right: 20rpx;
									display: -webkit-box;
									-webkit-box-orient: vertical;    
									-webkit-line-clamp: 2;    //控制行数
									overflow: hidden;
								}
							}
						}
					
					}
					.index-tabList-wrapper-item-price{
						display: flex;
						align-items: center;
						padding-bottom: 20rpx;
						box-sizing: border-box;
						.index-tabList-wrapper-item-price-left{
							font-family: PingFangSC-Semibold;
							font-size: 17px;
							color: #C9281C;
							letter-spacing: -0.41px;
							padding-left: 20rpx;
							padding-right: 20rpx;
							box-sizing: border-box;
						}
						.index-tabList-wrapper-item-price-right{
							font-family: TaipeiSansTCBeta-Regular;
							font-size: 12px;
							color: #A2A2A2;
							letter-spacing: -0.29px;
							text-decoration: line-through;
						}
					}
					.index-tabList-wrapper-item-bottom{
						width: 300rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						background: #C9281C;
						border-radius: 15px;
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #FFFFFF;
						letter-spacing: -0.34px;
						margin: 0 auto;
					}
				}
			}
		}
		.goTopimg{
			width: 106rpx;
			height: 106rpx;
			position: fixed;
			right: 30rpx;
			bottom: 30rpx;
		}
		.uniLoadMoreShow{
			width: 100%;
			height: 100rpx;
			position: absolute;
			top: 30rpx !important; 
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
<style>
	page::after {
		display: none;
	}

</style>
