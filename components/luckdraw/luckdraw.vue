<template>
	<view class="container">
		<view class="tui-dot" :class="['tui-dot-'+(index+1)]" v-for="(item,index) in circleList" :key="index"></view>
		<view class="tui-container-in">
			<view class="tui-content-out" :class="['tui-award-'+(index+1), index==indexSelect?'tui-awardSelect' : '' ]" v-for="(item,index) in awardList"
			 :key="index">
			 <!-- :class="{newItemClass:}" -->
				<image class="tui-award-image" :src="item.image" ></image>
<!-- 				<view class="showLuckDrawInfo">
					<view class="showLuckDrawInfo-bottom" >10000积分</view>
				</view> -->
			</view>
			<view class="tui-btn-start" :class="[isRunning?'tui-ative':'']" @tap="startDrawing"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				circleList: 24, //圆点
				awardList: [], //奖品数组
				indexSelect: 0, //被选中的奖品index
				isRunning: false, //是否正在抽奖,
				payJf: 0
			}
		},
		methods: {
			//获取随机数
			getRandom: function(u) {
				let rnd = Math.random() > 0.5 ? "2" : "1";
				u = u || 3;
				for (var i = 0; i < u; i++) {
					rnd += Math.floor(Math.random() * 10);
				}
				console.log(rnd);
				return Number(rnd);
			},
			//开始抽奖
			async startDrawing() {
				if (this.isRunning) return
				this.isRunning= true;
				uni.showModal({
				    title: '提示',
				    content: '是否消耗' + this.payJf + '进行抽奖' ,
				    success: async(msg) =>  {
				        if (msg.confirm) {
				           let res = await this.$fetch(this.$api.executeAward,{},'GET')
				           console.log(res);
				           if (res.code == 500) {
				           	this.isRunning = false
				           	return uni.showToast({
				           		icon: 'none',
				           		title: res.msg
				           	})
				           }
				           let indexSelect = 0;
				           let i = 0;
				           let randomNum = this.getRandom(3);
				           let timer = setInterval(() => {
				           	++indexSelect;
				           	//这里用y=30*x+150函数做的处理.可根据自己的需求改变转盘速度
				           	indexSelect = indexSelect % 8;
				           	this.indexSelect= indexSelect;
				           	i += 40;
				           	if ( i > randomNum && this.awardList[indexSelect].id ==res.data.id ) {
				           		//去除循环
				           		clearInterval(timer)
				           		timer = null;
				           		//获奖提示
				           		uni.showModal({
				           			title: '恭喜您',
				           			content: '获得了奖品【'+this.awardList[indexSelect].name+'】',
				           			confirmColor: '#5677FC',
				           			showCancel: false, //去掉取消按钮
				           			success: (res) => {
				           				if (res.confirm) {
				           					this.isRunning= false
				           				}
				           			}
				           		})
				           	}
				           }, (70 + i))
				           			
				        } else if (msg) {
				            console.log('用户点击取消');
				        }
				    }
				});
			
			},
			// 获取抽奖奖品列表
			async getAwardList(){
				let res = await this.$fetch(this.$api.getAwardList,{},'GET')
				console.log(res);
				this.awardList = res.data.award
				this.payJf = res.data.cost
			}
		},
		created() {
			this.getAwardList()
		}
	}
</script>

