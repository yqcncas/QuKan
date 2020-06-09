<template>
	<view>
		<view class="background">
			<view>总余量</view>
			<view>{{allbean}}</view>
			<view class="fun-give">
				<view class="funGive-item">
					<view>{{beanDirect}}</view>
					<view>趣豆</view>
				</view>
				<view></view>
				<view class="funGive-item">
					<view>{{beanIndirect}}</view>
					<view>赠豆</view>
				</view>
			</view>
		</view>
		<view class="tui-header-box" :style="{height:height+'px'}">
			<view class="tui-header" :style="{paddingTop:top+'px'}">
				明细
			</view>
			<view class="tui-header-icon" :style="{marginTop:top+'px'}">
				<view class="tui-icon tui-icon-arrowleft tui-icon-back" :style="{color:opcity>=1?'#000':'rgba(255,255,255,0.40)',background:'rgba(0, 0, 0,'+iconOpcity+')'}"
				 @tap="back"></view>
			</view>
		</view>
		<view class="commiss-detail">
			<view class="home-tab">
				<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation >
					<view v-for="(item,index) in tabList" :key="item.id" class="nav-item" :class="{current: index == tabCurrentIndex}"
					 :id="'tab'+index" @click="changeTab(index)">{{item.name}}</view>
				</scroll-view>
			</view>
			<scroll-view scroll-y  @scrolltolower="loadMore" class="detail-list" >
				<view class="detail-item" v-for="(item,index) in beanInfoArr" :key="index" @click="handleOpenOrderDetail(item.id)">
					<view></view>
					<view>
						<view class="detail-content">
							<view>{{item.remark}}</view>
							<view>{{item.createTime}}</view>
						</view>
						<view class="add" v-if="tabCurrentIndex == 0">
							<view>{{item.type == 1 ? '趣豆': '赠豆'}}</view>
							<view>+{{item.amount}}</view>
						</view>
						<view class="reduce" v-else>
							<view>{{item.type == 1 ? '趣豆': '赠豆'}}</view>
							<view>-{{item.amount}}</view>
						
						</view>
					</view>
				</view>
				<!-- 加载 -->
				<uni-load-more bgColor="#FFFFFF" :status="hasFlag ? 'loading' : 'noMore'"></uni-load-more>
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
				tabList:[{id:1,name:'豆豆收入'},{id:2,name:'豆豆支出'}],
				tabCurrentIndex:0,
				commissList:[],
				sign: 1,
				hasFlag: true,
				pageNum: 0,
				pageSize: 10,
				beanInfoArr: [],
				beanDirect: 0,
				beanIndirect: 0,
				allbean: 0
			};
		},
		methods:{
			// 返回
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			// 点击切换选项卡
			changeTab(index){
				this.tabCurrentIndex = index
				this.pageNum = 0
				this.hasFlag = true
				this.beanInfoArr = []
				this.initBeanInfo()
			},
			// 加载更多
			loadMore(){
				console.log('加载');
				if (this.hasFlag) {
					this.initBeanInfo()
				}
			},
			// 数据
			async initBeanInfo () {
		
				let res = null
				if (this.tabCurrentIndex == 0) {
					if(!this.hasFlag) return
					this.pageNum = ++this.pageNum
					this.sign = 2
					res = await this.$fetch(this.$api.getBeanList, {pageNum: this.pageNum, pageSize: this.pageSize, sign: this.sign}, 'GET', 'FORM')
					this.hasFlag = this.pageNum * 10 < res.total
				} else {
					if(!this.hasFlag) return
					this.pageNum = ++this.pageNum
					this.sign = 1
					res = await this.$fetch(this.$api.getBeanList, {pageNum: this.pageNum, pageSize: this.pageSize, sign: this.sign}, 'GET', 'FORM')
					this.hasFlag = this.pageNum * 10 < res.total
				}
				
				this.beanInfoArr = [...this.beanInfoArr, ...res.rows]
				
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
			console.log(options)
			this.beanDirect = options.beanDirect
			this.beanIndirect = options.beanIndirect
			this.allbean = (Number(this.beanDirect) + Number(this.beanIndirect)).toFixed(2)
			this.initBeanInfo()
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
		height: 510rpx;
		background-image: url(../../static/image/ylc/28.png);
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
		& > view:nth-child(2){
			width: 100%;
			margin-top: 10rpx;
			font-size: 32px;
			color: #FFD47F;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.fun-give{
			width: 750rpx;
			height: 148rpx;
			display: flex;
			align-items: center;
			.funGive-item{
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				& > view:first-child{
					font-size: 17px;
					color: #FFD47F;
				}
				& > view:last-child{
					font-size: 14px;
					color: rgba(255,255,255,0.70);
				}
			}
			& > view:nth-child(2){
				margin-top: 44rpx;
				width: 2rpx;
				height: 50rpx;
				background: rgba(255,255,255,0.20);
			}
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
		height: 860rpx;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		position: fixed;
		top:444rpx;
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
			height: 770rpx;
			margin-top: 90rpx;
			.detail-item{
				width: 100%;
				margin-top: 20rpx;
				// height: 120rpx;
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
						flex: 2;
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
						width: 100%;
						margin-right: 30rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						flex: 1;
						font-size: 17px;
						color: #C9281C;
						font-weight: bold;
					}
					.reduce{
						width: 100%;
						margin-right: 30rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
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
