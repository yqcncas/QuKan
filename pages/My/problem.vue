<template>
	<view>
		<view class="line-30"></view>
		<view class="appeal">
			<view>
				<textarea  placeholder="请输入您想说的话..." placeholder-class="textarea-placeholder" v-model="content"/>
			</view>
			<view class="opinion-img">
				<view class="imgList">
					<view class="img-item" v-for="(item,index) in imgList" :key="index">
						<image :src="item" mode="" @tap="previewImg" :data-url="item"></image>
						<image src="../../static/image/ylc/delete.png" mode="" class="icon" @tap.stop="DelImage" :data-index="index"></image>
					</view>
					<view class="uploadImg" v-if="imgList.length < 9" @click="uploadIamge">
						<image src="../../static/image/ylc/50.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="line-30"></view>
		<view class="phoneNumber">
			<input type="number" placeholder="请输入手机号，方便我们联系您" placeholder-class="placeHolderClass" v-model="phone">
		</view>
		<view class="bottomRedButton" @click="handleToSumbit">提交</view>
	</view>
</template>

<script>
	const qiniuUploader =require("../../components/until/qiniuUploader.js")
	import {MD5} from '../../common/md5.js'		
	export default {
		data() {
			return {
				imgList:[],//申诉图片-展示
				content:'',//申诉内容
				qiniuToken:'',
				isSumbit:true,
				phone:'',
				loadNum:9
			};
		},
		methods:{
			// 上传图片
			uploadIamge(){
				let token = uni.getStorageSync('token')
				uni.chooseImage({
					count:this.loadNum,
					sizeType: ['original', 'compressed'],
					success: (res) => {
						this.loadNum = this.loadNum - res.tempFilePaths.length
						if(res.tempFilePaths.length + this.imgList.length <=9){
							for (var i = 0; i < res.tempFilePaths.length; i++) {
								let key = MD5(res.tempFilePaths[i])
								qiniuUploader.upload(res.tempFilePaths[i], (e) => {
									this.imgList.push(e.imageURL)
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
						}else{
							uni.showToast({
								icon:'none',
								title:'超出上传限制'
							})
						}
					}
				})
			},
			//预览图片
			previewImg(e){
				uni.previewImage({
					urls:this.imgList,
					current:e.currentTarget.dataset.url
				})
			},
			// 删除图片
			DelImage(e) {
				uni.showModal({
					title: '是否删除图片',
					content: '确定要删除图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			// 获取七牛Token
			async getQiniuToken(){
				let res = await this.$fetch(this.$api.getQiniuToken,{},'GET')
				this.qiniuToken = res.msg
			},
			// 验证手机号格式是否正确
			checkmobileFormat () {
				let reg = /^[1][3456789][0-9]{9}$/
				if(this.phone){
					if (!reg.test(this.phone)) {
					  uni.showToast({ title: '手机号格式不正确', icon: 'none' })
					  return false
					}
					return true
				}
			},
			// 提交
			async handleToSumbit(){
				if(!this.content) return uni.showToast({icon:'none',title:'请输入内容'})
				if(!this.imgList.length) return uni.showToast({icon:'none',title:'请上传图片'})
				if(!this.$u.test.mobile(this.phone)) return uni.showToast({ title: '手机号格式不正确', icon: 'none' })
				if(!this.isSumbit) return
				this.isSumbit = false
				setTimeout(()=>{
					this.isSumbit = true
				},500)
				let res = await this.$fetch(this.$api.addComplaint,{content:this.content,image:this.imgList.join(','),phonenumber:this.phone},'GET')
				uni.showToast({
					icon:'none',
					title:res.msg
				})
				if(res.code == 0){
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},500)
				}
			}
		},
		onLoad() {
			this.getQiniuToken()
		}
	}
</script>

<style lang="less">
	page{
		background: #f5f5f8;
	}
	.appeal{
		width: 100%;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		& > view:first-child{
			margin: 0 30rpx;
			padding-top: 30rpx;
			width: 690rpx;
			font-size: 14px;
			color: #09023E;
			textarea{
				height: 390rpx
			}
		}
		& > .opinion-img{
			width: 100%;
			background: #FFFFFF;
			margin-bottom: 30rpx;
			.imgList{
				width: 720rpx;
				padding-top: 30rpx;
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				margin-left: 30rpx;
				.img-item{
					position: relative;
					margin-right: 20rpx;
					image{
						width: 150rpx;
						height: 150rpx;
					}
					&:last-child{
						margin-right: 0;
					}
					.icon{
						width: 40rpx;
						height: 40rpx;
						position: absolute;
						right: 0;
						top:0;
						z-index: 999;
					}
				}
				.uploadImg{
					image{
						width: 150rpx;
						height: 150rpx;
					}
				}
				
			}
		}
	}
	.phoneNumber{
		width: 690rpx;
		padding: 0 30rpx;
		height: 110rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		input{
			width: 690rpx;
		}
	}
</style>
