<template>
  <div>
    <b-container class="container">

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
        
        <v-snackbar
          v-model="snackBar.show"
          :color="snackBar.color"
          :timeout="3000"
          top
          class="font-weight-bold"
          >
          {{snackBar.message}}
        </v-snackbar>
      </v-form>
    </b-container>

    <v-content>
      <v-row justify="center">
        <v-col cols="8">
          <Date v-model="date"/>
          <span>配達希望日付 : {{ date }}</span>

          <div>配達希望時間 : 
          <vue-timepicker 
          hide-disabled-items 
          :hour-range="[[11, 22]]" 
          :minute-interval="30" 
          v-model="deliveryTime"
          placeholder="配達希望時間"
          hour-label="時"
          minute-label="分"
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

      <CalcTotal></CalcTotal>



    </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import { mapActions } from "vuex";
import axios from "axios";
export default {
  components : {
    
    VueTimepicker
  },
    data: () => ({
        name: '',
        email: '',
        zipcode: '',
        address: '',
        telephone: '',
        totalPrice: 0,
        orderItemList: [],
        orderToppingList:"",
        date: null,
        deliveryTime: '',
        paymentMethod: "1",
        contactFormValidation: {
        valid: false,
        nameRules: [v => !!v || 'タイトルは必須項目です'],
        emailRules: [v => !!v || 'メールは必須項目です'],
        zipcodeRules: [v => !!v || '郵便番号は必須項目です'],
        addressRules: [v => !!v || '住所は必須項目です'],
        telephoneRules: [v => !!v || '電話番号は必須項目です']
      },
      snackBar: {
        show: false,
        color: '',
        message: ''
      },
    }),
    methods: {
      search() {
        axios.get(`https://api.zipaddress.net/?zipcode=${this.zipcode}`)
        .then((response) => {
          this.address = response.data.data.address;
        })
      },

      ...mapActions(["setInformation"],),

      purchase: function () {

        if (this.$refs.form.validate()) {

          for(var num in this.$store.state.cart) {

            var orderItem = {

              itemId : "",
              quantity : "",
              size : "",
              orderToppingList: [] 

            } 

              orderItem.itemId = this.$store.state.cart[num].itemId
              orderItem.quantity = this.$store.state.cart[num].quantity
              orderItem.size = this.$store.state.cart[num].size

              for(var number in this.$store.state.cart[num].toppingList) {
                var toppingId = this.$store.state.cart[num].toppingList[number].id
                orderItem.orderToppingList.push(toppingId)
              }

              this.orderItemList.push(orderItem)

            }

            for(var i in this.orderItemList) {

            for(var n in this.orderItemList[i].orderToppingList) {

            axios.post("http://localhost:8080/purchase", {
              orderItemList: [{
                itemId: this.orderItemList[i].itemId,
                quantity: this.orderItemList[i].quantity,
                size: this.orderItemList[i].size,
                  orderToppingList: [{
                    toppingId: this.orderItemList[i].orderToppingList[n]
                  }]
              }],
                userId: this.$store.state.loginUser.id,
                destinationName: this.name,
                destinationEmail: this.email,
                destinationZipcode: this.zipcode,
                destinationAddress: this.address,
                destinationTel: this.telephone,
                totalPrice: this.totalPrice,
                deliveryDate: this.date,
                deliveryTime: this.deliveryTime,
                paymentMethod: this.paymentMethod
              })
            .then((response) => {
              console.log(response.data)
              this.formReset()
              this.showSnackBar(
                'success',
                '購入しました。'
              )
            })
            .catch(err => {
              this.showSnackBar(
                'error',
                '購入に失敗しました。時間をおいて再度お試しください。'
              )
              console.log(err)
            })
          }}
        }
      },
      showSnackBar: function (color, message) {
        this.snackBar.message = message
        this.snackBar.color = color
        this.snackBar.show = true
      },
      formReset: function () {
        this.$refs.form.reset()
      }
    },
    created() {

      console.log(this.deliveryTime)

      //税抜、消費税、税込を計算する
      var totalWithoutTax = 0
      var totalTax = 0
      for( var number in this.$store.state.cart) {
        totalWithoutTax += this.$store.state.cart[number].totalPrice
      }
        totalTax += totalWithoutTax * 0.1
        this.totalPrice = totalWithoutTax + totalTax


      for( var num in this.$store.state.category) {
        this.categories.push({
          categoryId: this.$store.state.category[num].categoryId,
          categoryName : this.$store.state.category[num].categoryName})
      }
    },
  }
</script>

<style scoped>
  .container {
    border: dotted 2px black;
    width: 500px;
  }
</style>