<template>
	<view>
		<view class="background">
			<image src="../../static/image/ylc/1.png" mode=""></image>
		</view>
		<view class="tui-header-box" :style="{height:height+'px'}">
			<view class="tui-header" :style="{paddingTop:top+'px'}">
				充值
			</view>
			<view class="header-tips">
				<view><text>最高优惠</text><text>20%</text></view>
				<view>仅限快捷支付</view>
			</view>
		</view>
		<view class="recharge-list">
			<view class="recharge-item" v-for="(item,index) in rechargeList" :key="index" @click="handleChooseMoney(item.id,item.payMoney,item.giveMoney)">
				<view :class="item.id == chooseId ? 'chooseRadio':'noChooseRadio'">
					<view v-if="item.id == chooseId"></view>
				</view>
				<view :class="item.id == chooseId ? 'chooseAmount':'noChooseAmount'">
					{{item.payMoney}}
				</view>
				<view>
					<view>
						<view>
							<text>赠</text><text>{{item.giveMoney}}</text><text>趣豆</text>
						</view>
						<view>
							<text>永久有效</text>
						</view>
					</view>
					<view>
						<image src="../../static/image/ylc/2.png" mode="" @click.stop="handleToCheckExplain(item.payMoney,item.giveMoney)"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部操作栏 -->
		<view class="bottom-action">
			<view class="action-left">
				<view>
					<view><text>合计：</text><text>¥{{totalMoney}}</text></view>
					<view>
						<text>共赠送</text><text>{{totalGive}}</text><text>趣豆</text>
					</view>
				</view>
				<view>
					<u-number-box :value="value" @change="valChange" :min="1" color="#C9281C" class="number-box"></u-number-box>
				</view>
			</view>
			<view class="action-right" @click="handleToPay">
				结算
			</view>
		</view>
		<u-popup mode="bottom" v-model="payShow" border-radius="17" @close="handleToClosePay">
			<view class="timeDown">
				<view>
					<text>付款</text><text>{{m}}:{{s}}</text>
				</view>
				<view>
					<image src="../../static/image/ylc/3.png" mode="" @click="handleToClosePay"></image>
				</view>
			</view>
			<view class="pay-item" @click="choosePayWay(1)">
				<view :class="choosePayId == 1 ?'choosePay':''">
					<view></view>
				</view>
				<view>
					<image src="../../static/image/ylc/5.png" mode=""></image>
				</view>
				<view>支付宝支付</view>
			</view>
			<view class="pay-item" @click="choosePayWay(2)">
				<view :class="choosePayId == 2 ?'choosePay':''">
					<view></view>
				</view>
				<view>
					<image src="../../static/image/ylc/4.png" mode=""></image>
				</view>
				<view>微信支付</view>
			</view>
			<view class="pay-count">
				<text>支付</text><text>¥{{totalMoney}}</text>
			</view>
			<view class="pay-button" @click="handleToSettle">
				付款
			</view>
		</u-popup>
		<u-popup v-model="confirmShow" mode="center"  border-radius="4">
			<view class="confirm-img">
				<image src="../../static/image/ylc/6.png" mode=""></image>
			</view>
			<view class="confirm-title">
				已完成支付
			</view>
			<view class="confirm-button" @click="closePopup">
				确定
			</view>
		</u-popup>
		<view class="closeIcon" v-if="confirmShow" @click="closePopup">
			<image src="../../static/image/ylc/7.png" mode=""></image>
		</view>
		<u-popup v-model="explainShow" mode="bottom" border-radius="17">
			<view class="rule-title">
				<view>
					<text>使用规则</text>
				</view>
				<view>
					<image src="../../static/image/ylc/3.png" mode="" @click="handleCloseExplain"></image>
				</view>
			</view>
			<view class="explain-money">
				<view>{{explainMoney}}</view>
				<view>
					<view>趣砍</view>
					<view>玩转趣砍赢好礼</view>
					<view>有效期限 永久有效</view>
				</view>
			</view>
			<view class="useRule-title">使用规则</view>
			<view class="useRule-content">
				充值{{explainMoney}}元赠送{{explainGive}}趣币，全新购物模式，趣币用于砍价使用（根据中华人民共和国法律法规规定趣币和积分不能提现，不能转让）
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
				chooseId:0,//选中的充值面额id
				value:1,
				rechargeList:[],
				payShow:false,
				choosePayId:0,
				confirmShow:false,
				explainShow:false,
				totalMoney:0,
				totalGive:0,
				chooseMoney:0,
				chooseGive:0,
				explainMoney:0,
				explainGive:0,
				m: '30',
				s: '00',
				countdown: null,
				payOrderId:'',//充值订单id
			}
		},
		onLoad() {
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
			this.getPayList()
		},
		methods: {
			valChange(e) {
				console.log(e);
				this.value = e.value
				this.totalMoney = this.chooseMoney * this.value
				this.totalGive = this.chooseGive * this.value
			},
			handleChooseMoney(id,money,give){
				this.chooseId = id
				this.chooseMoney = money
				this.chooseGive = give
				this.totalMoney = money * this.value
				this.totalGive = give * this.value
			},
			// 唤出支付方式
			handleToPay(){
				this.doLoop(1800)
				this.payShow = true
			},
			// 选中支付方式
			choosePayWay(id){
				this.choosePayId = id
			},
			// 支付
			async handleToSettle(){
				if(this.choosePayId == 1){
					console.log(this.chooseId);
					let res = await this.$fetch(this.$api.appPayRecharge,{id:this.chooseId, count: this.value},'POST','form')
					console.log(res);
					uni.requestPayment({
						provider:'alipay',
						orderInfo:res.msg,
						success: (res) => {
							this.payShow = false
							this.confirmShow = true
						},
						fail: (err) => {
							console.log(err);
						}
					})
				}
			},
			// 关闭确认弹窗
			closePopup(){
				this.confirmShow = false
			},
			// 查看解释
			handleToCheckExplain(pay,give){
				this.explainMoney = pay
				this.explainGive = give
				this.explainShow = true
			},
			// 关闭解释
			handleCloseExplain(){
				this.explainShow = false
			},
			// 取消支付 
			handleToClosePay(){
				clearInterval(this.countdown)
				this.payShow = false
			},
			// 获取充值列表
			async getPayList(){
				let res = await this.$fetch(this.$api.getPayList,{},'GET')
				console.log(res);
				this.rechargeList = res.data
			},
			doLoop: function(seconds) {
				this.countDown(seconds)
				this.countdown = setInterval(() => {
					seconds--
					if (seconds < 0) {
						clearInterval(this.countdown)
						this.payShow = false
						return
					}
					this.countDown(seconds)
				}, 1000)
			},
			countDown(seconds) {
				let [hour, minute, second] = [0, 0, 0]
				if (seconds > 0) {
					hour = Math.floor(seconds / (60 * 60))
					minute = Math.floor(seconds / 60) - (hour * 60)
					second = Math.floor(seconds) - (hour * 60 * 60) - (minute * 60)
				} else {
					clearInterval(this.countdown)
					this.payShow = false
				}
				hour = hour < 10 ? ('0' + hour) : hour
				minute = minute < 10 ? ('0' + minute) : minute
				second = second < 10 ? ('0' + second) : second
				this.m = minute;
				this.s = second
			}
		}
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
		height: 266rpx;
		image{
			width: 750rpx;
			height: 266rpx;
		}
	}
	.tui-header-box {
		width: 100%;
		position: absolute;
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
	.header-tips{
		margin-left: 60rpx;
		color: #FFFFFF;
		& > view:first-child{
			display: flex;
			align-items: center;
			font-size: 28rpx;
			& > text:last-child{
				margin-left: 10rpx;
				font-size: 44rpx;
				font-weight: bold;
			}
		}
		& > view:last-child{
			font-size: 18rpx;
		}
	}
	.recharge-list{
		width: 630rpx;
		padding: 30rpx 30rpx;
		position: absolute;
		top: 230rpx;
		left: 30rpx;
		right: 30rpx;
		display: flex;
		margin-bottom: 140rpx;
		flex-direction: column;
		background: #FFFFFF;
		border-radius: 8rpx;
		.recharge-item{
			width: 630rpx;
			height: 70rpx;
			display: flex;
			align-items: center;
			.noChooseRadio{
				width: 36rpx;
				height: 36rpx;
				border: 1px solid #C4C4C4;
				border-radius: 50%;
			}
			.chooseRadio{
				width: 36rpx;
				height: 36rpx;
				border: 1px solid #C9281C;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				& > view:first-child{
					width: 24rpx;
					height: 24rpx;
					background: #C9281C;
					border-radius: 50%;
				}
			}
			.noChooseAmount{
				margin-left: 50rpx;
				width: 120rpx;
				height: 70rpx;
				background-image: linear-gradient(180deg, #FFE9BD 0%, #FFD47F 100%);
				border-radius: 4px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 17px;
				color: #FFFFFF;
				text-shadow: 0 2px 1px rgba(0,0,0,0.10);
			}
			.chooseAmount{
				margin-left: 50rpx;
				width: 120rpx;
				height: 70rpx;
				background-image: linear-gradient(180deg, #FF7360 0%, #C9281C 100%);
				border-radius: 4px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 17px;
				color: #FFFFFF;
				text-shadow: 0 2px 1px rgba(0,0,0,0.10);
			}
			& > view:nth-child(3){
				margin-left: 60rpx;
				width: 362rpx;
				display: flex;
				align-items: center;
				height: 70rpx;
				& > view:first-child{
					flex: 2;
					display: flex;
					flex-direction: column;
					& > view:first-child{
						display: flex;
						align-items: center;
						font-size: 12px;
						color: #222222;
						& > text:nth-child(2){
							font-size: 14px;
							color: #FF9800;
							margin: 0 10rpx;
						}
					}
					& > view:last-child{
						font-size: 10px;
						color: #A2A2A2;
					}
				}
				& > view:last-child{
					flex: 1;
					display: flex;
					justify-content: flex-end;
					image{
						width: 36rpx;
						height: 36rpx;
					}
				}
			}
		}
		.recharge-item + .recharge-item{
			margin-top: 30rpx;
		}
	}
	.bottom-action{
		width: 750rpx;
		height: 110rpx;
		display: flex;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		.action-left{
			flex: 7;
			display: flex;
			align-items: center;
			& > view:first-child{
				width: 228rpx;
				display: flex;
				flex-direction: column;
				margin-left: 26rpx;
				& > view:first-child{
					font-size: 14px;
					color: #4A4A4A;
					& > text:last-child{
						font-size: 18px;
						color: #C9281C;
						font-weight: bold;
					}
				}
				& > view:last-child{
					font-size: 12px;
					color: #A2A2A2;
					& > text:nth-child(2){
						font-size: 12px;
						color: #FF9800;
						margin:  0 10rpx;
					}
				}
			}
			& > view:last-child{
				width: 212rpx;
				margin: 0 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.action-right{
			flex: 3;
			background: #C9281C;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: #FFFFFF;
		}
	}
	.timeDown{
		width: 750rpx;
		display: flex;
		align-items: center;
		margin-top: 30rpx;
		& > view:first-child{
			width: 630rpx;
			margin-left: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 17px;
			color: #A2A2A2;
			& > text:last-child{
				color: #222222;
			}
		}
		& > view:last-child{
			margin-right: 30rpx;
			display: flex;
			align-items: center;
			image{
				width: 26rpx;
				height: 28rpx;
			}
		}
	}
	.pay-item{
		width: 750rpx;
		height: 110rpx;
		display: flex;
		align-items: center;
		& > view:first-child{
			margin-left: 30rpx;
			width: 36rpx;
			height: 36rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1px solid #C4C4C4;
			border-radius: 50%;
		}
		.choosePay{
			border: 1px solid #C9281C !important;
			view{
				width: 24rpx;
				height: 24rpx;
				border-radius: 50%;
				background: #C9281C;
			}
		}
		& > view:nth-child(2){
			margin-left: 34rpx;
			display: flex;
			align-items: center;
			image{
				width: 44rpx;
				height: 44rpx;
			}
		}
		& > view:last-child{
			display: flex;
			align-items: center;
			margin-left: 16rpx;
			font-size: 17px;
			color: #222222;
		}
	}
	.pay-count{
		margin-top: 36rpx;
		width: 750rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #222222;
		& > text:nth-child(2){
			margin-left: 12rpx;
			font-size: 18px;
			color: #C9281C;
		}
	}
	.pay-button{
		width: 690rpx;
		height: 90rpx;
		background: #C9281C;
		border-radius: 5px;
		margin: 30rpx 30rpx 20rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		color: #FFFFFF;
	}
	.confirm-img{
		width: 480rpx;
		height: 232rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 232rpx;
			height: 232rpx;
		}
	}
	.confirm-title{
		width: 480rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 17px;
		color: #222222;
		font-weight: bold;
	}
	.confirm-button{
		width: 386rpx;
		height: 70rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #C9281C;
		border-radius: 4px;
		font-size: 14px;
		color: #FFFFFF;
		margin: 38rpx 47rpx 42rpx 47rpx;
	}
	.closeIcon{
		width: 50rpx;
		height: 50rpx;
		position: fixed;
		right: 134rpx;
		// top: 330rpx;
		top:50%;
		margin-top: -290rpx;
		z-index: 1076;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.number-box .u-icon-plus, .u-icon-disabled,.u-icon-minus{
	  width: 100%;
	  height: 100%;
	  text-align: center;
	  line-height: 100%;
	 }
	.rule-title{
		 width: 750rpx;
		 display: flex;
		 align-items: center;
		 margin-top: 24rpx;
		 & > view:first-child{
		 	width: 630rpx;
		 	margin-left: 60rpx;
		 	display: flex;
		 	align-items: center;
		 	justify-content: center;
		 	font-size: 17px;
		 	color: #A2A2A2;
		 	& > text:last-child{
		 		color: #222222;
		 	}
		 }
		 & > view:last-child{
		 	margin-right: 30rpx;
		 	display: flex;
		 	align-items: center;
		 	image{
		 		width: 26rpx;
		 		height: 28rpx;
		 	}
		 }
	}
	.explain-money{
		width: 554rpx;
		height: 160rpx;
		display: flex;
		align-items: center;
		margin: 40rpx 98rpx 0 98rpx;
		& > view:first-child{
			width: 160rpx;
			height: 160rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-image: linear-gradient(180deg, #FF7360 0%, #C9281C 100%);
			border-radius: 4px 0 0 4px;
			font-size: 32px;
			color: #FFFFFF;
		}
		& > view:last-child{
			width: 394rpx;
			height: 156rpx;
			border: 1px solid #C9281C;
			border-radius: 0 4px 4px 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			& > view:first-child{
				font-size: 34rpx;
				color: #222222;
			}
			& > view:nth-child(2){
				font-size: 28rpx;
				color: #C9281C;
			}
			& > view:last-child{
				font-size: 24rpx;
				color: #e3e3e3;
			}
		}
	}
	.useRule-title{
		margin: 30rpx 98rpx 20rpx 98rpx;
		font-size: 14px;
		color: #222222;
	}
	.useRule-content{
		width: 554rpx;
		font-size: 14px;
		color: #222222;
		margin: 0 98rpx 38rpx 98rpx;
		letter-spacing: -0.34px;
	}
</style>
<style>
	.number-box .u-icon-plus, .u-icon-disabled, .u-icon-minus{
		width: 100%;
		height: 100%;
		text-align: center;
		line-height: 100%;
	}
	
</style>