<template>
  <div class="white py-2">
    <!--导航-->
    <v-toolbar color="primary" dark fixed scroll-off-screen>
      <v-toolbar-title class="white--text">食材订购</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.go(-1)">
        <v-icon large>keyboard_arrow_left</v-icon>
      </v-btn>

      <v-badge right overlap color="primary">
        <span slot="badge" class="yellow--text" v-if="selectedFoodsMenuLen">{{selectedFoodsMenuLen}}</span>
        <v-btn icon small @click.native="fullDialog = true">
          <v-icon>list</v-icon>
        </v-btn>
      </v-badge>

      <!--tab标题(需要在非loading状态下才渲染此tab组件，如果仅仅使用v-show，该组件会在页面加载完毕立即渲染，但是无数据，当数据请求成功后，因tab组件未再次渲染，会导致无法展示默认内容的bug)-->
      <v-tabs
        v-if="!loading"
        slot="extension"
        v-model="tab"
        color="transparent"
        slider-color="yellow"
      >
        <v-tab
          v-for="(item, index) in foodsMenu"
          :href="'#tab-' + index"
          :key="item.id"
        >
          {{ item.title }}
        </v-tab>
      </v-tabs>

    </v-toolbar>

    <!--tab内容-->
    <v-tabs-items v-if="!loading" v-model="tab" class="white text-xs-justify mt112 mx-2">
      <!--循环所有食材分类-->
      <v-tab-item
        v-for="(item, index) in foodsMenu"
        :id="'tab-' + index"
        :key="item.id"
      >
        <!--双层循环读取食材分类下索引字母及对应食材名称-->
        <template
          v-for="(item1, index1) in item.content"
        >
          <template
            v-for="(item2, index2) in item1.content"
          >

            <!--字母索引-->
            <v-btn icon small
                   :key="0 + item2.id"
                   v-if="index2 === 0"
                   class="indigo lighten-2 white--text"
            >
              {{item1.title}}
            </v-btn>

            <!--如果item2.amount不为0，则当前项为红色背景并且显示数量-->
            <v-chip
              :class="{'red lighten-2 white--text' : item2.amount>0}"
              :key="item2.id"
              :unit="item2.unit"
              :uprice="item2.uprice"
              @click="orderItem(item2.title, item2.amount, item2.unit, item2.uprice, item2.id, index2, index1, index)"
            >
              <span v-if="item2.amount>0" class="yellow--text mr-2">{{item2.amount}}</span>
              {{item2.title}}
            </v-chip>

          </template>
        </template>
      </v-tab-item>
    </v-tabs-items>

    <!--每项食材订购弹层-->
    <v-dialog v-model="dialog" max-width="300px">
      <v-card>
        <v-card-title>
          {{foodData.name}} （<span class="red--text mr-1">{{foodData.uprice}}</span>元/{{foodData.unit}}）
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="amount"
            label="请输入订购量（数字）"
            clearable
            required
            type="number"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="purple lighten-2" class="white--text lspace2 subheading" depressed
                 block @click.stop="saveOrderItem" :loading="dialogLoading">确认订购量
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--全屏modal-->
    <v-dialog
      v-model="fullDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="fullDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>食材订购单</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right offset-y>
            <v-btn slot="activator" dark icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-menu>
        </v-toolbar>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
  export default {
    name: 'test',
    data: () => ({
      tab: 'tabDemo',
      amount: '',
      foodData: {
        name: '',
        unit: '',
        uprice: '',
        id: '',
        index2: '',
        index1: '',
        index: ''
      },
      selectedFoodsMenu: [],
      selectedFoodsMenuLen: '',
      dialog: false,
      fullDialog: false,
      dialogLoading: false
    }),
    methods: {
      drawList() {
        this.$store.dispatch('initFoodMenu', {})
      },
      // 打开编辑弹窗时传入当前食材名、食材数量、食材单价、食材id、食材所在各层索引值（3层），并动态更新用于绑定显示当前操作食材的数据对象foodData
      orderItem(name, amount, unit, uprice, id, index2, index1, index) {
        this.dialog = true
        this.amount = amount
        this.foodData = {
          name,
          amount,
          unit,
          uprice,
          id,
          index2,
          index1,
          index
        }
      },
      // 过食谱中已存在订购量的食材
      filterSelectedFoodsMenu() {
        let sfmTpl = []
        this.foodsMenu.forEach(function (item, index) {
          item.content.forEach(function (item1, index1) {
            item1.content.filter(function (item2, index2, arr) {
              if (item2.hasOwnProperty('amount') && item2.amount > 0) {
                sfmTpl.push(item2)
              }
            })
          })
        })
        return sfmTpl
      },
      // 保存当前食材订购量
      saveOrderItem() {
        // 按钮开启loading状态
        this.dialogLoading = true
        // 设置传入数据
        let idx = this.foodData.index
        let idx1 = this.foodData.index1
        let idx2 = this.foodData.index2
        let currentAmount = this.amount
        // 非异步直接修改vuex中mutations（根据三层索引找到修改点，传入数量值修改订购量）
        this.$store.commit('editFoodData', {idx, idx1, idx2, currentAmount})
        // 关闭按钮loading状态并关闭弹层
        this.dialogLoading = false
        this.dialog = false

        // 修改已订购食材及已订购食材种类响应数据
        this.selectedFoodsMenu = this.filterSelectedFoodsMenu()
        this.selectedFoodsMenuLen = this.filterSelectedFoodsMenu().length
      }
    },
    computed: {
      // 全局loading
      loading() {
        return this.$store.getters.loading
      },
      // 食材单数据
      foodsMenu() {
        return this.$store.state.orders.foodsMenu
      }
    },
    created() {
      this.drawList()
    }
  }
</script>
