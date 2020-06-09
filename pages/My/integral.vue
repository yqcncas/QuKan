<template>
	<view>
		<view class="background">
			<view>总积分</view>
			<view>{{points}}</view>
		</view>
		<view class="tui-header-box" :style="{height:height+'px'}">
			<view class="tui-header" :style="{paddingTop:top+'px'}">
				积分明细
			</view>
			<view class="tui-header-icon" :style="{marginTop:top+'px'}">
				<view class="tui-icon tui-icon-arrowleft tui-icon-back" :style="{color:opcity>=1?'#000':'rgba(255,255,255,0.40)',background:'rgba(0, 0, 0,'+iconOpcity+')'}"
				 @tap="back"></view>
			</view>
			<view class="tui-header-right" :style="{marginTop:top+'px'}" @click="goToArt">
				<image src="../../static/image/ylc/34.png" mode=""></image>
			</view>
		</view>
		<view class="commiss-detail">
			<view class="home-tab">
				<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation>
					<view v-for="(item,index) in tabList" :key="item.id" class="nav-item" :class="{current: index == tabCurrentIndex}"
					 :id="'tab'+index" @click="changeTab(index)">{{item.name}}</view>
				</scroll-view>
			</view>
			<scroll-view scroll-y  @scrolltolower="loadMore" class="detail-list">
				<view class="detail-item" v-for="(item,index) in pointsList" :key="index" v-if="!isEmpty">
					<view></view>
					<view>
						<view class="detail-content">
							<view>{{item.remark}}</view>
							<view>{{item.createTime}}</view>
						</view>
						<view class="add" v-if="tabCurrentIndex == 0">+{{item.amount}}</view>
						<view class="reduce" v-else>-{{item.amount}}</view>
					</view>
				</view>
				<!-- 加载 -->
				<uni-load-more bgColor="#FFFFFF" :status="hasFlag ? 'loading' : 'noMore'" v-if="!isEmpty" ></uni-load-more>
				<view class="detail-item"></view>
				<u-empty mode="data" :show="isEmpty"></u-empty>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: 64, //header高度
				top: 0, //标题图标距离顶部距离
				scrollH: 0, //滚动总高度
				opcity: 0,
				iconOpcity: 0,
				tabList:[{id:1,name:'积分收入'},{id:2,name:'积分支出'}],
				tabCurrentIndex:0,
				commissList:[],
				hasFlag:true,
				points:0,
				page:0,
				sign:2,
				pointsList:[],
				isEmpty:false
			};
		},
		methods:{
			// 返回
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			goToArt () {
				uni.navigateTo({
					url:'../article/article?id=' + 18
				})
			},
			// 点击切换选项卡
			changeTab(index){
				this.tabCurrentIndex = index
				this.page = 0
				if(index == 0){
					this.sign = 2
					this.hasFlag = true
					this.pointsList = []
					this.getFlowList()
				}else{
					this.sign = 1
					this.hasFlag = true
					this.pointsList = []
					this.getFlowList()
				}
			},
			// 加载更多
			loadMore(){
				console.log('加载');
				this.getFlowList()
			},
			// 获取积分流水明细列表
			async getFlowList(){
				if(!this.hasFlag) return
				this.page = ++this.page;
				let res = await this.$fetch(this.$api.getFlowLists,{pageNum:this.page,pageSize:10,sign:this.sign,type:3},'GET')
				console.log(res);
				if(res.total){
					this.isEmpty = false
				}else{
					this.isEmpty = true
				}
				this.pointsList = [...this.pointsList,...res.rows]
				this.hasFlag  = 10*this.page < res.total
			}
		},
		onLoad(options) {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			setTimeout(() => {
				uni.getSystemInfo({
					success: (res) => {
						this.width = obj.left || res.windowWidth;
						this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
						this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
						this.scrollH = res.windowWidth
					}
				})
			}, 50)
			this.points = options.points
			this.getFlowList()
		},
		onPageScroll(e) {
			let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;
			let opcity = scroll / this.scrollH;
			if (this.opcity >= 1 && opcity >= 1) {
				return;
			}
			this.opcity = opcity;
			// this.iconOpcity = 0.5 * (1 - opcity < 0 ? 0 : 1 - opcity)
		},
	}
