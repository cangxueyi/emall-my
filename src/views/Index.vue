<template>
	<div class=" mt-10 py-10">
		<div id="home">
			<div class="containner flex item-start justify-between">
				<div class="category-bar py-10 bg-white text-sm dark box-shadow">
					<div class="category" v-for="(yi,i1) in WebSite.all_cate_list" :key="yi.cate_id" 
						@mouseover="qie_cate(i1)" @mouseout="qie_cate(-1)">
						<div class="category-1 hover-bg-gray hover-red px-20 py-5 hand">{{yi.cate_name}}</div>
						<div class="category-group box-shadow px-10 py-10" :class="curr_index==i1?'active':''">
							<div class="my-10 flex item-start" v-for="(er,i2) in yi.children" :key="er.cate_id">
								<div class="category-2 black hand hover-red flex justify-end">
									<div class="bold">{{er.cate_name}}</div>
									<div class="ml-10 weight">&gt;</div>
								</div>
								<div class="flex item-center wrap category_small_group">
									<div class="category-3 dark hand hover-red ml-10" v-for="(san,i3) in er.children"
									 @click="gospulist(san.cate_id)">{{san.cate_name}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 轮播图 -->
				<div class="carousel-bar hand" @mouseover="ting" @mouseout="jixu">
					<div class="carousel-imgs">
						<img :src="carousel_img_arr[carousel_img_curr_index]" 
							class="carousel-img" style="width: 790px; height: 490px;">
					</div>
					<div class="carousel-controls flex item-center">
						<template v-for="(v,i) in carousel_img_arr" :key="i">
							<div class="carousel-control mx-5" :class="carousel_img_curr_index==i?'active':''"
								@click="dianqie(i)"></div>
						</template>
					</div>
				</div>
				<div class="recommend-bar flex-column justify-between item-center">
					<img src="../assets/img/carousel-right01.jpg" style="width: 190px;">
					<img src="../assets/img/carousel-right02.jpg" style="width: 190px;">
					<img src="../assets/img/carousel-right03.jpg" style="width: 190px;">
				</div>
			</div>
			<div class="containner mt-20" v-for="(c,i) in WebSite.tuijian_spu_list" :key="i">
				<div class="recommend-category px-20 py-10 my-10 gray text-xl bold">{{c.cate_name}}专场</div>
				<div class="flex wrap item-start">
					<template v-for="(spu,si) in c.spulist" :key="si">
						<spu :spu="spu" @click="godetail(spu.spu_id)"></spu>
					</template>
				</div>
			</div>>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations,mapActions} from 'vuex'
	import Spu from '../components/Spu.vue'
	export default {
		components:{Spu},
		// 重写一遍
		data: function() {
			return {
				//默认当期选中分类的id是0的
				curr_index: -1,
				//vuecli 如果从data中获取数据，src图片的路径，需要加上require，不然图片是识别不了的
				//carousel_img_arr用于保存轮播图的n张图片
				carousel_img_arr: [
					require('../assets/img/carousel01.jpg'),
					require('../assets/img/carousel02.jpg'),
					require('../assets/img/carousel03.jpg'),
					require('../assets/img/carousel04.jpg'),
					require('../assets/img/carousel05.jpg')
				],
				//carousel_img_curr_index代表的是当期切换的图片的下标
				carousel_img_curr_index: 0,
				//定义一个炸弹
				zhandan: null,
				//通过四个分类，去获取每个分类下的spu列表
				tuijian_cate_list: [
					{
						cate_id: 26,
						cate_name: '4K超清电视',
					},
					{
						cate_id: 34,
						cate_name: '变频空调'
					},
					{
						cate_id: 130,
						cate_name: '手机'
					},
					{
						cate_id: 219,
						cate_name: '笔记本'
					}
				]
			}
		},
		computed: {
			//将WebSite模块映射到当期组件
			...mapState(['WebSite'])
		},
		methods: {
			// 跳转详情页
			godetail(spu_id){
				this.$router.push("/spudetail/"+spu_id)
			},
			// 进入商品列表页
			gospulist(cate_id){
				this.$router.push("/spulist/"+cate_id)
			},
			//映射模块中的actions方法到当期methods中来
			...mapActions({
				get_all_cate_list: 'WebSite/get_all_cate_list',
				get_tuijian_spu_list: 'WebSite/get_tuijian_spu_list'
			}),
			//鼠标放到哪个一级分类上，就得到这个分类的id
			qie_cate: function(index) {
				// console.log(cate_id)
				this.curr_index = index
			},
			//切下标
			qie_carousel_index() {
				//炸弹 就是定时器
				this.zhandan = setInterval(() => {
					//每隔两秒钟切一次
					this.carousel_img_curr_index++;
					//下标切到5的时候，5其实就还是0
					if (this.carousel_img_curr_index == 5) {
						this.carousel_img_curr_index = 0;
					}
				}, 2000)
			},
			//鼠标放到轮播图，希望录播图停止
			ting: function() {
				clearInterval(this.zhandan)
			},
			//鼠标离开的时候，继续进行轮播图
			jixu: function() {
				this.qie_carousel_index()
			},
			//我点谁，就将这个谁的下标拿到
			dianqie: function(i) {
				//当期选中的下标换成你点的下标
				this.carousel_img_curr_index = i
			}
		},
		created() {
			//调用actions中的获取所有分类的列表
			this.get_all_cate_list()
			//传入当期要获取的推荐的分类类型，调用获取所有spu列表的actions
			this.get_tuijian_spu_list(this.tuijian_cate_list)
		},
		mounted() {
			//数据挂载完毕以后，执行定时任务
			this.qie_carousel_index()
		}
	}
</script>

<style scoped="scoped">
	/*  商品分类栏  */
	.category-bar {
	  width: 200px;
	  height: 470px;
	  text-align: left;
	  border-radius: 6px 0px 0px 6px;
	  position: relative;
	}
	.category-group {
	  position: absolute;
	  left: 200px;
	  top: 0px;
	  z-index: 99;
	  width: 780px;
	  height: 470px;
	  background-color: #fff;
	  border-radius: 0px 6px 6px 0px;
	  display: none;
	}
	.category-group.active {
	  display: block;
	}
	.category-2 {
	  width: 80px;
	  text-align: right;
	}
	.category_small_group {
	  width: 760px;
	}
	
	/*  轮播栏  */
	.carousel-bar {
	  width: 790px;
	  height: 490px;
	  position: relative;
	}
	.carousel-imgs {
	  width: 790px;
	  height: 490px;
	  position: absolute;
	  left: 0px;
	  top: 0px;
	  z-index: 1;
	}
	.carousel-controls {
	  position: absolute;
	  right: 20px;
	  bottom: 20px;
	  z-index: 2;
	}
	.carousel-control {
	  width: 14px;
	  height: 14px;
	  background-color: rgba(255, 255, 255, 0.5);
	  border-radius: 7px;
	}
	.carousel-control.active,
	.carousel-control:hover {
	  background-color: #fff;
	}
	
	/*  推荐栏  */
	.recommend-bar {
	  width: 190px;
	  height: 490px;
	}
	
	/*  推荐分类  */
	.recommend-category {
	  width: 140px;
	  border-radius: 6px 24px 24px 6px;
	  box-shadow: 0px 0px 5px #ccc;
	}
	
</style>
