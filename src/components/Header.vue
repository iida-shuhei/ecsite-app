<template>
  <b-navbar class="sticky-top header">
    <b-navbar-brand v-b-toggle.sidebar-backdrop class="ml-1 mr-5 display-1 font-weight-bold">
      <h2>Menu</h2>
    </b-navbar-brand>
    <div class="title">
      <router-link to="/top">
        <b-navbar-brand class="ml-1 mr-5 display-1 font-weight-bold">
            <h2>PizzaHouse</h2>
        </b-navbar-brand>
      </router-link>
    </div>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    toPage(path) {
      this.$router.push(path);
    },
  },
  components: {
  },

  data() {
    return {
      
    }
  } 
};
</script>

<style scoped>
  h2 {
    font-family: 'Bradley Hand',sans-serif;
    color:white;
  }
  .header {
    background: #1f1e1c;
    opacity: 0.8;
    z-index: 1;
    text-align: center;
  }
  .title {
    position: absolute;
    top: 50%; /*親要素を起点に上から50%*/
    left: 50%;  /*親要素を起点に左から50%*/
    transform: translateY(-50%) translateX(-50%); 
  }
</style>