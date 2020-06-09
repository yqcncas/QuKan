<template>
	<!-- 状态栏 -->
	<view class="status" :style="{backgroundColor: bgc}"></view>
</template>

<script>
	export default {
		props:{
			bgc: {
				type: String,
				default: '#fff'
			}
		}
	}
</script>

<style lang="scss">
	.status {
		width: 100%;
		position: fixed;
		z-index: 10;
		background-color: #C9281C;
		top: 0;
		height: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
	}
</style>