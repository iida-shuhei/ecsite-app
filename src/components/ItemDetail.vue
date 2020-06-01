<template>
  <v-container>
    <v-card
      class="mx-auto my-12"
      max-width="500"
      v-for="item in item" :key="item.id"
    >

      <v-img
        :src="require('@/assets/images/' + item.imagePath)"
      ></v-img>

      <v-card-title>{{ item.name }}</v-card-title>

      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
        </v-row>
        <div>{{ item.description }}</div>
      </v-card-text>

      <v-card-actions>

          <b-col>
            <b-form-radio v-model="size" value="M">M {{ item.priceM.toLocaleString() + "円(税抜)" }}</b-form-radio>
          </b-col>
          <b-col>
            <b-form-radio v-model="size" value="L">L {{ item.priceL.toLocaleString() + "円(税抜)" }}</b-form-radio>
          </b-col>

      </v-card-actions>

      <v-divider class="mx-4"></v-divider>

      <v-card-text>トッピング： 1つにつき  М   200円(税抜)  Ｌ  300円(税抜)</v-card-text>
      
      <v-container fluid>
      <v-row align="center">
        <v-col cols="6">
            <v-subheader>トッピングを選択</v-subheader>
        </v-col>
        <v-col cols="12" sm="6">
        <v-select
          v-model="selected"
          item-text="name"
          item-value="item"
          :items="item.toppingList"
          multiple
          return-object
        />
        </v-col>
      </v-row>
      </v-container>

      <v-container fluid>
        <v-row align="center">
          <v-col cols="6">
            <v-subheader>数量を選択</v-subheader>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="quantity"
              :items="quantities"
              menu-props="auto"
              label="1"
              single-line
            ></v-select>
          </v-col>
        </v-row>
      </v-container>

      <v-divider class="mx-4"></v-divider>

      <v-container fluid>
      <v-row align="center">
        <v-col cols="6">
          <v-subheader>商品の金額</v-subheader>
        </v-col>
        <v-col cols="6">
          <v-card-title v-model="totalPrice">{{ totalPrice.toLocaleString() + "円(税抜)" }}</v-card-title>
        </v-col>
      </v-row>
      </v-container>

      <v-card-actions>
        <v-btn
          color="red"
          width="480"
          @click="addItem()"
        >
        <span class="cart">商品をかごに追加</span>
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      toppingList:[],
      item:[],
      selected:[],
      quantities: [1,2,3,4,5,6,7,8,9,10],
      size:"M",
      quantity:"1",
      orderTopping: []
    }
  },
  created() {
    this.item = this.$store.state.itemList.filter(
      (elm) => elm.id === JSON.parse(decodeURIComponent(this.$route.query.itemId)))
  },
  computed: {
    totalPrice: function() {
      var toppingCount = this.selected.length
      var toppingPrice = null
      if(this.size == 'M') {
        toppingPrice = toppingCount * 200
        return  (this.item[0].priceM + toppingPrice) * this.quantity
      } else if (this.size == 'L') {
        toppingPrice = toppingCount * 300
        return (this.item[0].priceL + toppingPrice) * this.quantity
      }
      return 0
    }
  },
  methods: {
    ...mapActions([
      "setShoppingCart"
    ]),
    addItem() {
      var orderToppingId = []
      for(var num in this.selected) {
        orderToppingId.push(this.selected[num].id)
      }
      this.orderTopping = orderToppingId
      axios.post('http://localhost:8080/add', {
        itemId: this.item[0].id,
        quantity: this.quantity,
        size: this.size,
        orderTopping: this.orderTopping,
        subTotal: this.totalPrice
      })
      this.setShoppingCart(this.item[0].id)
      this.$router.push('/')
      alert('カートに追加しました')
    },
  }
}
</script>

<style scoped>
  .name {
    font-size: 12px;
  }
  .cart {
    color: white;
    font-weight: bold;
    font-size: 15px;
  }
</style>