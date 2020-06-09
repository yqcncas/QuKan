<template>
	<view>
		<view class="line-30"></view>
		<view class="goods">
			<view class="goods-img">
				<image :src="orderDetail.image" mode=""></image>
			</view>
			<view class="goods-info">
				<view>{{orderDetail.title}}</view>
				<view>¥{{orderDetail.price}}</view>
				<view class="realPay">
					<text>实付：</text><text>¥{{orderDetail.nowPrice}}</text>
				</view>
	<!-- 			<view class="totalPay">
					<text>合计：</text><text>¥238</text><text>+3000积分</text>
				</view> -->
			</view>
		</view>
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
		<view class="bottomRedButton" @click="submitEva">发布</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.orderNum = options.id
			if (options.index) {
				this.itemIndex = options.index
			}
			console.log(this.orderNum)
			console.log(this.$md5('holle'))
			this.initOrderDetai()
			this.getQnToken()
		},
		data() {
			return {
				imgList:[],//申诉图片-展示
				content:'',//申诉内容
				qiniuToken:'',
				orderNum: '',
				orderDetail: {},
				loadNum: 9
			};
		},
		methods:{
			// 初始数据
			async initOrderDetai () {
				let res = await this.$fetch(this.$api.getQukanOrderInfo, {ordnum: this.orderNum}, "GET", 'FORM')
				console.log(res)
				this.orderDetail = res.data[0]
			},
			// 获取七牛token
			async getQnToken () {
				let res = await this.$fetch(this.$api.getQiniuToken, {}, "GET", 'FORM')
				console.log(res)
				this.qiniuToken = res.msg
			},
			// 上传图片
			uploadIamge(){
				let token = uni.getStorageSync('token')
				uni.chooseImage({
					count:this.loadNum,
					sizeType: ['original', 'compressed'],
					success: (res) => {
						this.loadNum = this.loadNum - res.tempFilePaths.length
						if(res.tempFilePaths.length + this.imgList.length <= 9){
							for (var i = 0; i < res.tempFilePaths.length; i++) {
								// let key = this.$md5(res.tempFilePaths[i])
								// qiniuUploader.upload(res.tempFilePaths[i], (e) => {
								// 	this.imgList.push(e.imageURL)
								// }, (error) => {
								// 	uni.showToast({
								// 		title: '上传失败',
								// 		icon: 'none'
								// 	})
								// 	var a = JSON.stringify(error);
								// 	console.log('error: ' + a);
								// }, {
								// 	region: 'ECN',
								// 	domain: 'https://img.bajiaostar.com',
								// 	key: key,
								// 	uptoken: this.qiniuToken
								// })
								uni.uploadFile({
									url: this.$api.unloadLocation, //仅为示例，非真实的接口地址
									filePath: res.tempFilePaths[i],
									name: 'file',
									formData: {
										token: this.qiniuToken
									},
									success: (uploadFileRes) => {
										console.log(uploadFileRes);
										this.imgList.push(this.$api.baseLocation + JSON.parse(uploadFileRes.data).hash)
									}
								});
								
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
			//　提交
			async submitEva () {
				let res = await this.$fetch(this.$api.addQukanComment, {content: this.content, goodsId: this.orderDetail.goodsId, image: this.imgList, ordnum: this.orderDetail.ordnum}, 'GET', 'FORM')
				console.log(res)
				uni.showToast({
					icon: 'none',
					title: res.msg
				})
				if (res.code == 0) {
					if (this.itemIndex) {
						uni.setStorageSync('evaFlag', this.itemIndex)
					} else {
						uni.setStorageSync('evaFlagRef', true)
					}
					
					
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background: #f3f3f3;
	}
	.goods{
		width: 690rpx;
		padding: 30rpx 30rpx;
		display: flex;
		background: #FFFFFF;
		.goods-img{
			width: 200rpx;
			height: 200rpx;
			image{
				width: 200rpx;
				height: 200rpx;
			}
		}
		.goods-info{
			width: 470rpx;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			& > view:first-child{
				width: 470rpx;
				font-size: 14px;
				color: #4A4A4A;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-weight: bold;
			}
			& > view:nth-child(2){
				font-size: 14px;
				margin-top: 8rpx;
				color: #222222;
				width: 470rpx;
			}
			.realPay{
				width: 470rpx;
				margin-top: 12rpx;
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #A2A2A2;
				& > text:last-child{
					font-size: 17px;
					color: #C9281C;
				}
			}
			.totalPay{
				width: 470rpx;
				display: flex;
				align-items: center;
				font-size: 14px;
				color: #A2A2A2;
				margin-top: 12rpx;
				& > text:nth-child(2){
					font-size: 17px;
					color: #C9281C;
				}
				& > text:nth-child(3){
					font-size: 12px;
					color: #FFA900;
				}
			}
		}
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
</style>
