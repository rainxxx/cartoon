<template>
	<el-menu default-active="/cartoonEdit" :router="true" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
		<el-menu-item index="/cartoonList">漫画列表</el-menu-item>
		<el-menu-item index="/cartoonEdit">添加漫画</el-menu-item>
		<el-menu-item index="3">消息中心</el-menu-item>
		<el-menu-item index="4">订单管理</el-menu-item>
	</el-menu>

</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>

</style>