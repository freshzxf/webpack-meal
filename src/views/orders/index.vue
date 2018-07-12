<template>
  <div>
    <!--导航-->
    <v-toolbar color="purple lighten-2" dark fixed scroll-off-screen>

      <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
      <v-btn icon @click="$router.go(-1)">
        <v-icon large>keyboard_arrow_left</v-icon>
      </v-btn>

      <v-toolbar-title class="white--text">食材订购单</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon to="orders/order">
        <v-icon>add_circle_outline</v-icon>
      </v-btn>

    </v-toolbar>

    <!--<v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="indigo lighten-2"
        dark
      >
        <v-card-text>
          数据加载中，请耐心等候...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>-->
    <!--数据列表-->
    <v-list two-line class="mt56">
      <template v-for="(item, index) in dataList">
        <v-list-tile
          :key="item.id"
          avatar
          ripple
          @click="viewDetail(item.id)"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}（{{item.from}}）</v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">配送日期：{{ item.range }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>上报时间：{{ item.creatTime }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-list-tile-action-text>¥ {{ item.money }}</v-list-tile-action-text>
            <v-chip color="orange lighten-2"
                    v-if="item.state === 1"
                    text-color="white">待审核
            </v-chip>
            <v-chip color="green lighten-2"
                    v-if="item.state === 2"
                    text-color="white">待配送
            </v-chip>
            <v-chip color="purple lighten-2"
                    v-if="item.state === 3"
                    text-color="white">待签收
            </v-chip>
            <v-chip v-if="item.state === 4"
                    text-color="white">已完成
            </v-chip>
          </v-list-tile-action>

        </v-list-tile>
        <v-divider
          v-if="index + 1 < dataList.length"
          :key="index"
        ></v-divider>
      </template>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0">
        <v-dialog
          v-model="busy"
          hide-overlay
          persistent
          width="300"
        >
          <v-card
            color="indigo lighten-2"
            dark
          >
            <v-card-text>
              数据加载中，请耐心等候...
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </v-list>
  </div>
</template>
<script>
  import {OrdersList} from '@/assets/data'

  /* eslint-disable */
  export default {
    name: 'orders',
    data() {
      return {
        loading: true,
        busy: false,
        page: 1, //默认载入第一页
        flag: false, // 默认没有分页
        dataList: []
      }
    },
    created(){
      this.getList()
    },
    components: {
    },
    methods: {
      getList: function(){
        this.dataList = this.dataList.concat(OrdersList);
        this.busy = false;
      },
      viewDetail: function (id) {
        console.log(id)
      },
      loadMore: function() {
        this.busy = true;
        setTimeout(() => {
          this.getList();
        }, 1000);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
