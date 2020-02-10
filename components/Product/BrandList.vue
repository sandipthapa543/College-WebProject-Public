<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pt-0">
        <v-row align="center">
          <v-col md="6">
            <div class="font-weight-bold title">{{ title }}</div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col v-for="(item, index) in brandList" :key="index" md="3" sm="12">
            <v-hover
              v-slot="{hover}"
            >
              <v-card
                :flat="!hover"
                class="mx-auto"
                max-width="300"
                @click="gotoProductPage(item._id)"
              >
                <v-img
                  class="white--text align-end"
                  height="200px"
                  aspect-ratio="1"
                  :src="'http://localhost:9000/static/' + `${item.brandImage}`"
                ></v-img>

                <v-card-text class="py-0 text--primary">
                  <v-row align="center" justify="around">
                    <v-col class="py-0 text-center">
                      <div class="title font-weight-bold">
                        {{ item.brandName }}
                      </div>
                    </v-col>
                  </v-row>
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
        brandList: []
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
        this.$axios.$get('brand/all')
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
          this.$axios.$post('cart/addto', dataToPost)
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
      },
      gotoProductPage (brandId) {
        this.$router.push(`/product/${brandId}`)
      }
    }



  }
</script>
