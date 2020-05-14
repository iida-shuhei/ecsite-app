<template>
  <v-container>
    <v-card
      class="mx-auto my-12"
      max-width="500"
      v-for="item in itemList" :key="item.id"
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

      <v-card-text>
        <v-chip-group
          active-class="deep-purple accent-4 white--text"
          column>

          <v-chip>{{ "[M]" + item.priceM.toLocaleString() + "円(税抜)" }}</v-chip>

          <v-chip>{{ "[L]" + item.priceL.toLocaleString() + "円(税抜)" }}</v-chip>

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
            :value="topping.name"
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
              v-model="e1"
              :items="quantity"
              menu-props="auto"
              label="Select"
              hide-details
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
          1000円(税抜)
        </v-col>
      </v-row>
      </v-container>

      <v-card-actions>
        <v-btn
          color="red"
          width="240"
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
      itemList:[],
      selected:[],
      quantity: [1,2,3,4,5,6,7,8,9,10]
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
    this.itemList = item
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