<template>
	<div id="app">
		<!-- 导航栏 -->
		<NavBar></NavBar>
		<!-- 搜索框 -->
		<Searcher></Searcher>
		<!-- 核心内容 -->
		<router-view></router-view>
		<!-- 页脚 -->
  		<Footer></Footer>
  	</div>
</template>

<script>
	import NavBar from './components/NavBar.vue'
	import Footer from './components/Footer.vue'
	import Searcher from './components/Searcher.vue'
	export default {
		components:{
			NavBar,
			Footer,
			Searcher
		}
	}
</script>

<style>
	/*头和尾样式*/
	/*  页面整体样式  */
	body,div,img{margin: 0px; border: 0px; padding: 0px;}
	body{text-align: center;}
	.containner{width: 1200px; margin: 0 auto;}
	.flex{display: flex; flex-direction: row;}
	.flex-column{display: flex; flex-direction: column;}
	.justify-center{justify-content: center;}
	.justify-end{justify-content: flex-end;}
	.justify-between{justify-content: space-between;}
	.justify-around{justify-content: space-around;}
	.item-start{align-items: flex-start;}
	.item-end{align-items: flex-end;}
	.item-center{align-items: center; }
	.wrap{flex-wrap: wrap;}
	.hand{cursor: pointer;}
	.rounded{border-radius:6px;}
	.box-shadow{box-shadow:0px 0px 10px #ccc;}
	.text-xs{font-size:10px;}
	.text-sm{font-size:12px;}
	.text-md{font-size:14px;}
	.text-lg{font-size:16px;}
	.text-xl{font-size:18px;}
	.text-left{text-align:left;}
	.text-right{text-align:right;}
	.bold{font-weight:600;}
	.weight{font-weight:900;}
	.router-link{text-decoration:none;}
	.mt-40{margin-top:40px;}
	.mt-30{margin-top:30px;}
	.mt-20{margin-top:20px;}
	.mt-10{margin-top:10px;}
	.mt-5{margin-top:5;}
	.ml-20{margin-left:20px;}
	.ml-10{margin-left:10px;}
	.ml-5{margin-left:5px;}
	.mx-5{margin-left:5px; margin-right:5px;}
	.mx-10{margin-left:10px; margin-right:10px;}
	.mx-20{margin-left:20px; margin-right:20px;}
	.my-5{margin-top:5px; margin-bottom:5px;}
	.my-10{margin-top:10px; margin-bottom:10px;}
	.my-20{margin-top:20px; margin-bottom:20px;}
	.px-5{padding-left:5px; padding-right:5px;}
	.px-10{padding-left:10px; padding-right:10px;}
	.px-20{padding-left:20px; padding-right:20px;}
	.pl-5{padding-left:5px; }
	.pl-10{padding-left:10px; }
	.pl-20{padding-left:20px; }
	.pr-5{padding-right:5px; }
	.pr-10{padding-right:10px; }
	.pr-20{padding-right:20px; }
	.py-5{padding-top:5px; padding-bottom:5px;}
	.py-10{padding-top:10px; padding-bottom:10px;}
	.py-20{padding-top:20px; padding-bottom:20px;}
	.red{color:#e1251b;}
	.gray{color:#999;}
	.white{color:#fff;}
	.black{color:#000;}
	.bg-white{background-color:#fff;}
	.bg-red{background-color:#e1251b;}
	.bg-gray{background-color:#f4f4f4;}
	.dark{color:#666;}
	.hover-red:hover{color:#e1251b;}
	.hover-bg-gray:hover{background-color:#ddd;}
	/* ************************************ */
</style>
