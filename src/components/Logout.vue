<template>
 <div v-show="this.$store.state.loginStatus">
    <div class="py-4 border-top">
      <b-avatar
        v-if="photoURL"
        :src="photoURL"
        variant="light"
        size="lg"
      ></b-avatar>
      <span class="ml-3"> {{ userName }} さん </span>
    </div>
    <div>
      <b-button variant="outline-light" @click="logout">ログアウト</b-button>
    </div>
  </div>


</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import firebase from "firebase/app";

export default{
    methods:{
        ...mapActions(["logout","deleteLoginUser","changeLoginStatus"]),
        
        logout(){
            firebase.auth().signOut();
            this.$router.push("/login");
            this.changeLoginStatus();


        }
    },
    computed:{
        ...mapGetters(["userName","photoURL"])
    }
}

</script>