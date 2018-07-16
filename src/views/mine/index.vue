<template>
  <div>
    <!--导航-->
    <v-toolbar color="purple lighten-2" dark fixed scroll-off-screen>
      <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
      <v-btn icon @click="$router.go(-1)">
        <v-icon large>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">个人中心</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card class="elevation-0" tile style="height: 100%;">
      <v-card-media
        src="/static/img/bg1.jpg"
        height=""
      >
        <v-avatar
          :tile="false"
          :size="avatarSize"
          color="grey lighten-4"
        >
          <img src="http://img1.imgtn.bdimg.com/it/u=1647694873,753024156&fm=27&gp=0.jpg" alt="avatar">
        </v-avatar>

      </v-card-media>
    </v-card>

      <div style="margin-top: 56px">

<!--
      <v-list>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>phone</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>(650) 555-1234</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>

            <v-icon>chat</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>phone</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>(323) 555-6789</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon>chat</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>mail</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>mcbeal@example.com</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider inset></v-divider>

        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>location_on</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Orlando, FL 79938</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
-->
    </div>
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
  /* eslint-disable */
  import {BottomBarDatas} from '@/assets/data'
  export default {
    name: 'mine',
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
