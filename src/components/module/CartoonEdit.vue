<template>
	<div>
		<el-row>
			<el-col :span="8">
				<div>
					<el-row>
						<p class="kindLabel">漫画列表</p>
						<el-button type="primary" @click="dialogVisible = true" plain>添加漫画</el-button>
					</el-row>
				</div>
				<div class="cartoon">
					<ul>
						<li v-for="cartoon in cartoonList">
							<div class="item clearfix" :class="{active: cartoon.id==cartoonActive}" @click="hadnleCartoonListClick(cartoon.id,$event)">
								<img :src="cartoon.img" />
								<div class="info">
									<h1>{{cartoon.name}}</h1>
									<h2>{{cartoon.cartoonDesc}}</h2>
									<h3>{{cartoon.flag}}</h3>
									<div style="margin-top: 5px;">
										<el-button type="primary" @click="handleCartoonEdit(cartoon.id,$event)" size="mini" plain>编辑</el-button>
										<el-button type="danger" @click="handleCartoonDelete(cartoon.id,$event)" size="mini" plain>删除</el-button>
									</div>
								</div>
								<div class="clear"></div>
							</div>
						</li>
					</ul>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="chapter">
					<el-row>
						<p class="kindLabel">降灵记</p>
						<el-button type="primary" @click="openChapterDialog" plain>添加章节</el-button>
					</el-row>

					<div class="chapter-list">
						<div class="title">
							<div>
								<i></i>
								<span>章节列表</span>
							</div>
							<div>
								<label>排序：</label>
								<el-button type="" @click="" size="mini" plain>正序</el-button>
								<el-button type="" @click="" size="mini" plain>倒序</el-button>
							</div>
						</div>
						<div class="list" style="font-size: 14px;">
							<ul>
								<li v-for="(chapter,index) in chapterList" @click="handleChapterClick(chapter.id)" :class="{active: chapter.id==chapterActive}"  >
									<div>
										<p>第{{index+1}}话</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="content">
					<el-row>
						<p class="kindLabel">第一话</p>
						<el-button type="primary" @click="handleImgSave" plain>保存更改</el-button>
						<el-button type="primary" @click="previewVisible=!previewVisible" plain>预览图片</el-button>
						
						<div class="imgs" style="margin: 10px 0px;">
							<el-input type="textarea" placeholder="注：多个图片使用,号隔开" :autosize="{ minRows: 20}" v-model="chapterImgs"></el-input>
						</div>
						
						<div class="preview-img" v-if="previewVisible">
							<div v-for="img in imgList">
								<img :src="img" />
							</div>
						</div>
					</el-row>
				</div>

			</el-col>
		</el-row>

		<!-- 动漫表单模态框 -->
		<cartoon-form-dialog ref="cartoonForm" v-model="dialogVisible" @saveCallback="loadCartoonList"></cartoon-form-dialog>
		<!-- 章节表单模态框 @saveCallback="loadChapterList(id)" -->
		<chapter-form-dialog ref="chapterForm" v-model="chapterVisible" @save-callback="loadChapterList" :cartoonId="cartoonActive"></chapter-form-dialog>
	</div>
</template>

