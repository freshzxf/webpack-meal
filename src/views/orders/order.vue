<template>
  <v-container>
    <!--导航-->
    <v-toolbar color="purple lighten-2" dark fixed scroll-off-screen>
      <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
      <v-btn icon @click="$router.go(-1)">
        <v-icon large>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">食材订购</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>list</v-icon>
      </v-btn>

      <!--tab-->
      <v-tabs
        slot="extension"
        v-model="tab"
        color="transparent"
        fixed-tabs
        slider-color="yellow"
      >
        <v-tab
          v-for="(item, index) in items"
          :href="'#tab-' + index"
          :key="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>

    </v-toolbar>

    <v-tabs-items v-model="tab" class="mt112">
      <v-tab-item
        v-for="(item, index) in items"
        :id="'tab-' + index"
        :key="'tab-' + item"
      >
        <v-card>
          <v-card-text>
            <!--{{ text }}-->
            <v-btn outline large fab color="indigo">
              <v-icon>edit</v-icon>
            </v-btn>

          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-btn color="purple lighten-2" depressed fab small outline>
        B
      </v-btn>

      <v-btn depressed small color="grey lighten-2">白菜</v-btn>
      <v-btn depressed small color="grey lighten-2">白花菜</v-btn>
      <v-btn depressed small color="grey lighten-2">白萝卜</v-btn>

      <v-btn depressed small color="grey lighten-2">菜心</v-btn>
      <v-btn depressed small color="grey lighten-2">大葱</v-btn>
      <v-btn depressed small color="grey lighten-2">冬瓜</v-btn>
      <v-btn depressed small color="grey lighten-2">大芹菜</v-btn>
      <v-btn depressed small color="grey lighten-2">大蒜苗</v-btn>

      <v-btn depressed small color="grey lighten-2">花瓜</v-btn>
      <v-btn depressed small color="grey lighten-2">胡萝卜</v-btn>
      <v-btn depressed small color="grey lighten-2">红蒜瓣</v-btn>
    </v-tabs-items>

  </v-container>
</template>
<script>
  /* eslint-disable */
  export default {
    name: 'test',
    data: () => ({
      tab: 'tabDemo',
      items: [
        '蔬菜', '荤菜', '豆制', '干菜', '调料', '粮油', '水果'
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }),
    methods: {
      addItem(item) {
        const removed = this.items.splice(0, 1)
        this.items.push(
          ...this.more.splice(this.more.indexOf(item), 1)
        )
        this.more.push(...removed)
        this.$nextTick(() => {
          this.currentItem = 'tab-' + item
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