<style>
	.container {
		height: 600upx;
		width: 650upx;
		/* width: 746rpx;
		height: 656rpx; */
		background-color: #fc4034;
		margin: 100upx auto;
		margin-top: 0;
		
		border-radius: 40upx;
		box-shadow: 0 10px 0 #d80014;
		position: relative;
	}

	.tui-container-in {
		width: 580upx;
		height: 530upx;
		background-color: #d80014;
		border-radius: 40upx;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}

	/**小圆点 start*/

	.tui-dot {
		position: absolute;
		display: block;
		border-radius: 50%;
		height: 20upx;
		width: 20upx;
	}

	.tui-dot:nth-child(odd) {
		background: #fff;
		animation: 0.5s odd linear infinite;
	}

	.tui-dot:nth-child(even) {
		background: #fcf400;
		animation: 0.5s even linear infinite;
	}

	.tui-dot-1 {
		left: 15upx;
		top: 15upx;
	}

	.tui-dot-2 {
		left: 117.5upx;
		top: 7.5upx;
	}

	.tui-dot-3 {
		left: 220upx;
		top: 7.5upx;
	}

	.tui-dot-4 {
		left: 322.5upx;
		top: 7.5upx;
	}

	.tui-dot-5 {
		left: 425upx;
		top: 7.5upx;
	}

	.tui-dot-6 {
		left: 527.5upx;
		top: 7.5upx;
	}

	.tui-dot-7 {
		left: 620upx;
		top: 15upx;
	}

	.tui-dot-8 {
		left: 622upx;
		top: 109upx;
	}

	.tui-dot-9 {
		left: 622upx;
		top: 203upx;
	}

	.tui-dot-10 {
		left: 622upx;
		top: 297upx;
	}

	.tui-dot-11 {
		left: 622upx;
		top: 391upx;
	}

	.tui-dot-12 {
		left: 622upx;
		top: 485upx;
	}

	.tui-dot-13 {
		left: 620upx;
		top: 565upx;
	}

	.tui-dot-14 {
		left: 517.5upx;
		top: 572upx;
	}

	.tui-dot-15 {
		left: 415upx;
		top: 572upx;
	}

	.tui-dot-16 {
		left: 312.5upx;
		top: 572upx;
	}

	.tui-dot-17 {
		left: 210upx;
		top: 572upx;
	}

	.tui-dot-18 {
		left: 107.5upx;
		top: 572upx;
	}

	.tui-dot-19 {
		left: 15upx;
		top: 565upx;
	}

	.tui-dot-20 {
		left: 7.5upx;
		top: 471upx;
	}

	.tui-dot-21 {
		left: 7.5upx;
		top: 377upx;
	}

	.tui-dot-22 {
		left: 7.5upx;
		top: 283upx;
	}

	.tui-dot-23 {
		left: 7.5upx;
		top: 189upx;
	}

	.tui-dot-24 {
		left: 7.5upx;
		top: 95upx;
	}

	@-webkit-keyframes odd {
		0% {
			background: #fff;
		}

		100% {
			background: #fcf400;
		}
	}

	@keyframes odd {
		0% {
			background: #fff;
		}

		100% {
			background: #fcf400;
		}
	}

	@-webkit-keyframes even {
		0% {
			background: #fcf400;
		}

		100% {
			background: #fff;
		}
	}

	@keyframes even {
		0% {
			background: #fcf400;
		}

		100% {
			background: #fff;
		}
	}

	/**小圆点 end*/

	.tui-content-out {
		position: absolute;
		height: 150upx;
		width: 168upx;
		background-color: #fcecec;
		border-radius: 15upx;
		box-shadow: 0 4px 0 #fcc8d0;
		overflow: hidden;
		/* padding: 30px; */
		/* padding: 24rpx 20rpx 34rpx 22rpx; */
		box-sizing: border-box;
		
	}


	/* 580 530  */

	.tui-award-1 {
		left: 24upx;
		top: 24upx;
	}

	.tui-award-2 {
		left: 206upx;
		top: 24upx;
	}

	.tui-award-3 {
		left: 388upx;
		top: 24upx;
	}

	.tui-award-4 {
		left: 388upx;
		top: 188upx;
	}

	.tui-award-5 {
		left: 388upx;
		top: 352upx;
	}

	.tui-award-6 {
		left: 206upx;
		top: 352upx;
	}

	.tui-award-7 {
		left: 24upx;
		top: 352upx;
	}

	.tui-award-8 {
		left: 24upx;
		top: 188upx;
	}

	/**居中 加粗*/

	.tui-btn-start {
		position: absolute;
		top: 188upx;
		left: 206upx;
		border-radius: 15upx;
		height: 150upx;
		width: 168upx;
		background-color: #fc4034;
		/* box-shadow: 0 4px 0 #fcc8d0; */
		color: #fcf400;
		text-align: center;
		font-size: 32upx;
		font-weight: bold;
		line-height: 150upx;
		background-image: url(../../static/image/ych/else/jiang5.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.tui-ative {
		opacity: 0.6 !important;
	}

	.tui-award-image {
		position: absolute;
		/* margin: auto; */
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		height: 134upx;
		width: 134upx;
	}

	.tui-awardSelect {
		background-color: #fcf400 !important;
		box-shadow: 0 4px 0 rgb(240, 208, 12) !important;
	}
</style>
<style lang="less">
	.tui-award-image{
		position: relative;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		height: 134rpx;
		width: 134rpx;
	}
	.showLuckDrawInfo{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 999;
		.showLuckDrawInfo-top{
			font-family: PingFangSC-Semibold;
			font-size: 17px;
			color: #FFFFFF;
			letter-spacing: 0;
			text-align: center;
			text-shadow: 0 1px 0 rgba(0,0,0,0.20);
			
			&.redBag{
				
				font-family: PingFangSC-Semibold;
				font-size: 10px;
				color: #FFFFFF;
				letter-spacing: 0;
				text-align: center;
				// line-height: 11px;
				margin-top: 10rpx;
				margin-bottom: 2rpx;
				padding-right: 3rpx;
				padding-right: 5rpx;
				box-sizing: border-box;
			}
		}
		.showLuckDrawInfo-bottom{
			width: 100rpx;
			font-family: PingFangSC-Semibold;
			font-size: 10px;
			color: #FFFFFF;
			letter-spacing: 0;
			text-align: center;
			text-shadow: 0 1px 0 rgba(0,0,0,0.20);
			padding-top: 110rpx;
			color: #333333;
			&.redBag{
				font-family: PingFangSC-Semibold;
				font-size: 10px;
				color: #FFFFFF;
				letter-spacing: 0;
				text-align: center;
				padding-right: 5rpx;
				box-sizing: border-box;
				// line-height: 11px;
				
			}
		}
		.newItemClass{
			width: 80rpx;
			height: 80rpx;
		}
	}
</style>
