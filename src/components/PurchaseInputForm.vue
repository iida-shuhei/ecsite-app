<template>
  <div>
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
        
      <v-text-field
        v-model="zipcode"
        :rules="contactFormValidation.zipcodeRules"
        label="郵便番号"
        required
      ></v-text-field>
      <b-button @click="search()">検索</b-button>
        
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
        
        <b-button
          :disabled="!contactFormValidation.valid"
          @click="purchase()"
          block
          large
          variant="dark"
          class="mt-4 font-weight-bold"
        >購入
        </b-button>

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
    </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
    data: () => ({
        name: '',
        email: '',
        zipcode: '',
        address: '',
        telephone: '',
        totalPrice: 0,
        orderItemList: [],
        orderToppingList:[],
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

              console.log(this.orderItemList[i].orderToppingList)

            axios.post("http://localhost:8080/purchase", {
              orderItemList: [{
                itemId: this.orderItemList[i].itemId,
                quantity: this.orderItemList[i].quantity,
                size: this.orderItemList[i].size,
                  orderToppingList: {
                    toppingId:this.orderItemList[i].orderToppingList
                  }
              }],
                destinationName: this.name,
                destinationEmail: this.email,
                destinationZipcode: this.zipcode,
                destinationAddress: this.address,
                destinationTel: this.telephone,
                totalPrice: this.totalPrice
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
          }
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