<template>
  <div id="app">
  	<el-container>
	    <el-header>
	    	<layout-header></layout-header>
	    </el-header>
	    <el-main>
	    	<router-view/>
	    </el-main>
	  </el-container>
  </div>
</template>

<script>
import LayoutHeader from './components/layout/header.vue'

export default {
	components: {
		LayoutHeader
	}
  
}
</script>

<style>
body{margin: 0px;padding: 0px;}
#app {
  font-family: 'PingFang SC',Helvetica, sans-serif;
}
.el-aside{
	/*background: pink;*/
}



</style>
