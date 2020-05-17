<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="500"
      v-for="item in items" :key="item.id"
    >
      <v-img
        :src="require('@/assets/images/' + item.imagePath)"
        height="200px"
      ></v-img>

      <v-card-title>
        {{ item.name }}
      </v-card-title>

      <v-spacer></v-spacer>

    <v-container>
      <v-row>
      <v-col cols="12">
        <v-card-title>
          サイズ : {{ item.size }}<br>
          数量 : {{ item.quantity + "個" }}<br>
          合計: {{ item.totalPrice.toLocaleString() + "円"  }}
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
          <v-card-text v-for="(topping, i) in item.toppingList" :key="i">
            {{ topping.name }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
    <!-- {{ totalWithoutTax.toLocaleString() + "円(税抜)" }}
    {{ totalTax.toLocaleString() + "円(消費税)" }}
    {{ totalPrice.toLocaleString() + "円(税込)" }} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      items:{},
      show:false,
    }
  },
  created() {
    this.items = this.$store.state.cart
  },
  // computed: {
  //   totalWithoutTax : function() {
  //     var totalWithoutTax = 0
  //     for( var num in this.items ) {
  //       totalWithoutTax += this.items[num].totalPrice
  //     }
  //     return totalWithoutTax
  //   },
  //   totalTax : function() {
  //     var totalWithoutTax = 0
  //     for( var num in this.items ) {
  //       totalWithoutTax += this.items[num].totalPrice
  //     }
  //     return totalWithoutTax * 0.1
  //   },
  //   totalPrice : function() {
  //     var totalWithoutTax = 0
  //     for( var num in this.items ) {
  //       totalWithoutTax += this.items[num].totalPrice
  //     }
  //     return totalWithoutTax + (totalWithoutTax * 0.1)
  //   }
  // },
  methods : {
    toProcedure() {
      this.$router.push( 
        { name : 'PurchaseForm' , params :  { totalPrice : this.totalPrice }
      })
    },
    deleteItem(item) {
      var items = this.items
      var index = items.indexOf(item)
      items.splice(index,1)
    }
  },
}
</script>