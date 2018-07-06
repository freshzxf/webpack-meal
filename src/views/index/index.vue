<template>
  <!--<v-container>
    &lt;!&ndash;导航&ndash;&gt;
    &lt;!&ndash;<v-toolbar color="blue" dark fixed scroll-off-screen>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white&#45;&#45;text">营养餐系统</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>&ndash;&gt;

    &lt;!&ndash;菜单组&ndash;&gt;
    &lt;!&ndash;<v-layout grid-list-sm row wrap style="margin-top: 56px">
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
    </v-layout>&ndash;&gt;

    &lt;!&ndash;底部bar&ndash;&gt;
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
  </v-container>-->

  <v-card class="elevation-0 grey lighten-3" style="height: 100%;">
    <v-card-media
      src="/static/img/bg.jpg"
      height="250px"
    >

      <div class="text-xs-left mt-4 ml-2">
        <!--<v-badge
          v-model="show"
          color="purple"
        >
          <span slot="badge">6</span>
        </v-badge>-->

        <v-btn icon color="white" fixed style="right: 15px;top: 25px">
          <v-icon color="purple lighten-4">notifications</v-icon>
        </v-btn>

        <div class="">
          <v-chip class="tran">
            <v-avatar>
              <img src="https://randomuser.me/api/portraits/men/35.jpg" alt="trevor">
            </v-avatar>
            会飞的猪
          </v-chip>
        </div>

        <div class="mt-1">
          <v-chip class="tran">
            <v-avatar color="white">
              <v-icon color="purple lighten-4">person</v-icon>
            </v-avatar>
            采购管理员
          </v-chip>
        </div>

        <div class="mt-1">
          <v-chip class="tran">
            <v-avatar color="white">
              <v-icon color="purple lighten-4">location_on</v-icon>
            </v-avatar>
            安顺市康源农副产品贸易有限责任公司
          </v-chip>
        </div>

      </div>

      <!--水纹-->
      <div class="water">
        <div class="water-c">
          <div class="water-1"></div>
          <div class="water-2"></div>
        </div>
      </div>

    </v-card-media>

    <!--style="margin-top: -60px;z-index: 1;position: relative"-->
    <v-container grid-list-md fluid>
      <v-layout row wrap>
        <v-flex v-for="(item, index) in indexMenuDatas" :key="index" xs4>
          <v-card class="elevation-0 pt-2 pb-2">
            <v-btn class="mb-2" :color="item.color" fab depressed>
              <v-icon>{{item.icon}}</v-icon>
            </v-btn>
            <div class="grey--text">{{item.text}}</div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

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

  </v-card>

</template>
<script>
  import {IndexMenuDatas, BottomBarDatas} from '@/assets/data'
  /* eslint-disable */
  export default {
    name: 'index',
    data() {
      return {
        showNav: true,
        activeBtn: 0,
        indexMenuDatas: IndexMenuDatas,
        bottomBarDatas: BottomBarDatas
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tran {
    background-color: rgba(255, 255, 255, .6);
  }

  /*water*/
  @keyframes wave-animation-1 {
    0% {
      background-position: 0 top
    }
    100% {
      background-position: 600px top
    }
  }

  @keyframes wave-animation-2 {
    0% {
      background-position: 0 top
    }
    100% {
      background-position: 600px top
    }
  }

  .water {
    position: absolute;
    left: 0;
    bottom: -12px;
    height: 30px;
    width: 100%;
    z-index: 1;
  }

  .water-c {
    position: relative;
  }

  .water-1, .water-2 {
    position: absolute;
    width: 100%;
    height: 30px
  }

  .water-1 {
    background: url('/static/img/water-1.svg') repeat-x;
    background-size: 600px;
    -webkit-animation: wave-animation-1 3.5s infinite linear;
    animation: wave-animation-1 3.5s infinite linear
  }

  .water-2 {
    top: 5px;
    background: url('/static/img/water-2.svg') repeat-x;
    background-size: 600px;
    -webkit-animation: wave-animation-2 6s infinite linear;
    animation: wave-animation-2 6s infinite linear
  }
</style>
