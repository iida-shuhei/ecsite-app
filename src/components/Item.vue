<template>
  <v-container class="bottom">
    <router-link to='/' class="link">
      <v-row cols="4">
        <v-col v-for="item in itemList" :key="item.id">
          <v-hover v-slot:default="{ hover }">
            <v-card
              max-width="344"
              class="mx-auto"
              :elevation="hover ? 16 : 2"
              @click="open"
            >
              <v-img
                :src="item.imagePath"
              ></v-img>
              
              <v-card-text>
                {{item.name}}
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-card-text>
            
              <v-card-actions>
                <v-card-text>
                  {{"[M]" + item.priceM.toLocaleString() + "円(税抜)"}}
                </v-card-text>

                <v-card-text>
                  {{"[L]" + item.priceL.toLocaleString() + "円(税抜)"}}
                </v-card-text>
              
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </router-link>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      itemList:[]
    }
  },
  created() {
    console.log('きたよ')
    axios.get("http://localhost:8080/item/showItems")
      .then((response) => {
        this.itemList = response.data
      });
  },
  methods: {
    return : {
      open() {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
  .link {
    text-decoration: none;
  }
</style>