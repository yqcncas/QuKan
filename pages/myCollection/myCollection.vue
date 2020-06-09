<template>
	<view>
		<view  class="goods" v-for="(item,index) in collectList" :key="item.id" v-if="!isEmpty" @click="goToQuKan(item.id,item.status)">
			<view class="goods-img">
				<image :src="item.image" mode=""></image>
			</view>
			<view class="goods-info">
				<view class="goods-name">{{item.title}}</view>
				<view class="goods-detail">
					<view>
						<view><text>市场价</text><text>¥{{item.price}}</text></view>
						<view><text>当前价</text><text>¥{{item.nowPrice}}</text></view>
						<view><text>砍到人数</text><text>{{item.qukanGoods.dealCount}}</text></view>
					</view>
					<view @click.stop="cancelOrder(item.id, index)">
						<view>取消收藏</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 加载 -->
		<uni-load-more bgColor="#f3f3f3" :status="hasFlag ? 'loading' : 'noMore'" v-if="!isEmpty"></uni-load-more>
		<view class="line-30"></view>
		<u-empty :show="isEmpty" mode="favor"></u-empty>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				isEmpty:false,
				hasFlag:true,
				page:0,
				collectList:[]
			};
		},
		methods:{
			// 获取我的收藏
			async getMyCollect(){
				if(!this.hasFlag) return
				this.page = ++this.page;
				let res = await this.$fetch(this.$api.getFocus,{pageNum:this.page,pageSize:10},'GET')
				console.log(res);
				if(res.total){
					this.isEmpty = false
				}else{
					this.isEmpty = true
				}
				this.collectList = [...this.collectList,...res.rows]
				this.hasFlag  = 10 * this.page < res.total
			},
			async cancelOrder (goodsId, index) {
				uni.showModal({
				    title: '提示',
				    content: '确定取消收藏么',
				    success: async (res) => {
				        if (res.confirm) {
				           let res = await this.$fetch(this.$api.delFocusQukan, {id: goodsId}, "GET", "FORM")
						   console.log(res)
						   uni.showToast({
						   	icon: 'none',
							title: res.msg
						   })
						   if (res.code == 0) {
							   this.collectList.splice(index, 1)
							   if (this.collectList.length == 0) {
								   this.isEmpty = true
							   }
						   }
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			goToQuKan (id, status) {
				if (status == 0) {
					return uni.showToast({
						icon: 'none',
						title: '该商品暂未开始，请耐心等候'
					})
				}
				uni.redirectTo({
					url: '../QuKan/QuKan?id=' + id
				})
			}
		},
		onLoad() {
			this.getMyCollect()
		}
	}
</script>

<style lang="less">
	page{
		background: #f3f3f3;
	}
	.goods{
		width: 690rpx;
		background: #FFFFFF;
		padding: 30rpx 0;
		margin: 30rpx 30rpx 0 30rpx;
		display: flex;
		.goods-img{
			margin: 0 20rpx 0 30rpx;
			width: 200rpx;
			height: 200rpx;
			image{
				width: 200rpx;
				height: 200rpx;
			}
		}
		.goods-info{
			width: 430rpx;
			margin-right: 10rpx;
			display: flex;
			flex-direction: column;
			.goods-name{
				width: 410rpx;
				font-size: 14px;
				color: #4A4A4A;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				margin-bottom: 20rpx;
			}
			.goods-detail{
				width: 430rpx;
				margin-top: 10rpx;
				display: flex;
				& > view:first-child{
					flex: 1;
					display: flex;
					flex-direction: column;
					& > view:first-child{
						flex: 1;
						display: flex;
						align-items: center;
						font-size: 12px;
						color: #A2A2A2;
						& > text:nth-child(2){
							margin-left: 20rpx;
							font-size: 12px;
							color: #222222;
						}
					}
					& > view:nth-child(2){
						flex: 1;
						display: flex;
						align-items: center;
						font-size: 12px;
						color: #A2A2A2;
						& > text:nth-child(2){
							font-size: 12px;
							margin-left: 20rpx;
							color: #C9281C;
						}
					}
					& > view:last-child{
						flex: 1;
						display: flex;
						align-items: center;
						font-size: 12px;
						color: #A2A2A2;
						& > text:nth-child(2){
							font-size: 12px;
							margin-left: 20rpx;
							color: #222222;
						}
					}
				}
				& > view:last-child{
					flex: 1;
					display: flex;
					align-items: flex-end;
					justify-content: flex-end;
					view{
						width: 136rpx;
						height: 54rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 1px solid #C9281C;
						border-radius: 13.5px;
						font-size: 12px;
						color: #C9281C;
					}
				}
			}
		}
	}
</style>
