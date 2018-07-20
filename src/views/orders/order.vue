<template>
  <div>
    <!--导航-->
    <v-toolbar color="purple lighten-2" dark fixed scroll-off-screen>
      <v-toolbar-title class="white--text">食材订购</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.go(-1)">
        <v-icon large>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>list</v-icon>
      </v-btn>

      <!--tab标题(需要在非loading状态下才渲染此tab组件，如果仅仅使用v-show，该组件会在页面加载完毕立即渲染，但是无数据，当数据请求成功后，因tab组件未再次渲染，会导致无法展示默认内容的bug)-->
      <v-tabs
        v-if="!loading"
        slot="extension"
        v-model="tab"
        color="transparent"
        slider-color="yellow"
      >
        <v-tab
          v-for="(item, index) in items"
          :href="'#tab-' + index"
          :key="item.id"
        >
          {{ item.title }}
        </v-tab>
      </v-tabs>

    </v-toolbar>

    <!--tab内容-->
    <v-tabs-items v-if="!loading" v-model="tab" class="white text-xs-justify mt112 pt-2 pb-2 pl-2 pr-2">
      <!--循环所有食材分类-->
      <v-tab-item
        v-for="(item, index) in items"
        :id="'tab-' + index"
        :key="item.id"
      >
        <!--双层循环读取食材分类下索引字母及对应食材名称-->
        <template
          v-for="item1 in item.content"
        >
          <template
            v-for="(item2, index2) in item1.content"
          >

            <v-btn icon small
                   :key="item2.id"
                   v-if="index2 === 0"
                   class="indigo lighten-2 white--text"
            >
              {{item1.title}}
            </v-btn>

            <v-chip
              :key="item2.id"
              :unit="item2.unit"
              :uprice="item2.uprice"
              @click="orderItem(item2.title, item2.unit, item2.upirce, item2.id)"
              small
            >
              {{item2.title}}
            </v-chip>
          </template>
        </template>
      </v-tab-item>
    </v-tabs-items>

    <!--每项食材订购弹层-->
    <v-dialog v-model="dialog" max-width="300px" :key="foodData.id">
      <v-card>
        <v-card-title>
          {{foodData.name}} （<span class="red--text mr-1">{{foodData.uprice}}</span>元/{{foodData.unit}}）
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="phone"
            label="请输入订购量（数字）"
            clearable
            required
            type="number"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="purple lighten-2" class="white--text lspace2 subheading" depressed
                 block @click.stop="saveOrderItem">确认订购量
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
  // '蔬菜', '荤菜', '豆制', '干菜', '调料', '粮油', '水果'
  export default {
    name: 'test',
    data: () => ({
      tab: 'tabDemo',
      foodData: {
        name: '',
        unit: '',
        uprice: '',
        id: ''
      },
      dialog: false,
      dialogLoading: false
    }),
    methods: {
      drawList() {
        this.$store.dispatch('initFoodMenu', {})
      },
      orderItem(name, unit, uprice, id) {
        this.dialog = true
        this.foodData = {
          name,
          unit,
          uprice,
          id
        }
      },
      saveOrderItem(unit, uprice) {
        this.dialog = false
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
      items() {
        return this.$store.state.orders.foodsMenu
      }
    },
    created() {
      this.drawList()
    }
  }
</script>
