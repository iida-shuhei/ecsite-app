<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="500"
      v-for="item in items" :key="item.id"
    >
      <v-img
        :src="require('@/assets/images/' + item.item.imagePath)"
        height="200px"
      ></v-img>

      <v-card-title>
        {{ item.item.name }}
      </v-card-title>

      <v-spacer></v-spacer>

    <v-container>
      <v-row>
      <v-col cols="12">
        <v-card-title>
          サイズ : {{ item.item.size }}
          数量 : {{ item.item.quantity + "個" }}
          合計: {{ item.item.totalPrice.toLocaleString() + "円"  }}
        </v-card-title>
      </v-col>
      </v-row>
    </v-container>

      <v-card-actions>

        <v-btn
          color="purple"
          text
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
          <v-card-text v-for="topping in item.item.toppings" :key="topping.toppingId">
            {{topping}}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items:[],
      show:false
    }
  },
  created() {
    console.log(this.items)
    this.items.push(
        { item : {
          name: this.$route.params.name,
          itemId: this.$route.params.itemId,
          quantity: this.$route.params.quantity,
          size: this.$route.params.size,
          toppings: this.$route.params.toppings,
          imagePath: this.$route.params.imagePath,
          totalPrice: this.$route.params.totalPrice
        }
      }
    )
  }
}
</script>