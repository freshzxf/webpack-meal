<template>
  <v-container>
    <!--导航-->
    <v-toolbar color="blue" dark fixed scroll-off-screen>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">营养餐系统</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

      <!--菜单组-->
      <v-layout grid-list-sm row wrap style="margin-top: 56px" >
        <v-flex class="mb-3" xs3>
          <v-btn class="mb-2" color="error" fab depressed>
            <v-icon>alarm</v-icon>
          </v-btn>
          <div>菜单文字</div>
        </v-flex>
        <v-flex xs3>
          <v-btn class="mb-2" color="green" fab depressed>
            <v-icon color="white">list_alt</v-icon>
          </v-btn>
          <div>菜单文字</div>
        </v-flex>
        <v-flex xs3>
          <v-btn class="mb-2" color="blue" fab depressed>
            <v-icon color="white">how_to_reg</v-icon>
          </v-btn>
          <div>菜单文字</div>
        </v-flex>
        <v-flex xs3>
          <v-btn class="mb-2" color="orange" fab depressed>
            <v-icon color="white">dvr</v-icon>
          </v-btn>
          <div>菜单文字</div>
        </v-flex>
        <v-flex xs3>
          <v-btn class="mb-2" color="amber" fab depressed>
            <v-icon color="white">data_usage</v-icon>
          </v-btn>
          <div>菜单文字</div>
        </v-flex>
        <v-flex xs3>
          <v-btn class="mb-2" color="cyan" fab depressed>
            <v-icon color="white">wifi_tethering</v-icon>
          </v-btn>
          <div>菜单文字</div>
        </v-flex>
        <v-flex xs3>
          <v-btn class="mb-2" color="teal" fab depressed>
            <v-icon color="white">wifi_tethering</v-icon>
          </v-btn>
          <div>菜单文字</div>
        </v-flex>
        <v-flex xs3>
          <v-btn class="mb-2" color="indigo" fab depressed>
            <v-icon color="white">wifi_tethering</v-icon>
          </v-btn>
          <div>菜单文字</div>
        </v-flex>
      </v-layout>

    <router-link :to="{path:'/test/test'}">测试路由组件</router-link>

    <!--底部bar-->
    <v-bottom-nav
      :active.sync="activeBtn"
      :value="showNav"
      fixed
      color="white"
    >
      <v-btn v-for="(item, index) in bottomBarDatas" flat :color="item.color" :to="item.link" :key="index">
        <span>{{item.text}}</span>
        <v-icon>{{item.icon}}</v-icon>
      </v-btn>

    </v-bottom-nav>
  </v-container>
</template>
<script>
  import {BottomBarDatas} from '@/assets/data'
  /* eslint-disable */
  export default {
    name: 'index',
    data() {
      return {
        showNav: true,
        activeBtn: 0,
        bottomBarDatas: BottomBarDatas
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
