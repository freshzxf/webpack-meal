<template>
  <v-app id="app">

    <!--loading-->
    <v-dialog
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
    </v-dialog>

    <!--主要框架内容-->
    <div
      class="z-app"
      :class="{'hideLeft':$route.path.split('/').length>2}">
      <!--keep-alive是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM-->
      <keep-alive>
        <router-view
          name="default">
        </router-view>
      </keep-alive>
    </div>
    <!--副页框架内容-->
    <!--<transition
      name="custom-classes-transition"
      :enter-active-class="enterAnimate"
      :leave-active-class="leaveAnimate">-->
    <keep-alive>
      <router-view
        name="subPage"
        class="router-view">
      </router-view>
    </keep-alive>
    <!--</transition>-->
  </v-app>
</template>

<script>
  // 路由切换样式
  require('@/assets/style/common.css')

  export default {
    name: 'App',
    // 定义动态数据
    data() {
      return {
        'enterAnimate': '', // 页面进入动效
        'leaveAnimate': '' // 页面离开动效
      }
    },
    // 计算属性
    computed: {
      loading() {
        return this.$store.getters.loading
      }
    },
    // 监听路由切换，设置过渡动画
    watch: {
      '$route'(to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        if (toDepth === 2) {
          // this.$store.commit('setPageName', to.name)
        }
        if (toDepth === fromDepth) {
          return
        }
        this.enterAnimate = toDepth > fromDepth
          ? 'animated fadeInRight'
          : 'animated fadeInLeft'

        this.leaveAnimate = toDepth > fromDepth
          ? 'animated fadeOutRight'
          : 'animated fadeOutLeft'
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
