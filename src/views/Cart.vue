<template>
  <div>
    <Cart/>
    <v-btn @click="toProcedure()">ご購入手続き</v-btn>
  </div>
</template>

<script>
import Cart from "@/components/Cart.vue";
export default {
  components: {
    Cart
  },
  methods: {
    toProcedure() {
      this.$router.push('/purchaseForm')
    },
  }
}
</script>