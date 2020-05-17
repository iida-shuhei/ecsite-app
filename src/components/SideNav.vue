<template>
  <div id="adminside">
    <div>
      <b-sidebar
        id="sidebar-backdrop"
        bg-variant="dark"
        text-variant="light"
        backdrop
        shadow
      >
        <div class="px-4 mb-5 display-1 font-weight-medium title">
          <h2>Menu</h2>
        </div>
        <v-divider></v-divider>
        <v-list class="py-0 bg-dark" dark tile>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-icon>
                <v-icon> mdi mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title @click="toPage('/top')" class="text-white"
                  >ホーム</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon> mdi mdi-cart-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-white" @click="toPage('/cart')"
                  >買い物かご</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon> mdi mdi-history</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  class="text-white"
                  >購入履歴</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <template>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon> mdi mdi-bell-check-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="text-white"
                    >このサイトについて</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </template>

          </v-list-item-group>
        </v-list>
        <Logout></Logout>
      </b-sidebar>
    </div>
  </div>
</template>

<script>
import Logout from "@/components/Logout";
export default {
  components:{
        Logout
  },
  data() {
    return {
    }
  },
  mounted() {
    window.addEventListener("resize", this.abjustLogout);
  },
  methods: {
    toPage(path) {
      this.$router.push(path);
    },
  }
};
</script>

<style scoped>
 .title {
    position: absolute;
    left: 50%;  /*親要素を起点に左から50%*/
    transform: translateY(-50%) translateX(-50%); 
 }
</style>