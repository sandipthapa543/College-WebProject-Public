<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pt-0">
        <v-row justify="center" align="center">
          <v-col md="6">
            <div class="font-weight-bold title">{{ title }}</div>
          </v-col>
          <v-col cols="6" class="text-right">
            <v-btn class="white--text text-capitalize" color="light-green lighten-1">View all</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col v-for="(item, index) in productList" :key="index" md="3" sm="12">
            <v-hover
              v-slot="{hover}"
            >
              <v-card
                :flat="!hover"
                class="mx-auto"
                max-width="300"
              >
                <v-img
                  class="white--text align-end"
                  height="200px"
                  :src="$options.BASE_URL + `/${item.productImage[0]}`"
                >
                  <v-row>
                    <v-col>
                      <v-btn icon @click="addToCart(item)">
                        <v-icon v-text="'mdi-cart'"></v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-img>

                <v-card-text class="text--primary">
                  <div class="body-2">
                    {{ item.productName }}
                    <span>
                          ({{item.productDescription.substring(0, 18) + '...'}})
                        </span>
                  </div>

                  <div class="font-weight-bold body-1">{{ item.productPrice }}</div>
                  <v-rating
                    small
                    :value="3"
                  >
                  </v-rating>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import { mapMutations } from 'vuex'
  export default {
    props: ['title'],
    data () {
      return {
        productList: []
      }
    },
    created() {
     this.getProducts()
    },
    methods: {
      ...mapMutations({
        setCart: 'setCartDetails'
      }),
      getProducts ()  {
        this.$axios.$get('product')
        .then((response)=> {
          this.productList = response.result
        })
      },
      addToCart (detail) {
        if(this.$auth.loggedIn) {
          let dataToPost = {
            product: detail._id,
            user: this.$auth.user._id,
            status: 'Cart'
          }
          this.$axios.$post('cart', dataToPost)
            .then(()=> {
              this.setNotifyMessage("Successfully added product.")
              this.setCartDetails()
            })
            .catch(()=> {
              this.setNotifyMessage("Something went wrong.")
            })
        } else {
          this.setNotifyMessage("Please Login first to add product.")
          this.$router.push('/account/login')
        }


      },
      setCartDetails () {
        this.$axios.$get(`cart?userId=${this.$auth.user._id}`)
        .then((response) => {
          this.setCart(response.result)
        })
      }
    }



  }
</script>
