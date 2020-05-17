<template>
  <v-menu v-model="menu" offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn icon color="primary" dark elevation="0" v-on="on">
        <v-icon>mdi-calendar</v-icon>
      </v-btn>
    </template>
    <v-date-picker v-model="picker" @click="menu = false" :allowed-dates="allowedDate"/>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: new Date().toISOString().substr(0, 10)
    }
  },
  data() {
    return {
      menu: false
    };
  },
  computed: {
    picker: {
      get() {
        return this.value;
      },
      set(val) {
        this.menu = false;
        this.$emit("input", val);
      }
    }
  },
  methods: {
    allowedDate: function (val) {
      // 今日～100日後までを選べるようにする
      let today = new Date() 
      today = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      )
      let maxAllowedDay = new Date()
      maxAllowedDay.setDate(
        today.getDate() + 20
      )
      maxAllowedDay = new Date(
        maxAllowedDay.getFullYear(),
        maxAllowedDay.getMonth(),
        maxAllowedDay.getDate()
      )
      return today <= new Date(val)
        && new Date(val) <= maxAllowedDay
     },
  }
};
</script>