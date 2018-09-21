<template>
	<!-- 添加漫画弹出框 -->
	<div class="chapter-add-dialog">
		<el-dialog title="添加章节" :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="handleClose" width="480px">
			<div class="content">
				<el-form label-position="right" label-width="80px" :model="chapter">
					<input type="hidden" v-model="chapter.id" />
					<el-form-item label="章节名称">
						<el-input v-model="chapter.name"></el-input>
					</el-form-item>
					<el-form-item label="更新日期">
						<el-input v-model="chapter.uploadDate"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="foot">
				<p></p>
				<div>
					<el-button type="primary" @click="formSubmit">立即创建</el-button>
					<el-button @click="dialogVisible=false">取消</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	function Chapter() {
		var id,cartoonId,name,uploadDate;
	}
	
	export default {
	name: 'ChapterFormDialog',
		props: {
			value: {
				type: Boolean,
				default: false
			},
			cartoonId:{
			}
		},
		data() {
			return {
				dialogVisible: this.value,
				chapter: new Chapter()
			}
		},
		methods: {
			handleClose() {
				this.chapter = new Chapter();
			},
			formSubmit() {
				var _this = this;
				_this.chapter.cartoonId = _this.cartoonId;
				if(_this.chapter.cartoonId){
					this.$http.post('/cartoon/chapter/insert', _this.chapter).then(function(response) {
						// 提交成功后的回调
						_this.$emit('save-callback',_this.cartoonId);
						_this.chapter = new Chapter();
						_this.dialogVisible = false
					})
				}else{
					throw Error("cartoonId为空");
				}
			},
			handleEdit(id) {
//				var _this = this;
//				this.$http.post('/cartoon/chapter/getById', {
//					id
//				}).then(function(response) {
//					_this.cartoonForm = response.data;
//					_this.dialogVisible = true;
//				})
			}
		},
		watch: {
			value(val) {
				this.dialogVisible = val;
			},
			dialogVisible(val) {
				this.$emit('input', val);
			}
		}
	}
</script>

<style>
	.chapter-add-dialog .foot>div {
		clear: both;
		width: 170px;
		/*background: red;*/
		margin: 0 auto;
	}
	
	.chapter-add-dialog .foot>p {
		margin: 15px 0px;
		display: block;
		width: 100%;
		height: 1px;
		border-top: solid 1px lightgray;
	}
	
</style>