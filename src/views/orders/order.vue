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

      <!--tab标题-->
      <v-tabs
        slot="extension"
        v-model="tab"
        :value.sync="active"
        color="transparent"
        slider-color="yellow"
      >
        <v-tab
          v-for="(item, index) in items"
          :href="'#tab-' + index"
          :key="item.id"
          @click="openAll(item.content.length)"
        >
          {{ item.title }}
        </v-tab>
      </v-tabs>

    </v-toolbar>

    <!--tab内容-->
    <v-tabs-items v-model="tab" class="mt112">
      <v-tab-item
        v-for="(item, index) in items"
        :id="'tab-' + index"
        :key="item.id"
      >
        <!--折叠面板组件-->
        <v-expansion-panel v-model="panel[index]" expand class="elevation-0">
          <v-expansion-panel-content
            v-for="item1 in item.content"
            :key="item1.id"
          >
            <!--字母索引-->
            <div slot="header">
              <v-btn color="indigo lighten-2" fab small dark depressed style="width: 22px;height: 22px">
                {{item1.title}}
              </v-btn>
            </div>

            <!--对应分类菜谱-->
            <v-card>
              <v-card-text>
                <v-chip v-for="item2 in item1.content"
                        :key="item2.id"
                        small
                >{{item2.title}}
                </v-chip>
              </v-card-text>
            </v-card>

          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-tab-item>
    </v-tabs-items>
    <!--loading-->
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
</template>
<script>
  /* eslint-disable */
  // '蔬菜', '荤菜', '豆制', '干菜', '调料', '粮油', '水果'
  export default {
    name: 'test',
    data: () => ({
      tab: 'tabDemo',
      active: 0,
      show: 2,
      /*items: [
        {
          title: '蔬菜',
          content: [
            {
              title: 'A',
              content: [{title: '啊菜', unit: '斤', upirce: '3.5', id: '1-1-1'}, {
                title: '啊菜',
                unit: '斤',
                upirce: '3.5',
                id: '1-1-2'
              }],
              id: '1-1'
            },
            {
              title: 'B',
              content: [{title: '包菜', unit: '斤', upirce: '2.2', id: '1-2-1'}, {
                title: '包心菜',
                unit: '斤',
                upirce: '2.5',
                id: '1-2-2'
              }],
              id: '1-2'
            },
            {
              title: 'C',
              content: [{title: '菜心', unit: '斤', upirce: '1.2', id: '1-3-1'}, {
                title: '车草',
                unit: '斤',
                upirce: '3.8',
                id: '1-3-2'
              }],
              id: '1-3'
            }
          ],
          id: 1
        }, {
          title: '荤菜',
          content: [
            {title: 'N', content: [{title: '牛肉', unit: '斤', upirce: '40', id: '2-1-1'}], id: '2-1'},
            {
              title: 'J',
              content: [{title: '鸡肉', unit: '斤', upirce: '17', id: '2-2-1'}, {
                title: '鲫鱼',
                unit: '条',
                upirce: '8',
                id: '2-2-2'
              }],
              id: '2-2'
            }
          ],
          id: 2
        }, {
          title: '荤菜',
          content: [
            {title: 'N', content: [{title: '牛肉', unit: '斤', upirce: '40'}], id: '3-1'},
            {
              title: 'J',
              content: [{title: '鸡肉', unit: '斤', upirce: '17'}, {title: '鲫鱼', unit: '条', upirce: '8'}],
              id: '3-2'
            }
          ],
          id: 3
        }, {
          title: '豆制',
          content: [
            {title: 'N', content: [{title: '牛肉', unit: '斤', upirce: '40', id: '4-1-1'}], id: '4-1'},
            {
              title: 'J',
              content: [{title: '鸡肉', unit: '斤', upirce: '17', id: '4-2-1'}, {
                title: '鲫鱼',
                unit: '条',
                upirce: '8',
                id: '4-2-2'
              }],
              id: '4-2'
            }
          ],
          id: 4
        }, {
          title: '干菜',
          content: [
            {title: 'N', content: [{title: '牛肉', unit: '斤', upirce: '40', id: '5-1-1'}], id: '5-1'},
            {
              title: 'J',
              content: [{title: '鸡肉', unit: '斤', upirce: '17', id: '5-2-1'}, {
                title: '鲫鱼',
                unit: '条',
                upirce: '8',
                id: '5-2-2'
              }],
              id: '5-2'
            }
          ],
          id: 5
        }, {
          title: '调料',
          content: [
            {title: 'N', content: [{title: '牛肉', unit: '斤', upirce: '40', id: '6-1-1'}], id: '6-1'},
            {
              title: 'J',
              content: [{title: '鸡肉', unit: '斤', upirce: '17', id: '6-2-1'}, {
                title: '鲫鱼',
                unit: '条',
                upirce: '8',
                id: '6-2-2'
              }],
              id: '6-2'
            }
          ],
          id: 6
        }, {
          title: '粮油',
          content: [
            {title: 'N', content: [{title: '牛肉', unit: '斤', upirce: '40', id: '7-1-1'}], id: '7-1'},
            {
              title: 'J',
              content: [{title: '鸡肉', unit: '斤', upirce: '17', id: '7-2-1'}, {
                title: '鲫鱼',
                unit: '条',
                upirce: '8',
                id: '7-2-2'
              }],
              id: '7-2'
            }
          ],
          id: 7
        }, {
          title: '水果',
          content: [
            {title: 'N', content: [{title: '牛肉', unit: '斤', upirce: '40', id: '8-1-1'}], id: '8-1'},
            {
              title: 'J',
              content: [{title: '鸡肉', unit: '斤', upirce: '17', id: '8-2-1'}, {
                title: '鲫鱼',
                unit: '条',
                upirce: '8',
                id: '8-2-2'
              }],
              id: '8-2'
            }
          ],
          id: 8
        }
      ],*/
    }),
    methods: {
      drawList() {
        var that = this;
        that.$store.dispatch('initFoodMenu', {}).then(function () {
        })
      },
      openAll(length) {
        this.panel.length = 0
        let arr = []
        for (let i = 0; i < length; i++) {
          arr.push(true)
        }
        this.panel.push(arr)
        console.log(this.panel)
      }
    },
    computed: {
      items() {
        return this.$store.state.orders.foodsMenu
      },
      busy() {
        return this.$store.state.orders.busy1
      },
      panel() {
        return []
      }
    },
    created() {
      this.drawList()
    }
  }
</script>
