<template>
	<view class="randomRedBag">
		<view class="randomRedBag-top-wrapper" :style="{backgroundImage: `url(${bgImg})`}">
			<view class="randomRedBag-header" >
				<view class="img-box" @click="goBack">
					<image src="../../static/image/ych/back.png" mode="" ></image>
				</view>
				
				<view class="randomRedBag-header-title">随机红包</view>
			</view>
			<view class="rule" @click="goToAtricle(9)">规则</view>
			<view class="randomRedBag-title">
				<text>今日已送出趣豆</text>
				<text class="randomRedBag-title-price">¥{{totalPoints}}</text>
			</view>
			<view class="randomRedBag-main">
				<view class="randomRedBag-main-title">
					<image src="../../static/image/huangguan.png" mode=""></image>
					<view class="randomRedBag-main-title-text">手气最佳</view>
				</view>
				<view class="randomRedBag-main-center">
					<view class="randomRedBag-main-center-price">
						<text v-if="!autoplayFlag">{{amount}}</text>
						<u-count-to v-else ref="uCountTo" :start-val="amount" :end-val="0" :decimals="2" color = '#C9281C;' font-size = "96" :use-easing="false" :autoplay="autoplayFlag"></u-count-to>
						<!-- {{amount}} -->
					</view>
					<view class="tixian-button" @click="getQD">提豆</view>
				</view>
				<view class="randomRedBag-main-xuxian"></view>
				<view class="randomRedBag-main-time">{{h}}:{{i}}:{{s}}后趣豆将失效</view>
		<!-- 		<view class="randomRedBag-main-progress">
					<view class="randomRedBag-main-progress-in" :style="{width:progress}"></view>
					<view class="randomRedBag-main-progress-number">{{progress}}</view>
				</view> -->
			</view>
			<view class="randomRedBag-footer">
				<view class="randomRedBag-footer-top" @click="hanleToWechatShare">邀请好友助力，领更多趣豆</view>
				<view class="randomRedBag-footer-bottom">
					<image src="../../static/image/hongbao2.png" mode="" class="randomRedBag-footer-bottom-left"></image>
					<view class="randomRedBag-footer-bottom-right">累积到{{minNum}}趣豆就能提豆</view>
				</view>
			</view>
		</view>
		
		<view class="randomRedBag-list">
			<view class="randomRedBag-list-header">
				<view class="randomRedBag-list-header-box">
					<view class="small-circle"></view>
					<view class="big-circle mgl"></view>
					<view class="randomRedBag-list-header-text">趣豆记录</view>
					<view class="big-circle mgr"></view>
					<view class="small-circle"></view>
				</view>
				<view class="randomRedBag-list-header-tip">邀请好友助力也可以领到趣豆哦</view>
			</view>
			<view class="randomRedBag-list-main" v-for="(item, index ) in helpList" :key = "index">
				<view class="randomRedBag-list-main-left">
					<view class="randomRedBag-list-main-left-avatar">
						<image :src="item.avatar" mode=""></image>
					</view>
					<view class="randomRedBag-list-main-left-userInfo">
						<view class="randomRedBag-list-main-left-userInfo-top">{{item.userName}}</view>
						<view class="randomRedBag-list-main-left-userInfo-bottom">{{item.remark}}</view>
					</view>
				</view>
				<view class="randomRedBag-list-main-right">帮你获得了{{item.amount}}趣豆</view>
			</view>
		</view>
		<u-popup v-model="copyPop" mode="center"  class="copy-pop" border-radius="4"  :mask-close-able="false">
			<view class="copy-wrapper" @click.stop>
				<view class="copy-img">
					<image src="../../static/image/copy.png" mode=""></image>
				</view>
				<view class="copy-title mgt">
					分享口令已复制
				</view>
				<view class="copy-title">
					去微信粘贴给好友<span>领趣豆</span>
				</view>
				<view class="copy-button" @click.stop="copyToShare">
					<view class="confirm-button-left">
						<image src="../../static/image/wexin1.png" mode=""></image>
					</view>
					<view class="confirm-button-right">去微信粘贴</view>
				</view>
			</view>
		</u-popup>
	
		<view class="mask" v-if="groupFlag">
			<view class="shareGroup-wrapper" >
				<view class="shareGroup" :style="{backgroundImage: `url(${shareGroupBg})`}">
					<view class="sharegroup-header">
						<view class="shareGroup-title">恭喜您又获得趣豆</view>
						<view class="shareGroup-center">已存入趣豆收入</view>
						<view class="sharegroup-price">{{amount}}</view>
					</view>
					<view class="sharegroup-bottom">
						<view class="sharegroup-bottom-text">继续分享两个群聊，再领一次趣豆</view>
						<view class="sharegroup-bottom-button" @click="showCopyPop">
							<image src="../../static/image/wexin.png" mode=""></image>
							<view>分享群聊（{{shareCount}}/2）</view>
						</view>
					</view>
				</view>
				<view class="closeShareGroup" @click="handleCopyPopShow" > 
					<image src="../../static/image/ylc/7.png" mode=""></image>
				</view>
			</view>

		</view>
		
		<view class="mask" v-if="shareSuccess">
			<view class="share-success" >
				<image src="../../static/image/bianzu6.png" mode=""></image>
				<view class="share-success-button" @click="hanleShowGroup">领取趣豆</view>
				
			</view>
			<view class="closeSuccess" @click="hanleCloseSuccess">
				<image src="../../static/image/ylc/7.png" mode=""></image>
			</view>
		</view>
	
	</view>
