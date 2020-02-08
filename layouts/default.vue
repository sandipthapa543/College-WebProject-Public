<template>
  <v-app light>
    <v-app-bar
      color="blue  lighten-1"
      dark
      flat
      app
    >
      <div>Ecresson</div>
      <v-spacer></v-spacer>
      <v-text-field
        class="mt-8"
        label="Search"
        solo
        flat
        rounded
        light
        append-icon="mdi-search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn v-if="!$auth.loggedIn"  text class="text-capitalize">Login</v-btn>
      <v-btn v-if="!$auth.loggedIn" text class="text-capitalize">Sign Up</v-btn>
      <v-menu
        v-if="$auth.loggedIn"
        bottom
        nudge-bottom="42"
      >
        <template
          v-slot:activator="{on}"
        >
          <div
            v-on="on"
          >
            {{ $auth.user.first_Name }}
          </div>
        </template>
        <v-list dense>
          <v-list-item @click="logout">
            <v-list-item-icon><v-icon>mdi-lock</v-icon></v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu
        left
        nudge-bottom="50"
      >
        <template
          v-slot:activator="{on}"
        >
            <v-badge
              color="green"
              class="mr-2"
              :content="cartDetails.length"
            >
            <div
              class="mx-2"
              v-on="on"
            >
              <v-icon
                v-text="'mdi-cart'"
              ></v-icon>
              Cart
            </div>
            </v-badge>
        </template>
          <v-card width="500">
            <v-card-title>
              Your Whishlist
            </v-card-title>
            <v-card-text style="height: 385px">
              <v-row v-if="cartDetails && cartDetails.length">
                <v-col  class="py-0">
                  <v-row align="center" justify="center">
                    <v-col cols="6">
                      Product Name
                    </v-col>
                    <v-col>
                      Quantity
                    </v-col>
                    <v-col>
                      Price
                    </v-col>
                    <v-col>
                      Actions
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  v-for="(product, index) in cartDetails.slice(0, 2)" :key="index"
                  cols="12"
                >
                <cart-item
                  :product-id="product.product"
                ></cart-item>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col class="text-center">
                  No any Product added.
                </v-col>
              </v-row>
              <v-row>
                  <v-col class="text-right py-0">
                    <v-btn text color="red darken-2" class="text-capitalize">Go To Cart</v-btn>
                    <v-btn depressed color="orange" class="white--text text-capitalize">
                      Checkout
                    </v-btn>
                  </v-col>
              </v-row>
            </v-card-text>
          </v-card>

      </v-menu>
    </v-app-bar>
    <div class="mt-8">
      <nuxt />
      <vue-snackbar></vue-snackbar>
    </div>
    <v-footer class="grey darken-3">
      <span>&copy; 2019 eCresson</span>
    </v-footer>
  </v-app>
</template>

<script>
  import VueSnackbar from "../components/LayoutUtils/VueSnackbar";
  import { mapGetters, mapMutations } from "vuex"
  import CartItem from "../components/HomePage/CartItem";
  export default {
    components: {CartItem, VueSnackbar},
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          {
            icon: 'mdi-apps',
            title: 'Welcome',
            to: '/'
          },
          {
            icon: 'mdi-chart-bubble',
            title: 'Inspire',
            to: '/inspire'
          }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    },
    computed: {
      ...mapGetters({
        cartDetails: 'getCartDetails'
      })
    },
    created() {
      if(this.$auth.loggedIn) {
        this.fetchCart()
      }
    },
    methods: {
      ...mapMutations({
        setCartDetails: 'setCartDetails'
      }),
      logout () {
        this.$auth.logout();
        this.setNotifyMessage("Successfully Logout.")
      },
      fetchCart () {
        this.$axios.$get(`cart?userId=${this.$auth.user._id}`)
          .then((response) => {
            let cartDetails = [ ...new Set(response.map((x) =>{
            return {
              product: x.product,
              cart: x.cart
            }
            } ))]
            this.setCartDetails(cartDetails || [])
          })
      }
    }
  }
</script>
