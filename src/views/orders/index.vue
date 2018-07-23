<template>
  <div>
    <!--导航-->
    <v-toolbar color="purple lighten-2" dark fixed scroll-off-screen>

      <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->

      <v-toolbar-title class="white--text">食材订购单({{length}})</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="$router.go(-1)">
        <v-icon large>keyboard_arrow_left</v-icon>
      </v-btn>

      <v-btn icon @click.stop="drawer = true">
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon to="orders/order">
        <v-icon>add_circle_outline</v-icon>
      </v-btn>

    </v-toolbar>

    <!--数据列表(无限滚动使用的是全局滚动状态，即每个组件加载的loading状态)-->
    <v-list two-line class="mt56" v-scroll="onScroll" v-show="show">
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
            <v-list-tile-action-text class="font-italic font-weight-thin">¥ {{ item.money }}</v-list-tile-action-text>
            <v-chip color="orange lighten-2"
                    v-if="item.state === 1" small
                    text-color="white">待审核
            </v-chip>
            <v-chip color="green lighten-2"
                    v-if="item.state === 2" small
                    text-color="white">待配送
            </v-chip>
            <v-chip color="purple lighten-2"
                    v-if="item.state === 3" small
                    text-color="white">待签收
            </v-chip>
            <v-chip v-if="item.state === 4" small
                    text-color="white">已完成
            </v-chip>
          </v-list-tile-action>

        </v-list-tile>
        <v-divider
          v-if="index + 1 < dataList.length"
          :key="index"
        ></v-divider>
      </template>
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="busy"
           infinite-scroll-distance="0">
      </div>
    </v-list>

    <!--返回顶部按钮-->
    <v-fab-transition>
      <v-btn v-show="backTop"
             depressed fab small fixed bottom left color="purple lighten-2" @click="backToTop()">
        <v-icon dark>expand_less</v-icon>
      </v-btn>
    </v-fab-transition>

    <!--侧边栏-->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      right
      temporary
    >
      <v-divider></v-divider>
      <v-container grid-list-md>
        <v-layout wrap>
          <!--起始日期-->
          <v-flex xs12 sm6 md4>
            <v-menu
              ref="startDateRef"
              :close-on-content-click="false"
              v-model="startDateModal"
              :nudge-right="40"
              max-width="290px"
              min-width="290px"
              transition="scale-transition"
              lazy
              offset-y
              full-width
            >
              <!--prepend-icon="event"-->
              <v-text-field
                slot="activator"
                v-model="startDate"
                label="配送起始日期"
                clearable
                readonly
              ></v-text-field>
              <v-date-picker v-model="startDate" no-title :first-day-of-week="1" locale="zh-cn"
                             @input="startDateModal = false" color="purple lighten-2"></v-date-picker>
            </v-menu>
          </v-flex>
          <!--截止日期-->
          <v-flex xs12 sm6 md4>
            <v-menu
              ref="endDateRef"
              :close-on-content-click="false"
              v-model="endDateModal"
              :nudge-right="40"
              max-width="290px"
              min-width="290px"
              transition="scale-transition"
              lazy
              offset-y
              full-width
            >
              <!--prepend-icon="event"-->
              <v-text-field
                slot="activator"
                v-model="endDate"
                label="配送截止日期"
                clearable
                readonly
              ></v-text-field>
              <v-date-picker v-model="endDate" no-title :first-day-of-week="1" locale="zh-cn"
                             @input="endDateModal = false" color="purple lighten-2" scrollable></v-date-picker>
            </v-menu>
          </v-flex>
          <!--餐别筛选-->
          <v-flex xs12 sm6 md4>
            <v-select
              :items="['早餐', '中餐', '晚餐']"
              label="所属餐别"
              v-model="mealType"
              multiple
              max-height="400"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>

      <v-layout row>
        <v-flex xs4>
          <v-btn color="grey" depressed dark @click.native="drawer = false">取消</v-btn>
        </v-flex>
        <v-flex xs4>
          <v-btn color="red lighten-2" depressed dark @click.native="clearForm">重置</v-btn>
        </v-flex>
        <v-flex xs4>
          <v-btn color="purple lighten-2" depressed dark @click.native="filterData">确认筛选</v-btn>
        </v-flex>
      </v-layout>

    </v-navigation-drawer>
  </div>
</template>
<script>
  export default {
    name: 'orders',
    data() {
      return {
        page: 1, // 默认载入第一页
        atThisPage: true, // 在使用了keep-alive包裹显示组件的情况下，需要判断当前激活的组件是不是此组件，是的话才加载数据
        backTop: false, // 默认不显示返回顶部
        drawer: false, // 默认不显示侧滑抽屉
        startDateModal: false, // 开始日期日历弹层
        endDateModal: false, // 截止日期日历弹层
        startDate: '',
        endDate: '',
        mealType: []
      }
    },
    computed: {
      // 控制结构是否显示（首次未完成数据加载不显示，数据无限加载中以及其他各场景均显示）
      show() {
        return this.$store.state.orders.show
      },
      dataList() {
        return this.$store.state.orders.ordersList
      },
      length() {
        return this.dataList.length
      }
    },
    methods: {
      viewDetail: function (id) {
        console.log(id)
      },
      loadMore: function () {
        if (this.atThisPage) {
          let sDate = this.startDate,
            eDate = this.endDate,
            mType = this.mealType,
            page = this.page
          // 触发vuex中定义的action方法（dispatch不分模块）
          this.$store.dispatch('initList', {sDate, eDate, mType, page})
          this.page++
        }
      },
      filterData: function (startDate, endDate, mealType) {
        if (this.atThisPage) {
          this.drawer = false
          let sDate = this.startDate,
            eDate = this.endDate,
            mType = this.mealType
          this.filter = false
          // 触发vuex中定义的action方法（dispathch不分模块）
          this.$store.dispatch('initList', {sDate, eDate, mType, refresh: true})
        }
      },
      clearForm: function () {
        this.startDate = ''
        this.endDate = ''
        this.mealType = ''
      },
      backToTop: function () {
        this.$vuetify.goTo(0, {duration: 100})
      },
      onScroll: function () {
        let offsetTop = window.pageYOffset || document.documentElement.scrollTop
        offsetTop > 500 ? this.backTop = true : this.backTop = false
      }
    },
    created() {
      // this.loadMore()
    },
    activated() {
      this.atThisPage = true
    },
    deactivated() {
      this.atThisPage = false
    }
  }
</script>