</script>

<style lang="less">
	@import "../../static/style/icon.css";
	page::after{
		display: none;
	}
	page{
		background: #f3f3f3;
	}
	.background{
		width: 750rpx;
		height: 438rpx;
		background-image: url(../../static/image/ylc/26.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		& > view:first-child{
			width: 100%;
			padding-top: 146rpx;
			font-size: 14px;
			color: rgba(255,255,255,0.70);
			display: flex;
			align-items: center;
			justify-content: center;
		}
		& > view:last-child{
			width: 100%;
			margin-top: 10rpx;
			font-size: 32px;
			color: #FFD47F;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.tui-header-box {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 11;
	}
	
	.tui-header {
		width: 100%;
		font-size: 17px;
		line-height: 17px;
		font-weight: 500;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
	}
	
	.tui-header-icon {
		position: fixed;
		top: 0;
		left: 10px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		height: 32px;
		transform: translateZ(0);
		z-index: 11;
	}
	.tui-header-right{
		position: fixed;
		top: 0;
		right: 30rpx;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		padding-top: 6px;
		image{
			width: 36rpx;
			height: 36rpx;
		}
	}
	
	
	.tui-header-icon .tui-badge {
		background: #e41f19 !important;
		position: absolute;
		right: -4px;
	}
	
	.tui-icon-ml {
		margin-left: 20upx;
	}
	
	.tui-icon {
		border-radius: 16px;
	}
	
	
	.tui-icon-back {
		height: 32px !important;
		width: 32px !important;
		display: block !important;
	}
	
	.tui-header-icon .tui-icon-more-fill {
		height: 20px !important;
		width: 20px !important;
		padding: 6px !important;
		display: block !important;
	}
	.commiss-detail{
		width: 690rpx;
		height: 978rpx;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		position: fixed;
		top:316rpx;
		left:30rpx;
		border-radius: 7px;
		.home-tab{
			width: 690rpx;
			height: 90rpx;
			background: #FFFFFF;
			position: fixed;
			z-index: 10;
			border-radius: 7px;
		}
		.nav-bar{
			position: relative;
			z-index: 10;
			height: 90rpx;
			white-space: nowrap;
			background-color: #fff;
			border-radius: 7px;
			
			.nav-item {
				display: inline-block;
				width: 345rpx;
				height: 90rpx;
				text-align: center;
				line-height: 90rpx;
				font-size: 28rpx;
				color: #A6A6A6;
				position: relative;
			
				&:after {
					content: '';
					width: 0;
					height: 0;
					border-bottom: 6rpx solid #C9281C;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					transition: .3s;
				}
			}
			
			.current {
				color: #C9281C;
				font-size: 14px;
				font-weight: bold;
			
				&:after {
					width: 20%;
				}
			}
		}
		.detail-list{
			width: 100%;
			height: 888rpx;
			margin-top: 90rpx;
			
			.detail-item{
				width: 100%;
				height: 120rpx;
				display: flex;
				align-items: center;
				& > view:first-child{
					width: 10rpx;
					height: 10rpx;
					background: #C9281C;
					border-radius: 50%;
					margin: 0 20rpx 0 30rpx;
				}
				& > view:nth-child(2){
					width: 630rpx;
					display: flex;
					align-items: center;
					.detail-content{
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: center;
						& > view:first-child{
							font-size: 14px;
							color: #222222;
							font-weight: bold;
						}
						& > view:last-child{
							font-size: 12px;
							color: #A2A2A2;
						}
					}
					.add{
						margin-right: 30rpx;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						flex: 1;
						font-size: 17px;
						color: #C9281C;
						font-weight: bold;
					}
					.reduce{
						margin-right: 30rpx;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						flex: 1;
						font-size: 17px;
						color: #4E9800;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
