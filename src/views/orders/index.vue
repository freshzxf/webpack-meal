<template>
  <div>
    <!--导航-->
    <v-toolbar color="blue" dark fixed scroll-off-screen>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">食材订购单</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

    <!--list-->
    <v-list style="margin: 56px 0" two-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
        >
          {{ item.header }}
        </v-subheader>

        <v-divider
          class="grey lighten-3"
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

    <v-bottom-nav
      :active.sync="activeBtn"
      :value="showNav"
      fixed
      color="white"
    >
      <v-btn flat color="teal">
        <span>Recents</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn flat color="teal">
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn flat color="teal">
        <span>Nearby</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>
<script>
  /* eslint-disable */
  export default {
    name: 'index',
    data() {
      return {
        avatarSize: 60,
        activeBtn: 1,
        showNav: true,
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
          },
          { divider: true, inset: true },
          {
            avatar: 'http://img0.imgtn.bdimg.com/it/u=892880182,3985643208&fm=27&gp=0.jpg',
            title: 'Fresh',
            subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
          },
          { divider: true, inset: true },
          {
            avatar: 'http://img0.imgtn.bdimg.com/it/u=892880182,3985643208&fm=27&gp=0.jpg',
            title: 'Good',
            subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
          },
          { divider: true, inset: true },
          {
            avatar: 'http://img0.imgtn.bdimg.com/it/u=892880182,3985643208&fm=27&gp=0.jpg',
            title: 'None',
            subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
          },
          { divider: true, inset: true },
          {
            avatar: 'http://img0.imgtn.bdimg.com/it/u=892880182,3985643208&fm=27&gp=0.jpg',
            title: 'Okkk',
            subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
          },
          { divider: true, inset: true },
          {
            avatar: 'http://img0.imgtn.bdimg.com/it/u=892880182,3985643208&fm=27&gp=0.jpg',
            title: 'Cddd',
            subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
          },
          { divider: true, inset: true },
          {
            avatar: 'http://img0.imgtn.bdimg.com/it/u=892880182,3985643208&fm=27&gp=0.jpg',
            title: 'Nbudc',
            subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
          },
          { divider: true, inset: true },
          {
            avatar: 'http://img0.imgtn.bdimg.com/it/u=892880182,3985643208&fm=27&gp=0.jpg',
            title: 'ckyf',
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
