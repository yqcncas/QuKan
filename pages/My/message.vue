<template>
	<view>
		<view class="line-30"></view>
		<!-- 消息列表 -->
		<view class="msgList" v-if="!isEmpty">
			<view class="msg-detail" v-for="(item,index) in msgList " :key="index" @click="handleOpenDetail(item.id)">
				<view class="msg-top">
					<view>{{item.title}}</view>
					<view>{{item.createTime}}</view>
				</view>
				<view class="msg-bottom">
					<text>{{item.content}}</text>
				</view>
			</view>
		</view>
		<!-- 加载 -->
		<!-- <uni-load-more bgColor="#f7f7fa" :status="hasFlag ? 'loading' : 'noMore'"  v-if="!isEmpty"></uni-load-more> -->
		<u-empty :show="isEmpty" mode="message"></u-empty>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'	
	export default {
		data() {
			return {
				hasFlag:true,
				page:0,
				msgType:'',
				msgList:[],
				firstLoad:true,//第一次加载 或下拉刷新时为true
				isEmpty:false
			};
		},
		components:{
			uniLoadMore
		},
		methods:{
			// 获取消息列表
			async getMsgList(){
				// if(!this.hasFlag) return //没有更多了
				// this.page = ++ this.page
				// this.$fetch(this.$api.getMessage,{msgType:this.msgType,pageNum:this.page,pageSize:10},'POST','form').then(res =>{
				// 	res.rows.forEach(item =>{
				// 		item.createTime = this.$dayjs(item.createTime).format('YYYY-MM-DD')
				// 		item.text = this.filterHTMLTag(item.content)
				// 	})
				// 	this.msgList = [...this.msgList,...res.rows]
				// 	this.hasFlag  = 10*this.page < res.total
				// 	if(this.firstLoad){
				// 		this.firstLoad = false
				// 		this.bindMsg()
				// 	}
				// })
				
				let res = await this.$fetch(this.$api.getMessage, {}, 'GET', 'FORM')
				console.log(res)
					res.data.forEach(item =>{
						item.content = this.filterHTMLTag(item.content)
					})
				this.msgList = res.data
				if (this.msgList.length == 0) {
					this.isEmpty = true
				}
				
			},
			// 获取富文本中的文字
			filterHTMLTag (msg) {
				var msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
				msg = msg.replace(/[|]*\n/, '') //去除行尾空格
				msg = msg.replace(/&nbsp;/ig, ''); //去掉npsp
				return msg;
			},
			handleOpenDetail (id) {
				uni.navigateTo({
					url: '../article/article?id=' + id
				})
			}
			// 查看详情
			// handleOpenDetail(content,title){
			// 	uni.setStorageSync('msgContent',content)
			// 	uni.navigateTo({
			// 		url:'messageDetail?title='+title
			// 	})
			// }
		},
		onLoad() {
			// this.getMsgList()
			// setTimeout(()=>{
			// 	this.isEmpty = true
			// },2000)
			this.getMsgList()
			
		},
		// onReachBottom() {
		// 	if(this.hasFlag){
		// 		this.getMsgList()
		// 	}
		// },
		// onPullDownRefresh() {
		// 	this.page = 0 
		// 	this.hasFlag = true
		// 	this.firstLoad = true
		// 	this.msgList = []
		// 	uni.stopPullDownRefresh()
		// 	this.getMsgList()
		// }
	}
</script>

<style lang="less">
	page{
		background: #F7F7FA;
	}
	.msgList{
		width: 100%;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		.msg-detail{
			width: 720rpx;
			margin-left: 30rpx;
			border-bottom: 1px solid #F7F7FA;
			.msg-top{
				padding-top: 20rpx;
				width: 720rpx;
				display: flex;
				& > view:first-child{
					flex: 1;
					font-size: 14px;
					color: #09023E;
					display: flex;
					align-items: center;
					font-weight: bold;
				}
				& > view:last-child{
					flex: 1;
					font-size: 12px;
					color: rgba(9,2,62,0.30);
					display: flex;
					align-items: center;
					justify-content: flex-end;
					margin-right: 30rpx;
				}
			}
			.msg-bottom{
				width:720rpx;
				display: flex;
				align-items: center;
				padding-bottom: 20rpx;
				margin: 8rpx 30rpx 0 0;
				font-size: 12px;
				color: rgba(9,2,62,0.30);
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				text{
					flex: 1;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>
