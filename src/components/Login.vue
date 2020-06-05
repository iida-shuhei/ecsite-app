<template>
<div>

  <v-col class="text-center" cols="12" sm="4">
    <div class="my-2">
      <v-btn @click="login">Googleアカウントでログイン</v-btn>
    </div>
  </v-col>
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
              this.loginStatus();
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
