<template>
  <div>
    <b-container>
      <h3>送付先</h3>

    <v-form ref="form" class="form" v-model="contactFormValidation.valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="contactFormValidation.nameRules"
        label="名前"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="contactFormValidation.emailRules"
        label="メールアドレス"
        required
      ></v-text-field>
        
      <div class="d-flex flex-row align-baseline">
      <v-text-field
        v-model="zipcode"
        :rules="contactFormValidation.zipcodeRules"
        label="郵便番号"
        required
      ></v-text-field>
      <b-button @click="search()">検索</b-button>
      </div>
        
      <v-text-field
        v-model="address"
        :rules="contactFormValidation.addressRules"
        label="住所"
        required
      ></v-text-field>
        
      <v-text-field
        v-model="telephone"
        :rules="contactFormValidation.telephoneRules"
        label="電話番号"
        required
      ></v-text-field>
        
      </v-form>
    </b-container>

    <TotalPrice/>

    <v-content>
      <v-row justify="center">
        <v-col cols="8">
          <span class="demonstration">配達希望日 : </span>
          <el-date-picker
            v-model="selectedDate"
            type="date"
            placeholder="配達希望日"
            :picker-options="pickerOptions">
          </el-date-picker>

          <div>配達希望時間 : 
          <vue-timepicker 
          hide-disabled-items 
          :hour-range="[[11, 22]]" 
          :minute-interval="30" 
          v-model="deliveryTime"
          placeholder="配達希望時間"
          hour-label="時"
          minute-label="分"
          :picker-options="timeOptions"
          ></vue-timepicker></div>

        </v-col>
      </v-row>
    </v-content>

      <v-container fluid>
        <v-radio-group v-model="paymentMethod">
          <v-radio label="現金" value="1"></v-radio>
          <v-radio label="クレジットカード" value="2"></v-radio>
        </v-radio-group>
      </v-container>

      <b-button
        :disabled="!contactFormValidation.valid"
        @click="purchase()"
        block
        large
        variant="dark"
        class="mt-4 font-weight-bold"
        >購入
      </b-button>

    </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import TotalPrice from '@/components/TotalPrice.vue'
import axios from "axios";
export default {
  components : {
    VueTimepicker,
    TotalPrice
  },
    data: () => ({
        items:[],

        name: '',
        email: '',
        zipcode: '',
        address: '',
        telephone: '',
        orderToppingList:"",
        date: null,
        deliveryTime: '',
        paymentMethod: "1",

        now: '',

        timeOptions: {
          disabledTime(time) {
            return time.getTime() < Date.now().getTime;
          }
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: '当日をご希望の方はこちらをクリック',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, 
          ]
        },
        selectedDate: String,

        contactFormValidation: {
        valid: false,
        nameRules: [v => !!v || 'タイトルは必須項目です'],
        emailRules: [v => !!v || 'メールは必須項目です'],
        zipcodeRules: [v => !!v || '郵便番号は必須項目です'],
        addressRules: [v => !!v || '住所は必須項目です'],
        telephoneRules: [v => !!v || '電話番号は必須項目です']
        },
    }),
    methods: {
      
      search() {
        axios.get(`https://api.zipaddress.net/?zipcode=${this.zipcode}`)
        .then((response) => {
          this.address = response.data.data.address;
        })
      },

      purchase: function () {
        axios.post("http://localhost:8080/purchase", {
            userId: this.$store.state.loginUser.id,
            destinationName: this.name,
            destinationEmail: this.email,
            destinationZipcode: this.zipcode,
            destinationAddress: this.address,
            destinationTel: this.telephone,
            totalPrice: this.$route.params.totalPrice,
            deliveryDate: this.selectedDate,
            deliveryTime: this.deliveryTime,
            paymentMethod: this.paymentMethod
          })
        .then((response) => {
          console.log(response.data)
          this.formReset()
          this.$router.push('/top')
        })
        .catch(err => {
          console.log(err)
        })
      },
      formReset: function () {
        this.$refs.form.reset()
      }
    },
    created() {
       axios.get('http://localhost:8080/showShoppingCart')
        .then((response) => {
          this.items = response.data[0].orderItemList
      })
      this.selectedDate = new Date().toISOString().substr(0, 10);
    },
}
</script>

<style scoped>
  .box {
    border: dotted 2px black;
    width: 500px;
  }
  h1 {
    font-family: 'Bradley Hand',sans-serif;
    font-size: 80px;
    text-align: center;
  }
</style>