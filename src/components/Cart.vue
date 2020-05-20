<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="500"
      v-for="item in items" :key="item.id"
    >
      <v-img
        :src="require('@/assets/images/' + item.item.imagePath)"
      ></v-img>

      <v-card-title>
        {{ item.item.name }}
      </v-card-title>

      <v-spacer></v-spacer>

    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card-title>
            サイズ : {{ item.size }}<br>
            数量 : {{ item.quantity + "個" }}<br>
            合計: {{ item.subTotal.toLocaleString() + "円" }}
          </v-card-title>
        </v-col>
      </v-row>
    </v-container>

      <v-card-actions>

        <v-btn
          color="purple"
          text
          @click="deleteItem(item)"
        >
          削除
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          icon
          @click="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-subtitle>トッピング</v-card-subtitle>
          <v-card-text v-for="(orderTopping, i) in item.orderToppingList" :key="i">
            {{ orderTopping.topping.name }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      items:{},
      show:false,
      cart:[]
    }
  },
  created() {
    axios.get('http://localhost:8080/showShoppingCart')
    .then((response) => {
      this.items = response.data[0].orderItemList
    })
  },
  methods : {
    toProcedure() {
      this.$router.push( 
        { name : 'PurchaseForm' , params :  { totalPrice : this.totalPrice }
      })
    },
    deleteItem(item) {
      axios.post('http://localhost:8080/delete', {
        itemId: item.itemId
      })
      var items = this.items
      var index = items.indexOf(item)
      items.splice(index,1)
    }
  },
}
</script>