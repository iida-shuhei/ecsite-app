<template>
  <v-card
    class="float-right"
    max-width="344"
    raised
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{ "税込 : " + totalPrice.toLocaleString() + "円" }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ "税抜 : " + totalWithoutTax.toLocaleString() + "円" }}<br>
          {{ "消費税 : " + totalTax.toLocaleString() + "円" }}
         </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
      >
      <v-icon x-large>mdi mdi-cart-outline</v-icon>
      </v-list-item-avatar>
    </v-list-item>

  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data(){
    return {
      items:[]
    }
  },

  created() {
    axios.get('http://localhost:8080/showShoppingCart')
    .then((response) => {
      this.items = response.data[0].orderItemList
    })
  },

  computed: {
    totalWithoutTax() {
      //税抜、消費税、税込を計算する
      var totalWithoutTax = 0
      for( var num in this.items) {
        totalWithoutTax += this.items[num].subTotal
      }
      return totalWithoutTax
    },
    totalTax() {
      //税抜、消費税、税込を計算する
      var totalWithoutTax = 0
      var totalTax = 0
      for( var num in this.items) {
        totalWithoutTax += this.items[num].subTotal
      }
        totalTax += totalWithoutTax * 0.1
        return totalTax
    },
    totalPrice() {
      //税抜、消費税、税込を計算する
      var totalWithoutTax = 0
      var totalTax = 0
      for( var num in this.items) {
        totalWithoutTax += this.items[num].subTotal
      }
        totalTax += totalWithoutTax * 0.1
        return totalWithoutTax + totalTax
    },
  }
}
</script>