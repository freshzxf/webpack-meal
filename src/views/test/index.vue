<template>
  <v-container>
    <!--导航-->
    <v-toolbar color="purple lighten-2" dark fixed scroll-off-screen>
      <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
      <v-btn icon @click="$router.go(-1)">
        <v-icon large>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">测试路由组件</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

    <v-avatar
      :tile="false"
      :size="avatarSize"
      color="grey lighten-4"
    >
      <img src="http://img1.imgtn.bdimg.com/it/u=1647694873,753024156&fm=27&gp=0.jpg" alt="avatar">
    </v-avatar>

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
    name: 'test',
    data() {
      return {
        avatarSize: 100,
        showNav: true,
        activeBtn: 3,
        bottomBarDatas: BottomBarDatas
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