<script>
	import CartoonFormDialog from './CartoonFormDialog'
	import ChapterFormDialog from './ChapterFormDialog'
	export default {
		name: 'CartoonEdit',
		data() {
			return {
				dialogVisible: false,
				chapterVisible: false,
				cartoonList: [],
				cartoonActive: '',
				chapterList: [],
				chapterActive: '',
				chapterImgs: '',
				previewVisible: false
			}
		},
		methods: {
			// 加载动漫数据
			loadCartoonList() {
				var _this = this;
				this.$http.get('/cartoon/list').then(
					function(response) {
						var list = response.data;
						_this.cartoonList = list;
					}
				)
			},
			// 删除动漫
			handleCartoonDelete(id) {
				var _this = this;
				this.$http.post('/cartoon/delete', {
					id
				}).then(function(response) {
					_this.loadCartoonList();
				})
			},
			// 编辑动漫
			handleCartoonEdit(id) {
				// 编辑操作由子组件完成
				this.$refs.cartoonForm.handleCartoonEdit(id);
			},
			// 加载列表数据
			loadChapterList(cartoonId) {
				var _this = this;
				this.$http.get('/cartoon/chapter/list?cartoonId=' + cartoonId).then(
					function(response) {
						var list = response.data;
						_this.chapterList = list;
					}
				)
			},
			// 点击列表页
			hadnleCartoonListClick(id) {
				this.cartoonActive = id;
				this.loadChapterList(id);
			},
			// 打开修改章节弹出框
			openChapterDialog() {
				if(this.cartoonActive) {
					this.chapterVisible = true
				} else {
					this.$message.error('请先选择一部漫画，在点击添加章节');
				}
			},
			// 保存图片更改
			handleImgSave(){
				if(this.chapterActive) {
					var chapterId = this.chapterActive;
					var _this = this;
					this.$http.post('/cartoon/chapter/img/insert',{
						chapterId,
						imgs: _this.chapterImgs
					}).then(
						function(response) {
							_this.$message({ message: '保存成功',type: 'success'});							
						}
					)
				} else {
					this.$message.error('请先选择一部漫画，在选择一个章节,在进行操作');
				}
			},
			handleChapterClick(chapterId){
				this.chapterActive = chapterId;
				this.loadImgs(chapterId);
			},
			loadImgs(chapterId){
				var _this = this;
				var chapterId = this.chapterActive;
				this.$http.get('/cartoon/chapter/img/list?chapterId=' + chapterId).then(
					function(response) {
						var list = response.data;
						var imgs = list.reduce(function(total, currentValue, currentIndex, arr){
							var str = total + currentValue.imgUrl;
							if(currentIndex+1 < arr.length){
								str += ",\n";
							}
							return str;
						},'')
						
						_this.chapterImgs= imgs;
					}
				)
			}
		},
		mounted() {
			this.loadCartoonList();
		},
		components: {
			CartoonFormDialog,
			ChapterFormDialog
		},
		computed: {
			imgList(){
				var list = this.chapterImgs.split(',').filter(function(currentValue){
					return currentValue.trim() != '';
				})
				alert(list);
				return list;				
			}
		}
	}
</script>

<style>
	p.kindLabel {
		border-left: solid 8px dodgerblue;
		padding-left: 10px;
		font-size: 22px;
		margin: 10px 0px;
	}
	
	.clearfix::after {
		content: '';
		display: none;
		clear: both;
	}
	
	.cartoon {
		background: white;
		margin: 5px 0px;
	}
	
	.cartoon ul li {
		padding: 3px 0px;
	}
	
	.item {
		width: 300px;
		cursor: pointer;
		border: solid 1px #DCDFE6;
		padding: 6px 12px;
	}
	
	.item:hover {
		box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
	}
	
	.item:active {
		/*border: solid 2px red;*/
	}
	
	.item .active {
		border: solid 1px red;
	}
	
	.active {
		border: solid 1px red;
	}
	
	.item>img {
		width: 100px;
		height: 120px;
		display: block;
		float: left;
	}
	
	.info {
		float: left;
		margin-left: 15px;
		line-height: 25px;
	}
	
	.info>h1 {
		font-size: 22px;
		font-weight: bold;
	}
	
	.info>h2 {
		color: #606266;
	}
	
	.info>h3 {
		color: #606266;
	}
	
	.chapter {
		/*border: solid 1px lightgray;*/
	}
	
	.chapter {
		padding: 8px;
	}
	
	.chapter-list {
		width: 350px;
		margin: 10px 0px;
	}
	
	.chapter-list .title:after {
		content: '';
		display: block;
		clear: both;
	}
	
	.chapter-list .title {
		padding: 10px 5px;
		background: #F5F5F5;
		border: solid 1px lightgray;
	}
	
	.chapter-list .title>div:first-child {
		font-size: 14px;
		float: left;
	}
	
	.chapter-list .title>div:first-child>span {
		font-size: 14px;
		display: block;
		height: 28px;
		line-height: 28px;
	}
	
	.chapter-list .title>div:last-child {
		font-size: 12px;
		color: gray;
		float: right;
	}
	
	.chapter-list .list ul li {
		padding: 10px 5px;
		border: solid 1px lightgray;
		border-top: 0px;
		cursor: pointer;
	}
	
	.chapter-list .list ul li:hover {
		box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
	}
	
	.chapter-list .list ul li:active {
		border: solid 1px red;
	}
	
	.chapter-list .list ul li.active {
		color: red;
	}
	
	.preview-img{
		width: 400px;
		padding: 5px;
	}
	
	.preview-img img{
		display: block;
		width: 100%;
	}
	
</style>