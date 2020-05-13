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
        <div class="px-4 mb-5 display-1 font-weight-medium">Menu</div>
        <v-list class="py-0 bg-dark" dark tile>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-icon>
                <v-icon> mdi mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title @click="toPage('/home')" class="text-white"
                  >ホーム</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon> mdi mdi-cart-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-white"
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
      </b-sidebar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    window.addEventListener("resize", this.abjustLogout);
  },
};
</script>
