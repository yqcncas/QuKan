<template>
	<view>
		<view class="line-30"></view>
		<view class="userInfo">
			<view class="avatar" @click="editAvatar">
				<view>
					<image :src="avatar" mode=""></image>
				</view>
				<view>
					<text>修改头像</text>
					<image src="../../static/image/ylc/17.png" mode=""></image>
				</view>
			</view>
			<view class="info" @click="handleToEditName">
				<view><text>昵称</text></view>
				<view>
					<text class="name">{{userName}}</text>
					<image src="../../static/image/ylc/17.png" mode=""></image>
				</view>
			</view>
			<picker mode="selector" :range="sexList" @change="sexChange" range-key="value" :value="sex">
				<view class="info">
					<view><text>性别</text></view>
					<view>
						<text v-if="gender.length == 0">请选择</text>						
						<text v-else class="name">{{gender}}</text>
						<image src="../../static/image/ylc/17.png" mode=""></image>
					</view>
				</view>
			</picker>
			<view class="info" @click="handleToBind">
				<view><text>绑定上级</text></view>
				<view>
					<text class="name">{{Superior}}</text>
					<image src="../../static/image/ylc/17.png" mode=""></image>
				</view>
			</view>
			<view class="info" @click="handleToAddress">
				<view><text>我的地址</text></view>
				<view>
					<image src="../../static/image/ylc/17.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const qiniuUploader =require("../../components/until/qiniuUploader.js")
	import {MD5} from '../../common/md5.js'		
	export default {
		data() {
			return {
				avatar:'../../static/image/ylc/11.png',
				sex:'',
				userName:'',
				sexList:[{id:1,value:'男'},{id:2,value:'女'},{id:3,value:'保密'}],
				gender:'',
				qiniuToken:'',
				isSumbit:true,
				Superior:'',
				upCode:''
			};
		},
		methods:{
			// 修改头像
			editAvatar(){
				uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						console.log(res);
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							let key = MD5(res.tempFilePaths[i])
							qiniuUploader.upload(res.tempFilePaths[i], async (e) => {
								this.avatar = e.imageURL
								console.log(this.avatar);
								let res  = await this.$fetch(this.$api.editUser,{avatar:e.imageURL},'GET')
								console.log(res);
								uni.showToast({
									icon:'none',
									title:res.msg
								})
							}, (error) => {
								uni.showToast({
									title: '上传失败',
									icon: 'none'
								})
								var a = JSON.stringify(error);
								console.log('error: ' + a);
							}, {
								region: 'ECN',
								domain: 'https://img.bajiaostar.com',
								key: key,
								uptoken: this.qiniuToken
							})
						}
					}
				})
			},
			// 性别选择
			async sexChange(e){
				for(var i in this.sexList){
					if( i == e.target.value){
						this.sex = i
						this.gender = this.sexList[i].value
						let res = await this.$fetch(this.$api.editUser,{sex:this.sex},'GET')
						console.log(res);
					}
				}
			},
			// 获取用户信息
			async getUserInfo(){
				let res = await this.$fetch(this.$api.getUserInfo,{},'GET')
				console.log(res.data.userName);
				if(res.data.avatar){
					this.avatar = res.data.avatar
				}
				if(res.data.sex){
					this.sex = res.data.sex
					if(res.data.sex == 0){
						this.gender = '男'
					}else if(res.data.sex == 1){
						this.gender = '女'
					}else{
						this.gender = '保密'
					}
				}
				if(res.data.userName){
					this.userName = res.data.userName
				}
				if(res.data.userInfo.upCode){
					this.upCode = res.data.userInfo.upCode
				}
			},
			// 获取七牛Token
			async getQiniuToken(){
				let res = await this.$fetch(this.$api.getQiniuToken,{},'GET')
				this.qiniuToken = res.msg
			},
			// 修改昵称
			handleToEditName(){
				uni.navigateTo({
					url:'editUserName?name='+this.userName
				})
			},
			// 绑定上级
			handleToBind(){
				uni.navigateTo({
					url:'bindUp?flag=1&upCode='+this.upCode
				})
			},
			// 我的地址
			handleToAddress(){
				uni.navigateTo({
					url:'myAddress'
				})
			},
		},
		onShow() {
			this.getUserInfo()
			this.getQiniuToken()
		},
		onUnload() {
			uni.hideKeyboard()
		}
	}
</script>

<style lang="less">
	page{
		background: #f5f5f8;
	}
	.userInfo{
		background: #FFFFFF;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.avatar{
		width: 720rpx;
		height: 220rpx;
		display: flex;
		align-items: center;
		margin-left: 30rpx;
		border-bottom: 2rpx solid #F0F0F0;
		
		& > view:first-child{
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			
			image{
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
			}
		}
		
		& > view:nth-child(2){
			margin-left: 370rpx;
			width: 188rpx;
			height: 220rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #9B9B9B;
			
			image{
				margin-left: 32rpx;
				width: 16rpx;
				height: 26rpx;
			}
		}
	}
	.info{
		width: 690rpx;
		height: 110rpx;
		display: flex;
		align-items: center;
		margin: 0 30rpx;
		border-bottom: 2rpx solid #F0F0F0;
		
		& > view:first-child{
			flex: 1;
			height: 110rpx;
			line-height: 110rpx;
			font-size: 28rpx;
			color: #9B9B9B;
			letter-spacing: -0.68rpx;
		}
		
		& > view:nth-child(2){
			flex: 1;
			height: 110rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			line-height: 110rpx;
			
			input{
				height: 110rpx;
				text-align: right;
				font-size: 28rpx;
				color: #4A4A4A;
			}
			text{
				height: 110rpx;
				text-align: right;
				font-size: 28rpx;
				color: #9B9B9B;
			}
			
			.name{
				font-size: 14px;
				color: #4A4A4A;
				font-weight: bold;
			}
			
			image{
				margin-left: 32rpx;
				width: 16rpx;
				height: 26rpx;
			}
		}
	}
	.placeHolderClass{
		color:#9B9B9B !important;
		font-weight: normal;
	}
</style>
