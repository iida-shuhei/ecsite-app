<template>
  <v-container>
      <v-row cols="4">
        <v-col v-for="item in this.$store.state.itemList" :key="item.id">
          <router-link :to="{ name: 'ItemDetail', params : { itemId: item.id }}" class="link">
            <v-hover v-slot:default="{ hover }">
              <v-card
                max-width="344"
                class="mx-auto"
                :elevation="hover ? 16 : 2"
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
    axios.get("http://localhost:8080/item/showItems")
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