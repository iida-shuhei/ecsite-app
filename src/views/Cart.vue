<template>
  <div>
    <Cart/>
  </div>
</template>

<script>
import Cart from "@/components/Cart.vue";
export default {
  components: {
    Cart,
  },
}
</script>

<style scoped>
  .cart {
    color: white;
    font-weight: bold;
    font-size: 15px;
  }
</style>