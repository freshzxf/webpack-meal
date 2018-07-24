<template>
  <div>
    <!--导航-->
    <v-toolbar color="primary" dark fixed scroll-off-screen>
      <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
      <v-btn icon @click="$router.go(-1)">
        <v-icon large>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">就餐统计</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

  </div>
</template>
<script>
  /* eslint-disable */
  import {BottomBarDatas} from '@/assets/data'
  export default {
    name: 'mine',
    data() {
      return {
        avatarSize: 100,
        showNav: true,
        activeBtn: 3
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
