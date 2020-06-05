<template>
<div class="form-container container">
  <form>
    <div class="form-group">
      <label>名前</label>
      <div class="row">
        <div class="col-xs-4">
        <input type="text" name="name" class="form-control" placeholder="名前" v-model="name"  size="50">   
        </div>
      </div>
    </div>
    <div class="form-group">
      <label>メールアドレス</label>
      <div class="row">
      <div class="col-xs-4">
      <input  type="email" name="email" class="form-control" placeholder="メールアドレス" v-model="email" size="50">
      </div>
      </div>
    </div>

    <div class="form-group">
      <label>郵便番号</label>
      <div class="row">
        <div class="col-xs-4">
      <input  type="tel"  name="zipcode" class="form-control" placeholder="郵便番号" v-model="zipcode" size="30">
      </div>
      </div>
    </div>

    <div class="form-group">
      <label>住所</label>
      <div class="row">
        <div class="col-xs-4">
      <input  type="text" name="address" class="form-control" placeholder="郵便番号" v-model="address" size="30">
      </div>
      </div>
    </div>
    <div class="form-group">
      <label>電話番号</label>
      <div class="row">
      <div class="col-xs-4">
      <input type="tel"  name="telephone" class="form-control"  placeholder="電話番号" v-model="telephone" size="50">
      </div>
    </div>
    </div>
    <div class="btn-container"><button type="submit"  class="btn btn-primary" @click.prevent="register()">登録</button></div>
  </form>
</div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default{
  data(){
    return{
      name:null,
      email:this.$store.state.loginUser.email,
      zipcode:null,
      address:null,
      telephone:null
    }
  },
  methods:{
    ...mapActions(["setLoginUser","loginStatus"]),
    //ユーザー登録処理
    register(){
        this.name = this.name.replace("　","")
        axios.post("/register", {
        name: this.name,
        email: this.email,
        zipcode:this.zipcode,
        address:this.address,
        telephone:this.telephone
    })
    .then(response=>{
        console.log(response.data)
        this.setLoginUser(response.data);
        this.loginStatus();
        alert("登録が完了しました")
        this.$router.push("/top")
    })
    }
  }
}




</script>