</template>


<script>
	export default {
		onLoad() {
			this.initInviteInfo()
		},
		onShow() {
	
		},
		data () {
			return {
				bgImg: "../../static/image/ych/else/hongbao3.png",
				copyPop: false,
				shareGroupBg: '../../static/image/ych/else/sharegroup.png',
				groupFlag: false,
				shareSuccess:false,//分享
				shareStatus:0,//分享任务状态，0-分享好友 ，1-分享群聊 
				shareCount:0,//分享群聊次数 
				shareMsg:false,//分享2次群聊后的提醒
				activityId:null,
				amount:0.00,
				totalPoints:0,//送出总额
				minNum:0,//最低提取额度
				friends:null,
				friendsMax:1,
				groupsMax:2,
				progress:'',
				countdown: null,
				h: '00',
				i: '00',
				s: '00',
				helpList: [],
				autoplayFlag: false,
				tiQuFlag: true
			}
		},
		methods: {
			goToAtricle (index) {
				uni.navigateTo({
					url:'../article/article?id=' + index
				})
			},
			// 分享到微信
			hanleToWechatShare(){
				if(this.shareCount < 2){
					if(this.shareStatus == 0){
						this.copyPop = true
					}else if(this.shareStatus >= 1 && this.shareStatus <= 2){
						this.groupFlag = true
					}
				}else{
					console.log('111');
					this.copyPop = true
				}
			},
			// 显示复制邀请弹框
			handleCopyPopShow () {
				this.groupFlag = !this.groupFlag
			},
			// 复制后分享
			async copyToShare(){
				let error = false
				let res = await this.$fetch(this.$api.getActivityCode,{id:this.activityId},'GET')
				uni.setClipboardData({
					data:res.msg,
					success: async (res) => {
						if(plus.os.name == 'Android'){
							plus.runtime.launchApplication({pname:'com.tencent.mm'},function(e){
								error = true
							})
							if(!error){
								console.log('分享成功！');
								
								if(this.shareStatus == 0){
									let msg = await this.$fetch(this.$api.doShare,{id:this.activityId,type:1},'GET')
									console.log(msg);
									this.initInviteInfo()
									this.friends++;
									this.shareSuccess = true
									this.copyPop = false
									this.shareStatus = 2
									this.amount  = msg.data.amount
									
								}else if(this.shareStatus >= 1 && this.shareStatus <= 2){
									let msg = await this.$fetch(this.$api.doShare,{id:this.activityId,type:2},'GET')
									this.initInviteInfo()
									console.log(msg);
									this.shareCount++
									if(this.shareCount >= 2){
										this.groupFlag = false
										this.copyPop = false
										this.shareMsg = true
										//执行趣豆余额增加操作
										this.amount  = msg.data.amount
									}else{
										this.groupFlag = true
										this.copyPop = false
									}
								}else if(this.shareStatus == 3){
									this.groupFlag = false
									this.copyPop = false
									this.shareMsg = true
								}
								
							}
						}else if(plus.os.name == 'iOS'){
							plus.runtime.launchApplication({action:'weixin://RnUbAwvEilb1rU9g9yBU'},function(e){
								error = true
							})
							if(!error){
								console.log('分享成功！');
								if(this.shareStatus == 0){
									let msg = await this.$fetch(this.$api.doShare,{id:this.activityId,type:1},'GET')
									this.initInviteInfo()
									console.log(msg);
									this.friends++;
									this.shareSuccess = true
									this.copyPop = false
									this.shareStatus = 1
									this.amount  = msg.data.amount
								}else if(this.shareStatus >= 1 && this.shareStatus <= 2){
									let msg = await this.$fetch(this.$api.doShare,{id:this.activityId,type:2},'GET')
									this.initInviteInfo()
									console.log(msg);
									this.shareCount++
									if(this.shareCount >= 2){
										this.groupFlag = false
										this.copyPop = false
										this.shareMsg = true
										//执行趣豆余额增加操作
										this.amount  = msg.data.amount
									}else{
										this.groupFlag = true
										this.copyPop = false
									}
								}else if(this.shareStatus == 3){
									this.groupFlag = false
									this.copyPop = false
									this.shareMsg = true
								}
							}
						}
					}
				})
			},
			showCopyPop () {
				this.groupFlag = false
				this.copyPop = !this.copyPop
			},
			// 显示分享
			hanleShowGroup(){
				this.shareSuccess = false
				this.groupFlag = true
			},
			// 关闭成功分享弹窗
			hanleCloseSuccess(){
				this.shareSuccess = false
			},
			//　返回
			goBack () {
				uni.navigateBack({
					delta: 1
				})
			},
			async initInviteInfo () {
				let res = await this.$fetch(this.$api.getActivity, {}, 'GET', 'FORM')
				console.log(res)
				this.activityId = res.data.activity.id
				this.amount = res.data.activity.amount
				this.totalPoints = res.data.sum
				this.minNum = res.data.min
				this.friends = res.data.activity.friends
				this.shareCount = res.data.activity.groups - 1
				this.shareStatus = res.data.activity.groups
				this.helpList = res.data.help
				if (this.helpList.length > 2) {
					this.helpList.splice(3, this.helpList.length)
				}
				let  nowTime = this.$dayjs()
				let  endTime =  this.$dayjs(res.data.endTime)
				let  seconds = endTime.diff(nowTime,'second')
				this.doLoop(seconds)
			},
			endOfTime() {
				clearInterval(this.countdown)
				this.countdown = null;
			},
			doLoop: function(seconds) {
				this.countDown(seconds)
				this.countdown = setInterval(() => {
					seconds--
					if (seconds < 0) {
						this.endOfTime()
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
					this.endOfTime()
				}
				hour = hour < 10 ? ('0' + hour) : hour
				minute = minute < 10 ? ('0' + minute) : minute
				second = second < 10 ? ('0' + second) : second
				this.h = hour;
				this.i = minute;
				this.s = second
			},
			// 提豆
			async getQD () {
				if (!this.tiQuFlag) {
					return uni.showToast({
						icon: 'none',
						title: '请先获取趣豆后再提取哦'
					})
				}
				if (this.amount <= 0) {
					return uni.showToast({
						icon: 'none',
						title: '请先获取趣豆后再提取哦'
					})
				}
				uni.showModal({
				    title: '提示',
				    content: '请确认是否领取',
				    success: async(res) => {
				        if (res.confirm) {
				            let msg = await this.$fetch(this.$api.getActivityAward, {id: this.activityId}, 'GET', 'FORM')
				            console.log(msg)
							uni.showToast({
								icon: 'none',
								title: msg.msg
							})
							
							if (msg.code == 0) {
								this.tiQuFlag = false
								setTimeout(() => {
									this.autoplayFlag = true
									this.$refs.uCountTo.start();
									this.tiQuFlag = true
								}, 700)
							}
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
			}
		},
		onShow() {
			if(this.shareMsg){
				this.shareMsg = false
				uni.showToast({
					icon:'none',
					title:'分享成功！不要忘了通知朋友查看微信哦！'
				})
			}
		},
		onUnload() {
			this.endOfTime()
		}
	}
</script>

<style lang="less">
	page::after{
		display: none;
	}
	page{
		width: 100%;
		overflow-x: hidden;
		background: red;  
	}
	.randomRedBag{
		width: 100%;
		.randomRedBag-top-wrapper{
			width: 100%;
			height: 1126rpx;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			position: relative;
			.randomRedBag-header{
				width: 100%;
				display: flex;
				align-items: center;
				height: 42rpx;
				position: relative;
				top: var(--status-bar-height);
				padding-left: 30rpx;
				padding-top: 16rpx;
				box-sizing: border-box;
				.img-box{
					width: 24rpx;
					height: 42rpx;
					position: relative;
					image{
						width: 24rpx;
						height: 42rpx;
					}
					&::after{
						content: '';
						position: absolute;
						left: -50rpx;
						right: -50rpx;
						top: -50rpx;
						bottom: -50rpx;
					}
				}
				
				.randomRedBag-header-title{
					font-family: PingFangSC-Regular;
					font-size: 17px;
					color: #FFFFFF;
					line-height: 32px;
					margin: 0 auto;
					transform: translateX(-24rpx);
				}
			}
			.rule{
				position: absolute;
				right: 0;
				top: 96rpx;
				width: 98rpx;
				height: 62rpx;
				line-height: 62rpx;
				background-image: linear-gradient(180deg, #FFAF00 0%, #FF7C00 100%);
				border-radius: 100px 0 0 100px;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #F7F7F7;
				text-align: center;
			}
			.randomRedBag-title{
				position: absolute;
				top: 181rpx;
				left: 50%;
				transform: translateX(-50%);
				font-family: PingFangSC-Medium;
				font-size: 12px;
				color: #FFC586;
				.randomRedBag-title-price{
					padding-left: 11rpx;
					box-sizing: border-box;
				}
			}
			.randomRedBag-main{
				width: 490rpx;
				height: 328rpx;
				position: absolute;
				left: 50%;
				top: 278rpx;
				transform: translateX(-50%);
				.randomRedBag-main-title{
					width: 100%;
					font-family: PingFangSC-Regular;
					font-size: 17px;
					color: #FFFFFF;
					line-height: 32px;
					margin: 0 auto;
					display: flex;
					justify-content: center;
					align-items: center;
					
					image{
						width: 26rpx;
						height: 20rpx;
					}
					.randomRedBag-main-title-text{
						font-family: PingFangSC-Semibold;
						font-size: 12px;
						color: #FFD582;
						padding-left: 10rpx;
						box-sizing: border-box;
					}
				}
				.randomRedBag-main-center{
					text-align: center;
					padding-bottom: 20rpx;
					box-sizing: border-box;
					.randomRedBag-main-center-price{
						width: 100%;
						text-align: center;
						padding-left: 14rpx;
						box-sizing: border-box;
						font-family: PingFangSC-Semibold;
						font-size: 48px;
						color: #C9281C;
						font-weight: bold;
					}
					.tixian-button{
						width: 78rpx;
						height: 44rpx;
						line-height: 44rpx;
						font-family: PingFangSC-Regular;
						font-size: 10px;
						color: #C9281C;
						letter-spacing: -0.24px;
						text-align: center;
						background-image: linear-gradient(180deg, #FFE9BD 0%, #FFCF88 100%);
						border-radius: 100px 0 0 100px;
						position: absolute;
						// right: -101rpx;
						// top: -30rpx;
						right: 0;
						top: 30rpx;
					}
				}
				.randomRedBag-main-xuxian{
					height:2rpx;
					// border-bottom: 2rpx dashed #F5E5E8;
					background: linear-gradient(to right, transparent 0%, transparent 50%,#F5E5E8 50%,#F5E5E8 100%);
					background-size: 10rpx 1px;
					background-repeat: repeat-x;
				}
				.randomRedBag-main-time{
					text-align: center;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #C1B4B5;
					padding-top: 20rpx;	
					padding-bottom: 20rpx;
					box-sizing: border-box;
				}
				.randomRedBag-main-progress{
					width: 420rpx;
					height: 6rpx;
					margin: 0 auto;
					background-color: #FFD9A1;
					border-radius: 2px;
					.randomRedBag-main-progress-in{
						position: relative;
						// width: 50%;
						height: 100%;
						border-radius: 2px;
						background-color: #C9281C;
					}
					.randomRedBag-main-progress-number{
						position: relative;
						left: 50%;
						font-family: PingFangSC-Regular;
						font-size: 10px;
						color: #C9281C;
						letter-spacing: -0.24px;
					}
				}
			}
			.randomRedBag-footer{
				width: 100%;
				position: absolute;
				left: 50%;
				
				transform: translate(-50%);
				display: flex;
				flex-direction: column;
				align-items: center;
				top: 660rpx;
				.randomRedBag-footer-top{
					width: 420rpx;
					height: 70rpx;
					line-height: 70rpx;
					background: #FEDE69;
					box-shadow: inset 0 0 3px 0 rgba(255,255,255,0.50);
					border-radius: 4px;
					box-sizing: border-box;
					font-family: PingFangSC-Semibold;
					font-size: 12px;
					color: #E04E35;
					text-align: center;
				}
				.randomRedBag-footer-bottom{
					display: flex;
					padding-top: 10rpx;
					box-sizing: border-box;
					text-align: center;
					.randomRedBag-footer-bottom-left{
						width: 28rpx;
						height: 26rpx;
					}
					.randomRedBag-footer-bottom-right{
						font-family: PingFangSC-Regular;
						font-size: 10px;
						color: #FFFFFF;
						letter-spacing: 0;
						padding-left: 10rpx;
						box-sizing: border-box;
					}
				}
			}
		}
		.randomRedBag-list{
			width: 100%;
			// height: 504rpx;
			// height: 520rpx;
			// height: 552rpx;
			height: 41%;
			position: fixed;
			bottom: 0;
			background-image: linear-gradient(154deg, #FFE7B7 0%, #FFCB80 95%);
			border-radius: 17px 17px 0 0;
			padding: 30rpx;
			// padding-top: 40rpx;
			padding-bottom: 0;
			box-sizing: border-box;
			.randomRedBag-list-header{ 
				height: 120rpx;
				border-width: 0 0 1rpx 0 ;
				border-style: solid;
				border-color: rgba(255,255,255,0.20);
				border-radius: 0.5px;
				.randomRedBag-list-header-box{
					display: flex;
					align-items: center;
					justify-content: center;
					.small-circle{
						width: 8rpx;
						height: 8rpx;
						border-radius: 50%;
						background: #E88A00;
						box-sizing: border-box;
					}
					.big-circle{
						width: 12rpx;
						height: 12rpx;
						border-radius: 50%;
						background: #E88A00;
						&.mgl{
							margin-left: 10rpx;
						}
						&.mgr{
							margin-right: 10rpx;
						}
					}
					.randomRedBag-list-header-text{
						width: 138rpx;
						height: 40rpx;
						text-align: center;
						line-height: 40rpx;
						font-family: PingFangSC-Semibold;
						font-size: 14px;
						color: #E88A00;
						letter-spacing: -0.34px;
					}
				}
				.randomRedBag-list-header-tip{
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #FF9800;
					letter-spacing: -0.29px;
					text-align: center;
					padding-top: 10rpx;
					box-sizing: border-box;
				}
			}
			.randomRedBag-list-main{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;
				
				border-width: 0 0 1rpx 0 ;
				border-style: solid;
				border-color: rgba(255,255,255,0.20);
				border-radius: 0.5px;
				box-sizing: border-box;
				&:last-child{
					border: 0;
				}
				.randomRedBag-list-main-left{
					display: flex;
					align-items: center;
					.randomRedBag-list-main-left-avatar{
						image{
							width: 70rpx;
							height: 70rpx;
							border-radius: 50%;
						}
					}
					.randomRedBag-list-main-left-userInfo{
						display: flex;
						flex-direction: column;
						padding-left: 20rpx;
						box-sizing: border-box;
						.randomRedBag-list-main-left-userInfo-top{
							font-family: PingFangSC-Semibold;
							font-size: 14px;
							color: #FF9800;
							letter-spacing: -0.34px;
						}
						.randomRedBag-list-main-left-userInfo-bottom{
							font-family: PingFangSC-Regular;
							font-size: 10px;
							color: #FF9800;
							letter-spacing: -0.24px;
						}
					}
				}
				.randomRedBag-list-main-right{
					font-family: PingFangSC-Semibold;
					font-size: 14px;
					color: #FF9800;
					font-weight: bold;
					letter-spacing: -0.34px;
				}
			}
		}
		.copy-wrapper{
			.copy-img{
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 46rpx;
				image{
					width: 176rpx;
					height: 132rpx;
				}
			}
			.copy-title{
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #222222;
				letter-spacing: -0.34px;
				text-align: center;
				margin: 0 82rpx;
				&.mgt {
					margin-top: 30rpx;
				}
				span{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #C9281C;
					letter-spacing: -0.34px;
				}
			}
			.copy-button{
				width: 386rpx;
				height: 70rpx;
				background: #C9281C;
				border-radius: 4px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 auto;
				margin-top: 20rpx;
				margin-bottom: 42rpx;
				.confirm-button-left{
					image{
						width: 42rpx;
						height: 32rpx;
					}
				}
				.confirm-button-right{
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #FFFFFF;
					letter-spacing: -0.34px;
				}
			}
		}
			.mask{
				position: fixed;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				background-color: rgba(0,0,0,0.5) !important;
			}
			.shareGroup-wrapper{
				width: 504rpx;
				height: 642rpx;
				background-color: rgba(0,0,0,0.1) !important;
			}
			.shareGroup{
				width: 504rpx;
				height: 642rpx;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				.sharegroup-header{
					padding-top: 60rpx;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #FF9800;
					letter-spacing: -0.34px;
					text-align: center;
					.shareGroup-center{
						font-size: 12px;
					}
					.sharegroup-price{
						padding-top: 40rpx;
						padding-bottom: 176rpx;
						font-size: 32px;
						color: #C9281C;
					}
				}
				.sharegroup-bottom{
					font-size: 14px;
					color: #FFD47F;
					text-align: center;
					display: flex;
					flex-direction: column;
					align-items: center;
					.sharegroup-bottom-button{
						width: 414rpx;
						height: 80rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						background-image: linear-gradient(180deg, #FFE38D 0%, #FFBD3F 100%);
						box-shadow: 0 2px 3px 0 rgba(203,41,16,0.50);
						border-radius: 4px;
						font-size: 14px;
						color: #EC4E36;
						margin-top: 30rpx;
						image{
							width: 42rpx;
							height: 32rpx;
						}
					}
				}
			}
			.closeShareGroup{
				width: 50rpx;
				height: 50rpx;
				position: fixed;
				right: 134rpx;
				top: var(--status-bar-height);
				transform: translateY(270rpx);
				z-index: 99999;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.share-success{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				.share-success-title{
					background-image: linear-gradient(180deg, #FFAD03 0%, #FFC500 100%);
					
				}
				image{
					width: 692rpx;
					height: 530rpx;
				}
				.share-success-button{
					width: 448rpx;
					height: 90rpx;
					line-height: 90rpx;
					background-image: linear-gradient(180deg, #FFE38D 0%, #FFBD3F 100%);
					box-shadow: 0 2px 3px 0 rgba(203,41,16,0.50);
					border-radius: 22.5px;
					font-family: PingFangSC-Medium;
					font-size: 17px;
					color: #EC5237;
					letter-spacing: -0.41px;
					text-align: center;
					margin: 0 auto;
				}
				
			}
			.closeSuccess{
				width: 50rpx;
				height: 50rpx;
				position: fixed;
				right: 134rpx;
				top: var(--status-bar-height);
				transform: translateY(270rpx);
				z-index: 99999;
				image{
					width: 100%;
					height: 100%;
				}
			
		}
	}
</style>
