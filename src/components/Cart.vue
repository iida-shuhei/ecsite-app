<template>
  <div>
    <div v-show="this.orderItem.length">
      <v-data-table
        :headers="headers"
        :items="itemList"
        class="card elevation-1 shopping"
        sort-desc
        hide-default-footer
        width="600px"
      >
        <template v-slot:item.imagePath="{ item }">
          <v-img
            :src="require('@/assets/images/' + item.imagePath)"
            max-width="200px"
          >
          </v-img>
        </template>
        <template v-slot:item.topping="{ item }">
          <div v-for="topping in item.topping" :key="topping.id">
            {{ topping.topping.name }}
          </div>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-fa
            :icon="['fas', 'trash-alt']"
            size="lg"
            @click="deleteItem(item)"
            color="#2075D2"
            class="trash"
          >
          </v-fa>
        </template>
      </v-data-table><br>
      
        <v-card
          class="mx-auto price"
          max-width="344"
          raised
        >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              {{ "税込 : " + totalPrice.toLocaleString() + "円" }}
            </v-list-item-title>
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

        <v-card-actions>
          <v-btn 
          @click="toProcedure()"
          color="red"
          width="240"><span class="cart">ご購入手続きへ</span></v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <div v-show="!this.orderItem.length" class="message">
      <v-card
          class="mx-auto message"
          max-width="500"
          raised
        >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              かごに商品が入っていません。
            </v-list-item-title>
            <v-list-item-subtitle>
              お買い物をお楽しみください。
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
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      orderItem:[],
      orderItemList:[],
      headers: [
        {
          value: "imagePath",
          text: "商品",
          sortable: true,
        },
        {
          value: "name",
          text: "商品名",
          sortable: true,
        },
        {
          value: "size",
          text: "サイズ",
          sortable: true,
        },
        {
          value: "quantity",
          text: "数量",
          sortable: true,
        },
        {
          value: "topping",
          text: "トッピング",
          sortable: true,
        },
        {
          value: "subTotal",
          text: "合計",
          sortable: true,
        },
        {
          value: "actions",
          text: "削除",
          sortable: true,
        },
      ],
    }
  },
  created() {
    axios.get('/showShoppingCart')
      .then((response) => {
        this.orderItem = response.data[0].orderItemList

        for(let num in this.orderItem) {
          this.orderItemList.push({
            imagePath:this.orderItem[num].item.imagePath,
            name: this.orderItem[num].item.name,
            size: this.orderItem[num].size,
            quantity: this.orderItem[num].quantity,
            subTotal: this.orderItem[num].subTotal,
            id: this.orderItem[num].id,
            topping: this.orderItem[num].orderToppingList
          })
        }
    })
  },
  computed: {
    itemList() {
      return this.orderItemList
    },
    totalWithoutTax() {
      //税抜、消費税、税込を計算する
      var totalWithoutTax = 0
      for( var num in this.itemList) {
        totalWithoutTax += this.itemList[num].subTotal
      }
      return totalWithoutTax
    },
    totalTax() {
      //税抜、消費税、税込を計算する
      var totalWithoutTax = 0
      var totalTax = 0
      for( var num in this.itemList) {
        totalWithoutTax += this.itemList[num].subTotal
      }
        totalTax += totalWithoutTax * 0.1
        return totalTax
    },
    totalPrice() {
      //税抜、消費税、税込を計算する
      var totalWithoutTax = 0
      var totalTax = 0
      for( var num in this.itemList) {
        totalWithoutTax += this.itemList[num].subTotal
      }
        totalTax += totalWithoutTax * 0.1
        return totalWithoutTax + totalTax
    },
  },
  methods : {
    toProcedure() {
      this.$router.push( 
        { name : 'PurchaseForm' , params :  { totalPrice : this.totalPrice }
      })
    },
    deleteItem(item) {
      axios.post('/delete', {
        itemId: item.id
      })
      var items = this.itemList
      var index = items.indexOf(item)
      items.splice(index,1)
    },
  },
}
</script>

<style scoped>
  .box {
    border-top: 2px solid;
    border-bottom: 2px solid;
  }
  .trash:hover {
    cursor: pointer;
  }
  .cart {
    color: white;
    font-weight: bold;
    font-size: 15px;
  }
  .message {
    margin-top: 100px;
  }
  .shopping {
    margin-top: 30px;
  }
  .price {
    text-align: center;
  }
</style>