<template>
	<view>
		<view class="tui-header-box" :style="{height:height+'px'}">
			<view class="tui-header" :style="{paddingTop:top+'px'}">
				打卡签到
			</view>
			<view class="tui-header-icon" :style="{marginTop:top+'px'}" @tap="back" >
				<view class="tui-icon tui-icon-arrowleft tui-icon-back" :style="{color:opcity>=1?'#000':'rgba(255,255,255,0.40)',background:'rgba(0, 0, 0,'+iconOpcity+')'}"
				 @tap="back"></view>
			</view>
		</view>
		<view class="integral-detail">
			<view @click="handleToCheckIntegral">积分明细</view>
		</view>
		<view class="integral-background"><image src="../../static/image/ylc/36.png" mode=""></image></view>
		<view class="total-integral">
			<image src="../../static/image/ylc/35.png" mode=""></image>
		</view>
		<view class="total-integral-content">
			<view>{{myPoint}}</view>
			<view>我的积分</view>
		</view>
		<view class="punch">
			<view>已连续签到</view>
			<view>
				<view class="punch-day">
					<text>{{day}}</text><text>天</text>
				</view>
			</view>
			<view class="steps">
				<u-steps :list="stepsList" :current="current" un-active-color="#FFEDEB" active-color="#FBFA9D"></u-steps>
			</view>
			<view class="punch-button">
				<view @click="handleToPunch" v-if="canSign">立即签到</view>
				<view v-else>已签到</view>
			</view>
			<view class="integral-rule" @click="goToAtricle(10)">查看积分规则</view>
		</view>
		<view class="punch-icon" v-if="punchShow">
			<image src="../../static/image/ylc/39.png" mode=""></image>
		</view>
		<u-popup mode="center" v-model="punchShow" border-radius="7" length="602">
			<view class="modal-title">
				<text>签到成功，恭喜您已领取</text><text>{{getPoint}}</text><text>积分</text>
			</view>
			<view class="modal-button">
				我知道了
			</view>
		</u-popup>
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
				stepsList:[],
				day:0,
				current:-1,
				punchShow:false,
				myPoint:0,
				getPoint:'',
				canSign:true
			};
		},
		methods:{
			// 查看积分明细
			handleToCheckIntegral(){
				uni.navigateTo({
					url:'../My/integral?points='+this.myPoint
				})
			},
			goToAtricle (index) {
				uni.navigateTo({
					url:'../article/article?id=' + index
				})
			},
			// 返回
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			// 签到
			async handleToPunch(){
				if(!this.canSign) return
				let res = await this.$fetch(this.$api.addSign,{},'GET')
				console.log(res);
				if(res.code == 0){
					this.punchShow = true
					this.day++;
					this.current++;
					this.canSign = false
					this.myPoint = this.myPoint + res.data.award
					this.getPoint = res.data.award
				}
			},
			// 获取签到信息
			async getSign(){
				let res = await this.$fetch(this.$api.getSign,{},'GET')
				console.log(res);
				this.canSign = res.data.canSign
				if(res.data.sign.amount  == 0){
					var today = new Date()
					var i
					var signAmount=res.data.sign.amount
					this.day = signAmount
					if(res.data.canSign){
						this.current= signAmount-1
					}else{
						this.current = signAmount
					}
					for (i = 0; i < 7; i++) {  
						var now = new Date()
						now.setDate(today.getDate() + i-signAmount)
						var MM =now.getMonth() + 1 < 10? '0' + (now.getMonth() + 1): now.getMonth() + 1
						var Day =now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
						if(i == signAmount){
							this.stepsList.push({name:'今天'})
						}
						else{
							this.stepsList.push({name:MM+'.'+Day})
						}
					    
					}  
				}else if(res.data.sign.amount > 0 && res.data.sign.amount <= 6){
					var today = new Date()
					var i
					var signAmount=res.data.sign.amount
					this.day = signAmount
					if(res.data.canSign){
						this.current= signAmount-1
						for (i = 0; i < 7; i++) {
							var now = new Date()
							now.setDate(today.getDate() + i-signAmount)
							var MM =now.getMonth() + 1 < 10? '0' + (now.getMonth() + 1): now.getMonth() + 1
							var Day =now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
							if(i == signAmount){
								this.stepsList.push({name:'今天'})
							}else{
								this.stepsList.push({name:MM+'.'+Day})
							}
						    
						}
					}else{
						this.current = signAmount - 1
						let signIndex = signAmount -1
						for (i = 0; i < 7; i++) {
							var now = new Date()
							now.setDate(today.getDate() + i - signIndex)
							var MM =now.getMonth() + 1 < 10? '0' + (now.getMonth() + 1): now.getMonth() + 1
							var Day =now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
							if(i == signIndex){
								this.stepsList.push({name:'今天'})
							}else{
								this.stepsList.push({name:MM+'.'+Day})
							}
						}
						console.log(this.current);
					}
				}else if(res.data.amount >= 7){
					var today = new Date()
					var i
					var signAmount=res.data.sign.amount
					this.day = signAmount
					if(res.data.canSign){
						this.current = 5
						for (i = 0; i < 7; i++) {
							var now = new Date()
							now.setDate(today.getDate() + i-6)
							var MM =now.getMonth() + 1 < 10? '0' + (now.getMonth() + 1): now.getMonth() + 1
							var Day =now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
							if(i == 6){
								this.stepsList.push({name:'今天'})
							}else{
								this.stepsList.push({name:MM+'.'+Day})
							}
						    
						}
					}else{
						this.current == 6
						for (i = 0; i < 7; i++) {
							var now = new Date()
							now.setDate(today.getDate() + i-6)
							var MM =now.getMonth() + 1 < 10? '0' + (now.getMonth() + 1): now.getMonth() + 1
							var Day =now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
							if(i == 6){
								this.stepsList.push({name:'今天'})
							}else{
								this.stepsList.push({name:MM+'.'+Day})
							}
						    
						}
					}
				}
			},
			// 获取我的积分
			async getMyPoints(){
				let res = await this.$fetch(this.$api.getUserInfo,{},'GET')
				this.myPoint = res.data.userInfo.beanPoint
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
			this.getMyPoints()
			this.getSign()
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
		background: #C9281C;
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
	.integral-detail{
		width: 690rpx;
		height: 72rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		top: 84rpx;
		position: fixed;
		left: 60rpx;
		z-index: 12;
		view{
			width: 164rpx;
			height: 72rpx;
			background-image: linear-gradient(180deg, #FFE7B7 0%, #FFD47F 100%);
			border-radius: 100px 0 0 100px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: #C9281C;
		}
	}
	.integral-background{
		// width: 498rpx;
		// height: 238rpx;
		position: fixed;
		top: 272rpx;
		// left: 126rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
		image{
			width: 554rpx;
			height: 296rpx;
		}
	}
	.total-integral{
		width: 100%;
		// height: 312rpx;
		position: absolute;
		top: 180rpx;
		// left: 256rpx;
		z-index: 3;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 298rpx;
			height: 372rpx;
		}
	}
	.total-integral-content{
		display: flex;
		flex-direction: column;
		// border: 2rpx solid #18B566;
		position: absolute;
		z-index: 4;
		top: 268rpx;
		width: 100%;
		align-items: center;
		justify-content: center;
		& > view:first-child{
			font-size: 17px;
			color: #C9281C;
			font-weight: bold;
			display: flex;
			justify-content: center;
		}
		& > view:last-child{
			font-size: 12px;
			margin-top: 10rpx;
			color: #C9281C;
			display: flex;
			justify-content: center;
		}
	}
	.punch{
		width: 690rpx;
		height: 868rpx;
		position: fixed;
		background: #FFFFFF;
		border-radius: 7px;
		top: 460rpx;
		left: 30rpx;
		z-index: 2;
		& > view:first-child{
			width: 690rpx;
			margin-top: 116rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 20px;
			color: #222222;
			font-weight: bold;
		}
		& > view:nth-child(2){
			margin-top: 20rpx;
			width: 690rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 4;
			.punch-day{
				width: 286rpx;
				height: 250rpx;
				background-image: url(../../static/image/ylc/37.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				display: flex;
				justify-content: center;
				& > text:first-child{
					margin-top: 120rpx;
					font-size: 33px;
					color: #C9281C;
				}
				& > text:last-child{
					font-size: 14px;
					color: #C9281C;
					margin-left: 14rpx;
					margin-top: 156rpx;
				}
			}
		}
		.steps{
			width: 690rpx;
			margin-top: 70rpx;
		}
		.punch-button{
			width: 690rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 60rpx;
			view{
				width: 490rpx;
				height: 90rpx;
				background-image: linear-gradient(180deg, #FF7360 0%, #C9281C 100%);
				border-radius: 22.5px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 17px;
				color: #FFFFFF;
			}
		}
		.integral-rule{
			width: 690rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: #A2A2A2;
			margin-top: 30rpx;
		}
	}
	.modal-title{
		width: 100%;
		display: flex;
		align-items: center;
		margin-top: 124rpx;
		justify-content: center;
		font-size: 17px;
		color: #222222;
		& > text:nth-child(2){
			font-size: 24px;
			color: #C9281C;
			margin: 0 10rpx;
		}
	}
	.modal-button{
		width: 494rpx;
		height: 90rpx;
		background-image: linear-gradient(180deg, #FFC800 0%, #FF9800 100%);
		border-radius: 22.5px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 68rpx 54rpx 50rpx 54rpx;
		font-size: 17px;
		color: #FFFFFF;
	}
	.punch-icon{
		width: 100%;
		height: 242rpx;
		position: fixed;
		z-index: 1076;
		top: 50%;
		margin-top: -380rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.25s linear;
		image{
			width: 492rpx;
			height: 242rpx;
			transition: all 0.25s linear;
		}
	}
</style>
