<template>
  <v-container>
    <!--导航-->
    <v-toolbar color="purple lighten-2" dark fixed scroll-off-screen>
      <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
      <v-btn icon @click="$router.go(-1)">
        <v-icon large>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">出错啦</v-toolbar-title>
    </v-toolbar>

    <div class="mt56">
      无匹配
    </div>

  </v-container>
</template>
<script>
  /* eslint-disable */
  export default {
    name: 'test',
    data() {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
