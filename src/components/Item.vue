<template>
  <v-container class="box">
    <v-row>
      <v-col cols=4 v-for="item in this.$store.state.itemList" :key="item.id">
        <router-link 
          :to="{ 
          name: 'ItemDetail', 
          query: { itemId: encodeURIComponent(JSON.stringify(item.id)) }}"
          class="link"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              class="mx-auto"
              max-width="400"
              :elevation="hover ? 16 : 2"
            >

              <v-img
                :src="require('@/assets/images/' + item.imagePath)"
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
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
    }
  },
  created() {
    axios.get("/item/showItems")
      .then((response) => {
        this.setItemList(response.data)
      });
  },
  methods: {
    ...mapActions([
      "setItemList"
    ]),
  }
}
</script>

<style scoped>
  .link {
    text-decoration: none;
  }
</style>