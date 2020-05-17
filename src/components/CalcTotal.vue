<template>
  <div>
    {{ totalWithoutTax.toLocaleString() + "円(税抜)" }}
    {{ totalTax.toLocaleString() + "円(消費税)" }}
    {{ totalPrice.toLocaleString() + "円(税込)" }}
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created() {
      this.items = this.$store.state.cart
    },
  computed: {
    totalWithoutTax : function() {
      var totalWithoutTax = 0
      for( var num in this.items ) {
        totalWithoutTax += this.items[num].totalPrice
      }
      return totalWithoutTax
    },
    totalTax : function() {
      var totalWithoutTax = 0
      for( var num in this.items ) {
        totalWithoutTax += this.items[num].totalPrice
      }
      return totalWithoutTax * 0.1
    },
    totalPrice : function() {
      var totalWithoutTax = 0
      for( var num in this.items ) {
        totalWithoutTax += this.items[num].totalPrice
      }
      return totalWithoutTax + (totalWithoutTax * 0.1)
    }
  },
}
</script>