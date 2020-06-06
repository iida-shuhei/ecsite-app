<template>
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
                <p class="validate">{{ ProviderProps.errors[0] }}</p>
                </div>
              </ValidationProvider>
            </div>
          </div>
        </div>
        {{ name }}

        <div class="form-group">
          <label>メールアドレス</label>
          <div class="row">
            <div class="col-xs-4">
              <ValidationProvider
                name="メール"
                rules="required|email"
              >
              <div slot-scope="ProviderProps">
              <input
                type="email"
                name="email"
                class="form-control"
                placeholder="メールアドレス"
                v-model="email"
                size="50"
                required
              />
              <p class="validate">{{ ProviderProps.errors[0] }}</p>
              </div>
              </ValidationProvider>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>郵便番号</label>
          <div class="row">
            <div class="col-xs-4">
              <input
                type="tel"
                name="zipcode"
                class="form-control"
                placeholder="郵便番号"
                v-model="zipcode"
                size="30"
              />
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
                placeholder="郵便番号"
                v-model="address"
                size="30"
              />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>電話番号</label>
          <div class="row">
            <div class="col-xs-4">
              <input
                type="tel"
                name="telephone"
                class="form-control"
                placeholder="電話番号"
                v-model="telephone"
                size="50"
              />
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
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

import { extend, ValidationProvider, ValidationObserver ,setInteractionMode} from "vee-validate";
import { required, email } from "vee-validate/dist/rules";


setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_}は入力必須です",
});

extend("email", {
  ...email,
  message: "{_field_}はメールアドレスの形式ではありません",
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
        this.$router.push("/top")
    })
    }
  }
}
</script>
<style>

.validate{
  color:red;
}

</style>
