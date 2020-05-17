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

      <v-card-text>
        <v-chip-group
          active-class="deep-purple accent-4 white--text"
          column
          v-model="size"
          >

          <v-chip value="M">{{ "[M]" + item.priceM.toLocaleString() + "円(税抜)" }}</v-chip>

          <v-chip value="L">{{ "[L]" + item.priceL.toLocaleString() + "円(税抜)" }}</v-chip>

        </v-chip-group>
      </v-card-text>

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
          item-value="id"
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      toppingList:[],
      item:[],
      selected:[],
      quantities: [1,2,3,4,5,6,7,8,9,10],
      size:"M",
      quantity:"1",
      cart:[]
    }
  },
  created() {
    this.item = this.$store.state.itemList.filter(
      (elm) => elm.id === this.$route.params.itemId);
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
    ...mapActions(['setCart']),
    addItem() {
      this.$router.push('/cart')
      this.setCart({
          name: this.item[0].name,
          itemId: this.item[0].id,
          quantity: this.quantity,
          size: this.size,
          toppingList: this.selected,
          imagePath: this.item[0].imagePath,
          totalPrice: this.totalPrice,
      })
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