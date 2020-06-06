<template>
<v-app>
  <Header/>
  <SideNav/>
  <router-view></router-view>
</v-app>
</template>

<script>
import Header from '@/components/Header'
import SideNav from '@/components/SideNav'

export default {
  data() {
    return {
    }
  },
  components : {
    Header,
    SideNav
  },
}
</script>