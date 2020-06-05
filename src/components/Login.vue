<template>
  <div>
    <b-card class="text-center py-3 shadow-sm card" v-show="!loading">
      <b-card-text>
        <p class="display-2 font-weight-bold text-success mb-5">Pizza House</p>
        <p>美味しいピザを注文しよう</p>
        <v-btn
          class="my-5 px-5 align-middle"
          outlined
          color="grey lighten-1"
          @click="login"
          style="text-transform: none;height:42px"
        >
        <div class="my-2">
          <img class="pb-1" src="@/assets/google_icon.png" />
          <span style="color:#6a6a6a">Googleアカウントでログイン</span>
        </div>
        </v-btn>
      </b-card-text>
    </b-card>
    <Loading v-show="loading"></Loading>
  </div>
</template>
<script>
import axios from "axios";
import firebase from "firebase/app";
import { mapActions } from "vuex";
import Loading from "@/components/Loading.vue";

export default {
data(){
  return{
    loading:true,
  }
},
  methods: {
    ...mapActions(["login", "setLoginUser", "loginStatus",'deleteLoginUser','setFirebaseUser']),
  },
  components:{
    Loading
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.loading = false;
      if (user) {
        this.setFirebaseUser(user);
        axios
          .post("/login/findAllByMail", {
            email: firebase.auth().currentUser.email,
          })
          .then((response) => {
            if (!(response.data.id)) {
              this.$store.dispatch("setEmail",firebase.auth().currentUser.email)
              this.$router.push("/registerUser");
            } else if (response.data.id) {
              this.setLoginUser(response.data);
              this.loginStatus(true);
              this.$router.push("/top");
            } else{
              this.deleteLoginUser();
            }
          });
      }
    });
  },
};
</script>

<style scoped>
</style>