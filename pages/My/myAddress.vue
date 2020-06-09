<template>
	<view>
		<view class="address" v-for="(item,index) in addressList " :key="index" v-if="!isEmpty">
			<view class="address-content" @click="chooseAddress(item)">
				<view>
					<view>{{item.userName}}</view>
					<view>{{item.phonenumber}}</view>
					<view v-if="item.isdefault == 1">默认</view>
				</view>
				<view>
					{{item.province}}{{item.detail}}
				</view>
			</view>
			<view class="edit-button" @click="handleEditAddress(item.id,item)">编辑</view>
		</view>
		<!-- 加载 -->
		<uni-load-more bgColor="#f5f5f8" :status="hasFlag ? 'loading' : 'noMore'"  v-if="!isEmpty"></uni-load-more>
		<u-empty mode="address" :show="isEmpty"></u-empty>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'	
	export default {
		data() {
			return {
				addressList:[],
				hasFlag:true,
				page:0,
				flag:0,//为1是代表从结算页面进入
				isEmpty:false
			};
		},
		methods:{
			handleEditAddress(id,item){
				uni.navigateTo({
					url:'editAddress?id='+id
				})
			},
			// 获取收货地址列表
			async getAddressList(){
				if(!this.hasFlag) return //没有更多了
				this.page = ++this.page;
				let res = await this.$fetch(this.$api.getAddressList,{pageNum:this.page,pageSize:10},'GET')
				console.log(res);
				this.addressList = [...this.addressList,...res.rows]
				this.hasFlag  = 10*this.page < res.total
			},
			chooseAddress(item){
				if(this.flag == 1){
					uni.setStorageSync('chooseAddress',item)
					uni.navigateBack({
						delta:1
					})
				}
			}
		},
		components:{
			uniLoadMore
		},
		onLoad(options) {
			if(options.flag){
				this.flag = options.flag
			}
		},
		onShow() {
			this.addressList = []
			this.hasFlag = true
			this.getAddressList()
			// this.hasFlag = false
		},
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url:'editAddress'
			})
		},
		onReachBottom() {
			this.getAddressList()
		}
	}
</script>

<style lang="less">
	page{
		background: #f5f5f8;
	}
	.address{
		width: 720rpx;
		padding: 30rpx 0 30rpx 30rpx ;
		height: 104rpx;
		margin-top: 30rpx;
		display: flex;
		background: #FFFFFF;
		.address-content{
			width: 602rpx;
			height: 104rpx;
			display: flex;
			flex-direction: column;
			border-right: 1px solid #F5F5F5;
			& > view:first-child{
				flex: 1;
				display: flex;
				align-items: center;
				& > view:first-child{
					font-size: 16px;
					color: #2B2925;
					font-weight: bold;
				}
				& > view:nth-child(2){
					margin: 0 30rpx;
					font-size: 14px;
					color: #939393;
				}
				& > view:nth-child(3){
					width: 70rpx;
					height: 34rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 11px;
					color: #C9281C;
					background: rgba(201,40,28,0.20);
					border-radius: 2px;
				}
			}
			& > view:last-child{
				width: 602rpx;
				font-size: 14px;
				color: #2B2925;
				font-weight: bold;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		.edit-button{
			width: 116rpx;
			height: 104rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: #939393;
		}
	}
</style>
