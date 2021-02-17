<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app>
        <!-- -->
      </v-navigation-drawer>

      <v-app-bar color="blue" app>
        <!-- -->
        <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
            color="white"
        ></v-app-bar-nav-icon>
        <v-toolbar-title
            style="color: #fff"
            color="white">
          {{ config.appName }}
        </v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
          class="app-left-drawer"
          v-model="drawer"
          absolute
          left
      >
        <v-list
            nav
            dense
        >
          <v-list-item-group
              v-model="group"
              active-class="blue--text text--darken-1"
          >
            <v-list-item :to="{ name: 'home' }">
              <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: 'about-page' }">
              <v-list-item-icon><v-icon>mdi-information-outline</v-icon></v-list-item-icon>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <!-- 根据应用组件来调整你的内容 -->
      <v-main>
        <!-- 给应用提供合适的间距 -->
        <v-container fluid><!-- 如果使用 vue-router -->
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import config from '@/../config/config'

export default {
  name: 'my-project',
  data () {
    return {
      drawer: false,
      group: null,
      config
    }
  }
}
</script>

<style lang="less" scoped>
.app-left-drawer {
  margin-top: 64px;
}
</style>
