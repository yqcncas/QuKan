<template>
	<view>
		<view class="member-lv">
			<view>
				<view class="member-lv-1" :class="level == 0 ?'chooseMember':''" @click="changeLv(0)">一级粉丝</view>
				<view class="member-lv-2" :class="level == 1 ?'chooseMember':''" @click="changeLv(1)">二级粉丝</view>
			</view>
		</view>
		<view class="fans-title">
			<view>姓名</view>
			<view>手机号码</view>
			<view>注册时间</view>
		</view>
		<view class="fans-list">
			<view class="fans-item" v-for="(item,index) in teamList" :key="index">
				<view>{{item.userName}}</view>
				<view>{{item.phonenumber}}</view>
				<view>2020-04-22</view>
			</view>
		</view>
		<!-- 加载 -->
		<uni-load-more bgColor="#f5f5f8" :status="hasFlag ? 'loading' : 'noMore'"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				level:0,
				page:0,
				hasFlag:true,
				teamList:[]
			};
		},
		methods:{
			changeLv(id){
				if(id != this.level){
					this.level = id
					this.page = 0
					this.hasFlag = true
					this.teamList = []
					this.getTeamList()
				}
			},
			// 获取团队列表
			async getTeamList(){
				if(!this.hasFlag) return
				this.page = ++this.page;
				let res = await this.$fetch(this.$api.getTeam,{pageNum:this.page,pageSize:10,type:this.level},'GET')
				console.log(res);
				res.rows.forEach(item =>{
					item.createTime = this.$dayjs(item.createTime).format('YYYY-MM-DD')
				})
				this.teamList = [...this.teamList,...res.rows]
				this.hasFlag  = 10*this.page < res.total
			}
		},
		onLoad() {
			this.getTeamList()
		},
		onReachBottom() {
			this.getTeamList()
		}
	}
</script>

<style lang="less">
	page::after{
		display: none;
	}
	page{
		background: #f3f3f3;
	}
	.member-lv{
		width: 100%;
		height: 110rpx;
		background: #FFFFFF;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		& > view{
			width: 560rpx;
			height: 70rpx;
			border-radius: 200rpx;
			background: #F3F3F3;
			display: flex;
			.member-lv-1{
				flex: 1;
				height: 70rpx;
				border-radius: 100px 0 0 100px;
				font-size: 14px;
				color: #888888;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.member-lv-2{
				flex: 1;
				height: 70rpx;
				border-radius: 0 100px 100px 0;
				font-size: 14px;
				color: #888888;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.chooseMember{
				background: #C9281C;
				font-size: 14px;
				color: #FFFFFF;
			}
		}
	}
	.fans-title{
		width: 690rpx;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		height: 80rpx;
		background: #FFFFFF;
		position: fixed;
		top: 110rpx;
		view{
			font-size: 14px;
			color: #888888;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.fans-list{
		width: 100%;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		padding-top: 190rpx;
		.fans-item{
			width: 690rpx;
			margin: 0 30rpx;
			border-bottom: 1px solid #F5F5F5;
			display: flex;
			align-items: center;
			height: 100rpx;
			view{
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 14px;
				color: #333540;
				flex: 1;
				
			}
		}
	}
</style>
