<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">蘑菇街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recom-view :recommends="recommends"></recom-view>
    <feature-view></feature-view>
    <tab-control class="tab-control"  
                :titles="['流行','新款','精选']" 
                @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </div>
</template>

<script>
//导入页面组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecomView from "./childComps/RecomView";
import FeatureView from "./childComps/FeatureView";
//导入公共组件
import NavBar from "@/components/common/navbar/NavBar";
import tabControl from "@/components/content/tabcontrol/tabControl";
import GoodsList from '@/components/content/goods/GoodsList'
//导入函数
import { getHomeMultidata,getHomeGoods } from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecomView,
    FeatureView,
    tabControl,
    GoodsList
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
      },
      currentType: 'pop'
    };
  },
  computed: {
      showGoods() {
          return this.goods[this.currentType].list
      }
  },
  created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
  },
  methods: {
      //事件监听相关方法
      tabClick(index) {
          switch (index) {
            case 0:
                  this.currentType = 'pop'
                  break
            case 1:
                this.currentType = 'new'
                break
            case 2:
                this.currentType = 'sell'
                break
          }
      },
      //网络请求相关方法
      getHomeMultidata() {
          getHomeMultidata().then((res) => {
            //console.log(res);
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
      },
      getHomeGoods(type) {
          const page = this.goods[type].page + 1
          getHomeGoods(type, page).then(res => {
            //console.log(type)
              console.log(res)
              this.goods[type].list.push(...res.data.list)
              this.goods[type].page += 1

          })
      }
  }
};
</script>

<style scoped>
.home {
  padding-top: 44px;
  position: relative;
}

.home-nav {
  background-color: rgb(241, 13, 13);
  color: white;

  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}

.tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
}
</style>