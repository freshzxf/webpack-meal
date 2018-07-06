<template>
  <div>
    <!--导航-->
    <v-toolbar color="blue" dark fixed scroll-off-screen scroll-target="#scrolling">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">工作电话本</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

    <!--list-->
    <v-list id="scrolling" style="margin: 56px 0" two-line>
      <template v-for="(item, index) in phoneDatas">
        <v-subheader
          v-if="item.header"
          :key="item.header"
        >
          {{ item.header }}
        </v-subheader>

        <v-divider
          class="grey lighten-3"
          v-else-if="item.divider"
          :inset="item.inset"
          :key="index"
        ></v-divider>

        <v-list-tile
          v-else
          :key="item.title"
          avatar
        >
          <v-list-tile-avatar>
            <img :src="item.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
            <v-list-tile-sub-title><span class="text--primary">{{item.phone}}</span> &mdash;{{item.subtitle}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>

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
  import {BottomBarDatas, PhoneDatas} from '@/assets/data'

  /* eslint-disable */
  export default {
    name: 'phones',
    data() {
      return {
        avatarSize: 60,
        activeBtn: 2,
        showNav: true,
        bottomBarDatas: BottomBarDatas,
        phoneDatas: PhoneDatas
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
