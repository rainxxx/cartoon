<template>
	<div id="app" class="container">
		<p class="kind">漫画列表</p>
		<div class="items">
			<div class="cartoon" v-for="item in list">
				<img :src="item.img" />
				<div class="info">
					<h1>{{item.title}}</h1>
					<h2>{{item.desc}}</h2>
					<h3>{{item.type}}</h3>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import '../../css/reset.css'
	
	export default {
		name: 'CartoonList',
		data(){
			return{
				list: [{
					img: 'https://manhua.qpic.cn/vertical/0/21_00_22_6bc3a7582f211f2f441cc67f049c983e_1532103764164.jpg/420',
					title: '降灵记',
					desc: '突然拥有的超能力令少年',
					type: '科幻'
				},
				{
					img: 'https://manhua.qpic.cn/vertical/0/19_16_52_1b7d70f574ed40398cf72a41a76b9ba6_1500454370632.jpg/420',
					title: '秦侠',
					desc: '穿越少年闯影城',
					type: '热血 玄幻'
				},
				{
					img: 'https://manhua.qpic.cn/vertical/0/17_17_16_7560e20bbf58789b1cc1ff7206931c4a.jpg/420',
					title: '虫生',
					desc: '突然拥有的超能力令少年',
					type: '科幻'
				},
				{
					img: 'https://manhua.qpic.cn/vertical/0/17_17_22_5f8e23872959ca039d9d85ea70fab022.jpg/420',
					title: '初恋微甜',
					desc: '突然拥有的超能力令少年',
					type: '科幻'
				},
				{
					img: 'https://manhua.qpic.cn/vertical/0/28_16_03_faaae1cae988093cc9f84233ad33ddb8_1530173003829.jpg/420',
					title: '笑傲江湖',
					desc: '突然拥有的超能力令少年',
					type: '科幻'
				},
				{
					img: 'https://manhua.qpic.cn/vertical/0/26_14_12_31aaf1c934d594693761dd87a89c6208_1498457530197.jpg/420',
					title: '总有妖怪想害朕',
					desc: '突然拥有的超能力令少年',
					type: '科幻'
				}
			]
			}
		}
	}
</script>

<style scoped="scoped">
	.container {
		width: 1200px;
		margin: 10px auto;
	}
	
	.items>div {
		float: left;
		margin-right: 20px;
	}
	
	.items:after {
		content: '';
		display: block;
	}
	
	.cartoon {
		width: 165px;
		min-height: 220px;
		border: solid 1px #dedbdb;
		cursor: pointer;
		padding: 2px;
	}
	
	.cartoon>img {
		width: 100%;
		height: 100%;
	}
	
	.info>h1 {
		color: #333;
		font-size: 14px;
		margin: 2px 0;
	}
	
	.info>h2,
	.info>h3 {
		color: #999;
		font-size: 12px;
		margin: 2px 0;
	}
	
	.kind {
		padding-left: 10px;
		border-left: 10px solid deepskyblue;
		font-size: 16px;
		margin: 10px 0px;
	}
</style>