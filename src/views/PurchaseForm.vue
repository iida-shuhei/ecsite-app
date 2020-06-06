<template>
  <div>
    <PurchaseItems></PurchaseItems>
    <PurchaseInputForm></PurchaseInputForm>
  </div>
</template>

<script>
import PurchaseInputForm from '@/components/PurchaseInputForm.vue'
import PurchaseItems from '@/components/PurchaseItems.vue'
export default {
  components: {
    PurchaseInputForm,
    PurchaseItems
  },
}
</script>