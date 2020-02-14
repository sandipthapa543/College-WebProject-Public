<template>
  <v-container>
    <v-row class="mt-12">
      <v-col cols="12" class="ma-3">
        <v-card flat class="mx-9 pa-5">
          <v-row>
            <v-col cols="12" class="body-2 blue--text">Paper > Gift</v-col>
            <v-col cols="8" class="wrap"  style="overflow: hidden">
              <v-row>
                <v-col>
                  <v-hover
                    v-slot="{hover}"
                  >
                    <v-img
                      :src="`http://localhost:9000/static/${productDetail.productImage}`"
                      contain
                      height="400"
                      @mouseenter="manageScale"
                    ></v-img>
                  </v-hover>
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-col v-for="(image, index) in similarImage" :key="detail" cols="2" @click="mainImage = similarImage[detail]">
                  <v-img
                    :src="image"
                    contain
                    height="100"
                    width="100"
                    aspect-ratio="1.4"
                  ></v-img>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <div class="font-weight-bold title">{{ productDetail.productName }}</div>
              <div class="font-weight-bold">Nrs. {{ productDetail.productPrice}}</div>
              <v-row align="center">
                <v-col cols="4">
                  <v-text-field
                    type="number"
                    min="0"
                    class="mt-0 pt-0"
                    placeholder="Quantity"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="text-right">
                  <div class="mb-1">
                    <v-btn depressed color="orange darken-2" block class="white--text">Buy Now</v-btn>
                  </div>
                  <div>
                    <v-btn depressed color="red darken-1" block class="white--text">Add to cart</v-btn>
                  </div>
                </v-col>

              </v-row>
              <v-col>
                <div>
                  <b>Shipping</b>
                  <div class="grey--text body-1">This ordered goods will be shipped by DHL, FedEx using express shipping method.</div>
                </div>
                <div>
                  <b>Share with your friends</b>
                  <div>
                    <v-row>
                      <v-col
                        v-for="index in 3"
                        :key="detail"
                        cols="auto"
                      >
                        <v-hover
                          v-slot="{hover}"
                        >
                          <v-icon
                            :color="hover ? 'blue' : ''"
                            v-text="'mdi-facebook'"
                          ></v-icon>
                        </v-hover>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        productDetail: {},
        similarImage: [
          '/image/product2.jpg',
          '/image/product1.jpg',
          '/image/product4.jpg',
          '/image/product2.jpg'
        ],
        mainImage: '/image/product1.jpg',
        tab: null,
        tabTitle: ['Description', 'Shipping'],
        text: 'This is description'

      }
    },
    created() {
      this.getProductDetails()
    },
    methods: {
      getProductDetails () {
        this.$axios.$get(`product/${this.$route.params._id}`)
        .then((response)=> {
          this.productDetail = response
        })
      }
    }
  }
</script>
<style>
  .zoom {
    transform: scale(1.2);
    transition-delay: 0.5s;
  }
</style>
