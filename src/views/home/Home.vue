<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">女人街</div>
        </nav-bar>
        <home-swiper :banners="banners"></home-swiper>
        <recom-view :recommends="recommends"></recom-view>
    </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecomView from './childComps/RecomView'

import {getHomeMultidata} from '@/network/home'

export default {
    name: 'Home',
    components: {
        NavBar,
        HomeSwiper,
        RecomView
    },
    data(){
        return {
            banners: [],
            recommends: []
        }
    },
    created() {
        getHomeMultidata().then(res => {
            console.log(res)
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
        })
    }
}
</script>

<style scoped>
    .home-nav {
        background-color: rgb(241, 13, 13);
        color: white;
}
</style>
