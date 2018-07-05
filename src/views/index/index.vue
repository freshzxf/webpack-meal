<template>
  <div>
    <!--导航-->
    <v-toolbar color="blue" dark transition="">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Inbox</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <!--头像-->
    <v-avatar
      :tile="false"
      :size="avatarSize"
      color=""
    >
      <img src="http://img0.imgtn.bdimg.com/it/u=892880182,3985643208&fm=27&gp=0.jpg" alt="avatar">
    </v-avatar>
    <!--list-->
    <v-list two-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
        >
          {{ item.header }}
        </v-subheader>

        <v-divider
          class=""
          v-else-if="item.divider"
          :inset="item.inset"
          :key="index"
        ></v-divider>

        <v-list-tile
          v-else
          :key="item.title"
          avatar
        >
          <v-list-tile-avatar>
            <img :src="item.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>

    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card dark color="primary" class="blue white--text">
            <v-card-text class="px-0">
              <router-link to="test">Home</router-link>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex v-for="i in 2" :key="`6${i}`" xs6>
          <v-card dark color="secondary">
            <v-card-text class="px-0">6</v-card-text>
          </v-card>
        </v-flex>
        <v-flex v-for="i in 3" :key="`4${i}`" xs4>
          <v-card dark color="primary">
            <v-card-text class="px-0">4</v-card-text>
          </v-card>
        </v-flex>
        <v-flex v-for="i in 4" :key="`3${i}`" xs3>
          <v-card dark color="secondary">
            <v-card-text class="px-0">3</v-card-text>
          </v-card>
        </v-flex>
        <v-flex v-for="i in 6" :key="`2${i}`" xs2>
          <v-card dark color="primary">
            <v-card-text class="px-0">2</v-card-text>
          </v-card>
        </v-flex>
        <v-flex v-for="i in 12" :key="`1${i}`" xs1>
          <v-card dark color="secondary">
            <v-card-text class="px-0">1</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  /* eslint-disable */
  export default {
    name: 'index',
    props: [{transition: 'v-scale-transition'}],
    data() {
      return {
        avatarSize: 60,
        items: [
          { header: 'Today' },
          {
            avatar: 'http://img0.imgtn.bdimg.com/it/u=892880182,3985643208&fm=27&gp=0.jpg',
            title: 'Brunch this weekend?',
            subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
          },
          { divider: true, inset: true },
          {
            avatar: 'http://img0.imgtn.bdimg.com/it/u=892880182,3985643208&fm=27&gp=0.jpg',
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
          },
          { divider: true, inset: true },
          {
            avatar: 'http://img0.imgtn.bdimg.com/it/u=892880182,3985643208&fm=27&gp=0.jpg',
            title: 'Oui oui',
            subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
