<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="elevation-0" tile>
          <!--头部-->
          <v-card-media
            src="/static/img/bg5.jpg"
            style="overflow: visible"
          >
            <v-layout
              column
              fill-height
              class="lspace"
            >
              <!--<v-card-title>
                <v-btn dark icon>
                  <v-icon large>chevron_left</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn dark icon class="mr-3">
                  <v-icon>edit</v-icon>
                </v-btn>

                <v-btn dark icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </v-card-title>-->

              <!--头像-->
              <v-avatar
                slot="activator"
                size="86"
                class="mcenter pa mt-5 mb-2"
                style="z-index: 1;top: 35px;border: 10px solid rgba(255,255,255,0.3);box-sizing: content-box"
              >
                <img
                  src="/static/img/avatar1.jpg"
                  alt="Avatar"
                  style="border: 4px solid rgba(255,255,255,0.5)"
                >
              </v-avatar>

              <div class="title white--text mt-4 pa" style="left: 10px">
                <v-chip outline class="lspace white--text" color="purple lighten-5">
                  freshzxf
                </v-chip>
              </div>
              <div class="mb-5 mt-4 pa" style="right: 10px">
                <v-chip outline class="lspace white--text" color="purple lighten-5">
                  采购管理员
                </v-chip>
              </div>
              <!--装饰弧度-->
              <img src="/static/img/water-0.svg" class="pa" style="left: -1px;right: -1px;bottom: 0">
            </v-layout>
          </v-card-media>

          <!--快捷入口-->
          <div class="pr mt-4">
            <v-layout row wrap>
              <v-flex xs4>
                <router-link :to="{name: ''}" tag="div">
                  <v-card class="elevation-0 py-2">
                    <div class="title red--text">20</div>
                    <div class="grey--text mt-2">待处理</div>
                  </v-card>
                </router-link>
              </v-flex>
              <v-flex xs4>
                <router-link :to="{name: ''}" tag="div">
                  <v-card class="elevation-0 py-2">
                    <div class="title indigo--text">20</div>
                    <div class="grey--text mt-2">待处理</div>
                  </v-card>
                </router-link>
              </v-flex>
              <v-flex xs4>
                <router-link :to="{name: ''}" tag="div">
                  <v-card class="elevation-0 py-2">
                    <div class="title blue--text">20</div>
                    <div class="grey--text mt-2">待处理</div>
                  </v-card>
                </router-link>
              </v-flex>
            </v-layout>
            <!--分割线-->
            <v-divider></v-divider>
          </div>

          <!--list列表-->
          <v-list class="py-0">
            <template v-for="(item, index) in items">
              <!--模板-->
              <v-list-tile :key="item.title" @click.native="openDialog(index)">
                <v-list-tile-action>
                  <v-icon color="purple lighten-2">{{item.icon}}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title v-if="item.title">{{item.title}}</v-list-tile-title>
                  <v-list-tile-title v-else class="grey--text">点击此处编辑完善</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action v-if="item.editable">
                  <v-icon color="grey" small>edit</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <!--分割线-->
              <v-divider
                v-if="index + 1 < items.length"
                :key="index"
                inset
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>

    <!--手机号编辑弹窗-->
    <v-dialog v-model="dialog0" max-width="500px">
      <v-card>
        <v-card-title>
          编辑常用手机号
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="phone"
            label="请输入常用手机号码"
            clearable
            required
            type="number"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="purple lighten-2" :loading="dialog0Loading" class="white--text lspace2 subheading" depressed block @click.stop="saveDialog0">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--身份证编辑弹窗-->
    <v-dialog v-model="dialog1" max-width="500px">
      <v-card>
        <v-card-title>
          编辑身份证号码
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="phone"
            label="请输入您的身份证号码"
            clearable
            required
            type="number"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="purple lighten-2" :loading="dialog1Loading" class="white--text lspace2 subheading" depressed block @click.stop="saveDialog1">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--底部bar-->
    <v-bottom-nav
      :active.sync="activeBtn"
      :value="showNav"
      fixed
      color="white"
    >
      <v-btn v-for="(item, index) in bottomBarDatas" flat :color="item.color" :to="item.link" :key="index">
        <span>{{item.text}}</span>
        <v-icon>{{item.icon}}</v-icon>
      </v-btn>

    </v-bottom-nav>
  </div>
</template>
<script>
  /* eslint-disable */
  import {BottomBarDatas} from '@/assets/data'

  export default {
    name: 'mine',
    data() {
      return {
        showNav: true,
        activeBtn: 3,
        items: [
          {editable: true, title: '', icon: 'phone'},
          {editable: true, title: '362324198912216321', icon: 'email'},
          {editable: true, title: '预防性健康检查证.jpg', icon: 'assignment_ind'},
          {editable: false, title: '紫云县羊场中学', icon: 'business'}
        ],
        bottomBarDatas: BottomBarDatas,
        phone: '',
        dialog0: false,
        dialog0Loading: false,
        dialog1: false,
        dialog1Loading: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        file: ''
      }
    },
    methods: {
      openDialog: function(index){
        this['dialog' + index] = true
        this['dialog' + index + 'Loading'] = false
      },
      saveDialog0: function(){
        this.dialog0Loading = true
        setTimeout(() => (this.dialog0 = false), 2000)
      },
      saveDialog1: function(){
        this.dialog1Loading = true
        setTimeout(() => (this.dialog1 = false), 2000)
      }
    },
    computed: {
    },
    created(){
    }
  }
</script>
