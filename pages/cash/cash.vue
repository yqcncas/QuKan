<template>
	<view>
		<view class="line-30"></view>
		<view class="info-input">
			<view class="input-item">
				<view>支付宝账号</view>
				<view>
					<input type="text" v-model="alipayAccount" placeholder="请输入支付宝账号" placeholder-class="placeHolderClass" />
				</view>
			</view>
			<view class="input-item">
				<view>真实姓名</view>
				<view>
					<input type="text" v-model="name" placeholder="请输入真实姓名" placeholder-class="placeHolderClass" />
				</view>
			</view>
		</view>
		<view class="line-30"></view>
		<view class="cash-money">
			<view class="cash-title">提现金额</view>
			<view class="cash-input">
				<view>¥</view>
				<input type="number" v-model="money" placeholder="请输入提现金额" placeholder-class="placeHolderClass" />
			</view>
			<view class="cash-tips">
				<view>
					<image src="../../static/image/ylc/27.png" mode=""></image>
					<text>可提现佣金</text><text>¥{{reward}}</text>
				</view>
				<view>
					收取手续费1%
				</view>
			</view>
		</view>
		<view class="bottomRedButton" @click="addDraw">
			确认提现
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				alipayAccount:'',
				money:'',
				reward:''
			};
		},
		methods:{
			// 提现
			async addDraw(){
				if(!this.alipayAccount || !this.money || !this.name) return uni.showToast({icon:'none',title:'请填写完整'})
				if(this.money > this.reward) return uni.showToast({icon:'none',title:'佣金不足！'})
				if(!this.$u.test.chinese(this.name)) return uni.showToast({icon:'none',title:'姓名请输入汉字！'})
				let res = await this.$fetch(this.$api.addDraw,{account:this.alipayAccount,amount:this.money,name:this.name},'GET')
				console.log(res);
				uni.showToast({
					icon:'none',
					title:res.msg
				})
				if(res.code == 0){
					this.reward = this.reward - this.money
				}
				
			}
		},
		onLoad(options) {
			this.reward = options.reward
		}
	}
</script>

<style lang="less">
	page{
		background: #f3f3f3;
	}
	.info-input{
		width: 100%;
		background: #FFFFFF;
		.input-item{
			width: 720rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			margin-left: 30rpx;
			border-bottom: 1px solid #F5F5F5;
			& > view:first-child{
				font-size: 14px;
				color: #222222;
				width: 180rpx;
			}
			& > view:last-child{
				width: 510rpx;
				margin-right: 30rpx;
				display: flex;
				font-size: 17px;
				color: #000000;
				input{
					flex: 1;
				}
			}
		}
	}
	.cash-money{
		width: 690rpx;
		padding: 30rpx 30rpx;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		.cash-title{
			font-size: 16px;
			color: #333540;
			font-weight: bold;
		}
		.cash-input{
			width: 690rpx;
			height: 144rpx;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #F5F5F5;
			& > view:first-child{
				font-size: 24px;
				color: #333540;
				margin-right: 20rpx;
			}
			input{
				width: 600rpx;
				font-size: 30px;
				color: #333540;
				height: 100%;
			}
		}
		.cash-tips{
			width: 690rpx;
			margin-top: 24rpx;
			display: flex;
			flex-direction: column;
			& > view:first-child{
				width: 690rpx;
				display: flex;
				align-items: center;
				font-size: 12px;
				color: #A2A2A2;
				image{
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}
				& > text:nth-child(3){
					font-size: 14px;
					color: #D1000C;
				}
			}
			& > view:last-child{
				margin-top: 6rpx;
				margin-left: 40rpx;
				font-size: 12px;
				color: #A2A2A2;
			}
		}
	}
</style>
