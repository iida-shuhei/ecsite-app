<template>
<div class="register">
    <h2 class="registerTitle">ユーザー登録画面</h2>
<div class="registerForm">
  <div class="form-container container">
    <ValidationObserver ref="observer" v-slot="ObserverProps">
      <form>
        <div class="form-group">
          <label>名前</label>
          <div class="row">
            <div class="col-xs-4">
              <ValidationProvider
                name="名前"
                rules="required"
              >
              <div slot-scope="ProviderProps">
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  placeholder="名前"
                  v-model="name"
                  size="50"
                  required
                />
                <span class="validate">{{ ProviderProps.errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
          </div>
        </div>
       

        <div class="form-group">
          <label>メールアドレス</label>
          <div class="row">
            <div class="col-xs-4">
              <div>
              <input
                type="email"
                name="email"
                disabled="disabled"
                class="form-control"
                placeholder="メールアドレス"
                v-model="email"
                size="50"
                required
              />
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>郵便番号</label>
          <div class="row">
            <div class="col-xs-4">
              <ValidationProvider
                name="郵便番号"
                :rules="{ zipcode: /^\d{7}$/ }"
                 v-slot="ProviderProps"
                
              >
              <input
                type="tel"
                name="郵便番号"
                class="form-control"
                placeholder="郵便番号"
                v-model="zipcode"
                size="40"
                required
                
              />
              <b-button @click="search()">検索</b-button><br>
              <span class="validate">{{ ProviderProps.errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>住所</label>
          <div class="row">
            <div class="col-xs-4">
              <input
                type="text"
                name="address"
                class="form-control"
                placeholder=住所
                v-model="address"
                size="30"
              />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>電話番号(携帯)</label>
          <div class="row">
            <div class="col-xs-4">
              <ValidationProvider :rules =" { tel: /^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/} " v-slot="ProviderProps">
              <input
                type="tel"
                name="電話番号"
                class="form-control"
                placeholder="電話番号"
                v-model="telephone"
                size="50"
                required
              />
              <span class="validate">{{ ProviderProps.errors[0] }}</span>

              </ValidationProvider>
            </div>
          </div>
        </div>

        <div class="btn-container">
          <button
            type="submit"
            class="btn btn-primary"
            @click.prevent="register"
            :disabled="ObserverProps.invalid || !ObserverProps.validated"
          >
            登録
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

import { extend, ValidationProvider, ValidationObserver ,setInteractionMode} from "vee-validate";
import { required, email,regex } from "vee-validate/dist/rules";


setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_}は入力必須です",
});

extend("email", {
  ...email,
  message: "{_field_}はメールアドレスの形式ではありません",
});

extend("zipcode", {
  ...regex,
  message: "{_field_}は半角数字７桁で入力してください",
});
extend("tel", {
  ...regex,
  message: "{_field_}は正しく入力してください",
});



export default{
  components: {
    ValidationProvider,
    ValidationObserver,
  },
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
        this.$router.push("/")
    })
    },
    search() {
        axios.get(`https://api.zipaddress.net/?zipcode=${this.zipcode}`)
        .then((response) => {
          this.address = response.data.data.address;
        })
      },
  }
}
</script>
<style>

.validate{
  color:red;
}
.register{
  margin: 0 auto;
  margin-top:4%;
  
}
.registerForm{
  background:#EEEEEE;
}
.btn-container{
  text-align: center;
}
.registerTitle{
  position:relative;
  text-align: center;
  
}
.form-container.container{
  margin:20px;
}



</style>
