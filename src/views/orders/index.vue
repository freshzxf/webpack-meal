<template>
  <div>
    <!--导航-->
    <v-toolbar color="purple lighten-2" dark fixed scroll-off-screen>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">食材订购单</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

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
  </div>
</template>
<script>
  import {BottomBarDatas} from '@/assets/data'
  /* eslint-disable */
  export default {
    name: 'orders',
    data() {
      return {
        avatarSize: 60,
        activeBtn: 1,
        showNav: true,
        bottomBarDatas: BottomBarDatas
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
