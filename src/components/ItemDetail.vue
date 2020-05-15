<template>
  <v-container>
    <v-card
      class="mx-auto my-12"
      max-width="500"
    >

      <v-img
        :src="require('@/assets/images/' + item[0].imagePath)"
      ></v-img>

      <v-card-title>{{ item[0].name }}</v-card-title>

      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
        </v-row>
        <div>{{ item[0].description }}</div>
      </v-card-text>

      <v-card-text>
        <v-chip-group
          active-class="deep-purple accent-4 white--text"
          column
          v-model="size"
          >

          <v-chip>{{ "[M]" + item[0].priceM.toLocaleString() + "円(税抜)" }}</v-chip>

          <v-chip>{{ "[L]" + item[0].priceL.toLocaleString() + "円(税抜)" }}</v-chip>

        </v-chip-group>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-text>トッピング： 1つにつき  М   200円(税抜)  Ｌ  300円(税抜)</v-card-text>
      
      <v-container fluid>
      <v-row align="center">
        <v-col cols="6" v-for="(topping, i) in toppingList" :key="topping.id">
          <input
            :id="'topping.id' + i"
            type="checkbox"
            :value="topping.id"
            v-model="selected"
          >
          <label :for="'topping.id' + i">
            <v-card-text class="name">{{topping.name}}</v-card-text>
          </label>
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
          <v-subheader v-model="totalPrice">{{ totalPrice.toLocaleString() + "円(税抜)" }}</v-subheader>
        </v-col>
      </v-row>
      </v-container>

      <v-card-actions>
        <v-btn
          color="red"
          width="240"
          @click="addItem()"
        >
        <span class="cart">商品をかごに追加</span>
        </v-btn>
        <v-btn
          color="red"
          width="240"
        >
        <span class="cart">ご購入手続きへ</span>
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      toppingList:[],
      item:[],
      selected:[],
      quantities: [1,2,3,4,5,6,7,8,9,10],
      size:0,
      quantity:"1",
      cart:[]
    }
  },
  created() {
    axios.get("http://localhost:8080/topping/show")
      .then((response) => {
        this.toppingList = response.data
      });
    var item = this.$store.state.itemList.filter(
      (elm) => elm.id === this.$route.params.itemId
    );
    this.item = item
  },
  computed: {
    totalPrice: function() {
      var toppingCount = this.selected.length
      var toppingPrice = null
      if(this.size == 0) {
        toppingPrice = toppingCount * 200
        return  (this.item[0].priceM + toppingPrice) * this.quantity
      } else if (this.size == 1) {
        toppingPrice = toppingCount * 300
        return (this.item[0].priceL + toppingPrice) * this.quantity
      }
      return this.sum
    }
  },
  methods: {
    addItem() {
      this.$router.push(
        { name: 'Cart',
          params: {
            name: this.item[0].name,
            itemId: this.item[0].id,
            quantity: this.quantity,
            size: this.size,
            toppings: this.selected,
            imagePath: this.item[0].imagePath,
            totalPrice: this.totalPrice,
        } }
      )
    }
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