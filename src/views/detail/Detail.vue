<template>
  <div id="detail">
      <detail-navbar class="detail-nav"></detail-navbar>
      <scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <!-- <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info> -->
        <detail-goods-info :images="images" :desc="desc" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo"></detail-param-info>
      </scroll> 
  </div>
</template>

<script>
import DetailNavbar from './childComps/DetailNavbar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import Scroll from '@/components/common/scroll/Scroll'

import { getDetail,Goods,Shop,GoodsParam } from '@/network/detail'

export default {
  name: 'Detail',
  data() {
      return {
          id: null,
          topImages: [],
          goods: {},
          shop: {},
          detailInfo: {},
          paramInfo: {},
          images: [],
          desc: ''
      }
  },
  created() {
      this.id = this.$route.params.id

      getDetail(this.id).then(res => {
          console.log(222)
          console.log(res)
          const data = res.result 
          this.topImages = data.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // 保存商品的详情数据
        this.datailInfo = data.detailInfo
        this.images = data.detailInfo.detailImage[0].list
        this.desc = data.detailInfo.desc
        // 获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      })
  },
  components: {
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll
    
  },
  methods: {
      imageLoad: function() {
          this.$refs.scroll.refresh()
      }
  }
}

</script>
<style scoped>
    #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>