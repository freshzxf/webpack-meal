<template>
  <v-container>
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
          {{ item.title }}
        </v-tab>
      </v-tabs>

    </v-toolbar>

    <v-tabs-items v-model="tab" class="mt112">
      <v-tab-item
        v-for="(item, index) in items"
        :id="'tab-' + index"
        :key="'tab-' + item"
      >
<!--
        <v-card>
          <v-card-text>

            <template
              v-for="item1 in item.content"
            >

              <v-expansion-panel v-model="panel" expand>
                <v-expansion-panel-content
                  v-for="item2 in item1.content"
                  :key="'tab-'+item2"
                >
                  <div slot="header">{{item2.title}}</div>
                  <v-card>
                    <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                      aliquip ex ea commodo consequat.
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>

            </template>

          </v-card-text>
        </v-card>
-->
      </v-tab-item>

    </v-tabs-items>

  </v-container>
</template>
<script>
  /* eslint-disable */
  // '蔬菜', '荤菜', '豆制', '干菜', '调料', '粮油', '水果'

  export default {
    name: 'test',
    data: () => ({
      tab: 'tabDemo',
      items: [
        {
          title: '蔬菜',
          content: [
            {title: 'A', content: [{title: '啊菜', unit: '斤', upirce: '3.5'}, {title: '啊菜', unit: '斤', upirce: '3.5'}]},
            {title: 'B', content: [{title: '包菜', unit: '斤', upirce: '2.2'}, {title: '包心菜', unit: '斤', upirce: '2.5'}]},
            {title: 'C', content: [{title: '菜心', unit: '斤', upirce: '1.2'}, {title: '车草', unit: '斤', upirce: '3.8'}]}
          ]
        }, {
          title: '荤菜',
          content: [
            {title: 'N', content: [{title: '牛肉', unit: '斤', upirce: '40'}]},
            {title: 'J', content: [{title: '鸡肉', unit: '斤', upirce: '17'}, {title: '鲫鱼', unit: '条', upirce: '8'}]}
          ]
        }, {
          title: '荤菜',
          content: [
            {title: 'N', content: [{title: '牛肉', unit: '斤', upirce: '40'}]},
            {title: 'J', content: [{title: '鸡肉', unit: '斤', upirce: '17'}, {title: '鲫鱼', unit: '条', upirce: '8'}]}
          ]
        }, {
          title: '豆制',
          content: [
            {title: 'N', content: [{title: '牛肉', unit: '斤', upirce: '40'}]},
            {title: 'J', content: [{title: '鸡肉', unit: '斤', upirce: '17'}, {title: '鲫鱼', unit: '条', upirce: '8'}]}
          ]
        }, {
          title: '干菜',
          content: [
            {title: 'N', content: [{title: '牛肉', unit: '斤', upirce: '40'}]},
            {title: 'J', content: [{title: '鸡肉', unit: '斤', upirce: '17'}, {title: '鲫鱼', unit: '条', upirce: '8'}]}
          ]
        }, {
          title: '调料',
          content: [
            {title: 'N', content: [{title: '牛肉', unit: '斤', upirce: '40'}]},
            {title: 'J', content: [{title: '鸡肉', unit: '斤', upirce: '17'}, {title: '鲫鱼', unit: '条', upirce: '8'}]}
          ]
        }, {
          title: '粮油',
          content: [
            {title: 'N', content: [{title: '牛肉', unit: '斤', upirce: '40'}]},
            {title: 'J', content: [{title: '鸡肉', unit: '斤', upirce: '17'}, {title: '鲫鱼', unit: '条', upirce: '8'}]}
          ]
        }, {
          title: '水果',
          content: [
            {title: 'N', content: [{title: '牛肉', unit: '斤', upirce: '40'}]},
            {title: 'J', content: [{title: '鸡肉', unit: '斤', upirce: '17'}, {title: '鲫鱼', unit: '条', upirce: '8'}]}
          ]
        }
      ],
      panel: [true],
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
