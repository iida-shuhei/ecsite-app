<template>
  <div>
    <Cart></Cart>
    <PurchaseInputForm></PurchaseInputForm>
  </div>
</template>

<script>
import PurchaseInputForm from '@/components/PurchaseInputForm.vue'
import Cart from '@/components/Cart.vue'

export default {
  components: {
    PurchaseInputForm,
    Cart,
  },
}
</script>