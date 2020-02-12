<template>
  <v-card class="mt-4">
    <v-card-title>
      Your whishlist
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="8">
          <v-row>
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
              v-for="(product, index) in cartDetails" :key="index"
              cols="12"
            >
              <cart-item
                :product-detail="product.product"
                :cart-id="product._id"
                min="1"
                :quantity="product.quantity"
                @change = "product.quantity = $event"
                @refresh="fetchCart()"
              ></cart-item>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-card>
            <v-card-title>
              Your Billing Info
            </v-card-title>
            <v-card-text>
              Deliver to mr <b>{{ $auth.user.first_Name + ' ' + $auth.user.last_Name }}</b>
              in <b>{{ $auth.user.address }}.</b>
              <div>
                Recorded Receiver Phone Number: <b>{{ $auth.user.phone }}</b>
              </div>
              <div>
                Total Price : <b>{{ 'NRs. ' + totalPrice }}</b>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-col class="text-center">
                <v-btn color="blue"  class="white--text text-capitalize" rounded @click="getOrders">
                  Place a Order
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
  import { mapGetters, mapMutations } from "vuex"
  import CartItem from "../../components/HomePage/CartItem";

  export default {
    components: {CartItem },
    data () {
      return {
        productPriceList: []
      }
    },
    computed: {
      ...mapGetters({
        cartDetails: 'getCartDetails'
      }),
      totalPrice () {
        return this.productPriceList.length ? this.productPriceList.reduce((x,y)=> x + y) : 'N/A'
      }
    },
    created() {
      this.fetchCart()
    },
    methods: {
      ...mapMutations({
        setCartDetails: 'setCartDetails'
      }),
       unique  (value, index, self) {
        return self.indexOf(value.product._id) === index
      },
      fetchCart () {
        this.$axios.$get(`cart?status=Cart&userId=${this.$auth.user._id}`)
          .then((response) => {
            let cartDetails = [...new Set(response)]
            this.setCartDetails([...cartDetails] || [])
            this.productPriceList = response.map(x => x.product.productPrice) || []
          })
      },
      checkoutProduct (cartId) {
        this.$axios.$put(`cart/${cartId}`, {status: 'Checkout'})
      },
      getOrders () {
        this.cartDetails.forEach(x => {
          this.checkoutProduct(x._id)
          this.$nextTick(()=> {
            this.fetchCart()
            this.setNotifyMessage({message: 'Successfully checkout.', color: 'green'})
            this.$router.push('/my/orders')
          })
        })
      }
    }
  }
</script>
