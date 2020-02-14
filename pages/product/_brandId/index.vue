<template>
  <v-card class="mt-5">
    <v-card-title>
      Product List
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="selectedBrand"
                :items="brandList"
                label="Filter by Brand"
                item-value="_id"
                item-text="brandName"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="auto">
          <v-divider vertical></v-divider>
        </v-col>
        <v-col>
          <v-row>
            <v-col cols="12" class="indigo--text font-weight-bold title">
              All Products
            </v-col>
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
                    :src="'http://localhost:9000/static/' + `${item.productImage}`"
                  >
                    <v-row v-if="hover">
                      <v-col class="text-right mx-2">

                      </v-col>
                    </v-row>
                  </v-img>

                  <v-card-text class="py-0 text--primary">
                    <v-row align="center">
                      <v-col class="py-0" cols="9">
                        <div class="body-2">
                          {{ item.productName }}
                          <span>
                          ({{item.productDescription.substring(0, 18) + '...'}})
                        </span>
                        </div>
                      </v-col>
                      <v-col class="py-0">
                        <v-tooltip bottom>
                          <template
                            v-slot:activator="{on}"
                          >
                            <v-btn v-on="on" icon @click="addToCart(item)">
                              <v-icon v-text="'mdi-cart'"></v-icon>
                            </v-btn>
                          </template>
                          <span>Add to Cart</span>
                        </v-tooltip>
                      </v-col>
                    </v-row>


                    <div class="font-weight-bold body-1">{{ item.productPrice }}</div>
                    <v-rating
                      small
                      dense
                      :value="3"
                    >
                    </v-rating>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
            <v-col v-if="!productList.length " class="text-center">
              <v-icon size="100" v-text="'mdi-cancel'"></v-icon>
              <div class="font-weight-bold title">
                No data Available
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    props: ['title'],
    data () {
      return {
        productList: [],
        selectedBrand: '',
        brandList: []
      }
    },
    computed: {
      ...mapGetters({
        searchName: 'getSearchName'
      }),
      queryParams () {
        return {
          brand: this.selectedBrand,
          price: this.selectedPrice,
          search: this.searchName
        }
      }
    },
    watch: {
      queryParams () {
        this.getProducts()
      }
    },
    created() {
      this.selectedBrand = this.$route.params.brandId
      this.getBrandDetail()
      this.$nextTick(()=> {
        this.getProducts()
      })
    },
    methods: {
      ...mapMutations({
        setCart: 'setCartDetails'
      }),
      getProducts ()  {
        this.$axios.$get(`product/`, {params: this.queryParams})
          .then((response)=> {
            this.productList = response.result
          })
      },
      getBrandDetail () {
        this.$axios.$get(`brand`)
        .then((response)=> {
          this.brandList = response
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
            this.setCart(response)
          })
      }
    }



  }
</script>
