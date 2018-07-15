<template>
  <div>
    <!--导航-->
    <v-toolbar color="purple lighten-2" dark fixed scroll-off-screen>

      <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
      <v-btn icon @click="$router.go(-1)">
        <v-icon large>keyboard_arrow_left</v-icon>
      </v-btn>

      <v-toolbar-title class="white--text">食材订购单({{length}})</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click.stop="filter = true">
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon to="orders/order">
        <v-icon>add_circle_outline</v-icon>
      </v-btn>

    </v-toolbar>

    <!--数据列表-->
    <v-list two-line class="mt56" v-scroll="onScroll">
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
      <div infinite-scroll-immediate-check="false" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
           infinite-scroll-distance="0">
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
    <!--返回顶部按钮-->
    <v-fab-transition>
      <v-btn v-show="backTop"
        fab depressed small bottom left color="purple lighten-2" @click="backToTop()" fixed>
        <v-icon dark>expand_less</v-icon>
      </v-btn>
    </v-fab-transition>
    <!--筛选弹窗-->
    <v-dialog v-model="filter" max-width="500px">
      <!--<v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>-->
      <v-card>
        <!--<v-card-title>
          <span class="headline">条件筛选</span>
        </v-card-title>-->
        <v-card-title
          class="headline purple lighten-2 white--text"
        >条件筛选
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <!--起始日期-->
              <v-flex xs12 sm6 md4>
                <v-dialog
                  ref="startDateRef"
                  v-model="startDateModal"
                  :return-value.sync="startDate"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="起始日期"
                    v-model="startDate"
                    readonly
                    hint=""
                  ></v-text-field>
                  <v-date-picker v-model="startDate" color="purple lighten-2" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="purple lighten-2" @click="startDateModal = false">取消</v-btn>
                    <v-btn flat color="purple lighten-2" @click="$refs.startDateRef.save(startDate)">确认</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <!--截止日期-->
              <v-flex xs12 sm6 md4>
                <v-dialog
                  ref="endDateRef"
                  v-model="endDateModal"
                  :return-value.sync="endDate"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="截止日期"
                    v-model="endDate"
                    readonly
                    hint=""
                  ></v-text-field>
                  <v-date-picker v-model="endDate" color="purple lighten-2" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="purple lighten-2" @click="endDateModal = false">取消</v-btn>
                    <v-btn flat color="purple lighten-2" @click="$refs.endDateRef.save(endDate)">确认</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <!--餐别筛选-->
              <v-flex xs12 sm6 md4>
                <v-select
                  :items="['早餐', '中餐', '晚餐']"
                  label="餐别筛选"
                  multiple
                  max-height="400"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="purple lighten-2" flat @click.native="filter = false">取消</v-btn>
          <v-btn color="purple lighten-2" flat @click.native="filter = false">确认筛选</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  /* eslint-disable */
  export default {
    name: 'orders',
    data() {
      return {
        page: 1 // 默认载入第一页
        ,flag: false // 默认没有分页
        ,backTop: false // 默认不显示返回顶部
        ,filter: false // 默认不显示返回顶部
        ,startDateModal: false
        ,startDate: ''
        ,endDateModal: false
        ,endDate: ''
      }
    },
    created() {
      this.loadMore()
    },
    computed: {
      busy() {
        return this.$store.state.orders.busy
      },
      dataList() {
        return this.$store.state.orders.ordersList
      },
      length() {
        return this.$store.state.orders.ordersList.length
      }
    },
    methods: {
      viewDetail: function (id) {
        console.log(id)
      },
      loadMore: function () {
        // 此异步操作需要返回值关闭loading
        this.$store.dispatch('initList')
        this.hidden = !this.hidden
      },
      backToTop: function () {
        this.$vuetify.goTo(0, {duration: 100})
      },
      onScroll: function () {
        let offsetTop = window.pageYOffset || document.documentElement.scrollTop
        offsetTop > 500 ? this.backTop = true : this.backTop = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
