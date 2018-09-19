<template>
	<!-- 添加漫画弹出框 -->
	<div class="cartoon-add-dialog">
		<el-dialog title="添加漫画" :visible.sync="dialogVisible" :close-on-click-modal="false" width="480px" @closed="handleClose">
			<div class="cartoon-add">
				<div class="master_img">
					<img :src="cartoonForm.img" />
				</div>
				<div class="cartoon-form">
					<el-form label-position="right" label-width="80px" :model="cartoonForm">
						<input type="hidden" v-model="cartoonForm.id" />
						<el-form-item label="主图地址">
							<el-input v-model="cartoonForm.img"></el-input>
						</el-form-item>
						<el-form-item label="漫画名称">
							<el-input v-model="cartoonForm.name"></el-input>
						</el-form-item>
						<el-form-item label="漫画描述">
							<el-input v-model="cartoonForm.cartoonDesc"></el-input>
						</el-form-item>
						<el-form-item label="漫画标签">
							<el-input v-model="cartoonForm.flag"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div class="cartoon-form-button">
					<p></p>
					<div>
						<el-button type="primary" @click="cartoonFormSubmit">立即创建</el-button>
						<el-button @click="dialogVisible = false">取消</el-button>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	function Cartoon() {
		var id;
		var name;
		var cartoonDesc;
		var flag;
		var img;
	}

	export default {
		name: 'CartoonFormDialog',
		props: {
			value: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				dialogVisible: this.value,
				cartoonForm: new Cartoon()
			}
		},
		methods: {
			handleClose() {
				this.cartoonForm = new Cartoon();
			},
			// 添加漫画表单提交
			cartoonFormSubmit() {
				var _this = this;
				this.$http.post('/cartoon/insert', _this.cartoonForm, {}).then(function(response) {
					// 提交成功后的回调
					_this.$emit('saveCallback');
					_this.cartoonForm = new Cartoon();
					_this.dialogVisible = false
				})
			},
			// 编辑动漫
			handleCartoonEdit(id) {
				var _this = this;
				this.$http.post('/cartoon/getById', {
					id
				}).then(function(response) {
					_this.cartoonForm = response.data;
					_this.dialogVisible = true;
				})
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
	.cartoon-add-dialog .el-dialog__body {
		padding: 15px 15px;
	}
	
	.cartoon-add-dialog .el-dialog__header {
		border-bottom: solid 1px lightgray;
	}
	
	.cartoon-add-dialog .el-dialog {
		border-radius: 3px;
	}
	
	.cartoon-add {
		box-sizing: border-box;
		width: 450px;
		padding: 5px;
		/*background: pink;*/
	}
	
	.cartoon-add div {
		box-sizing: border-box;
	}
	
	.cartoon-add .master_img {
		float: left;
		width: 135px;
		height: 180px;
		/*border: solid 1px;*/
	}
	
	.cartoon-add .master_img>img {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.cartoon-form {
		width: 300px;
		float: left;
		/*background: purple;*/
		display: block;
	}
	
	.cartoon-form-button {
		clear: both;
	}
	
	.cartoon-form-button>div {
		clear: both;
		width: 170px;
		/*background: red;*/
		margin: 0 auto;
	}
	
	.cartoon-form-button>p {
		margin: 15px 0px;
		display: block;
		width: 100%;
		height: 1px;
		border-top: solid 1px lightgray;
	}
</style>