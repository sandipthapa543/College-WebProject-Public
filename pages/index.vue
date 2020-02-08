<template>
  <v-row>
    <v-col>
      <v-carousel
        cycle
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for=" i in 3"
          :key="i"
        >
          <v-img src="banner.jpg" aspect-ratio="1.7" contain  class=""></v-img>
        </v-carousel-item>
      </v-carousel>

    </v-col>
    <v-col cols="12" class="px-4">
      <brand-list
        :product-list="productList"
        title="All Brands"
      ></brand-list>
    </v-col>
    <v-col md="12" :class="'px-4 blue-grey lighten-5 pt-0'">
      <product-list
        :product-list="productList"
        title="Popular Products"
      ></product-list>
    </v-col>

    <v-col cols="12" class="text-center px-7">
      <v-row align="center" justify="center">
        <v-col cols="12" class="text-center font-weight-bold title">Who are we ?</v-col>
        <v-row align="center" justify="center">
          <v-col md="3" sm="12" v-for="index in 3" :key="index">
            <v-card
              flat
              class="grey lighten-5"
            >
              <v-col class="text-center">
                <v-icon v-text="'mdi-account'" size="80"></v-icon>
              </v-col>
              <v-card-text>
                <div class="body-2 font-weight-bold">Most Authentic Paper product.</div>
                <div>We are good at this.</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
  import Logo from '~/components/Logo.vue'
  import ProductList from "../components/Product/ProductList";
  import CustomerReview from '../components/HomePage/CustomerReview'
  import VuetifyLogo from '~/components/VuetifyLogo.vue'
  import BrandList from "../components/Product/BrandList";

  export default {
    components: {
      BrandList,
      Logo,
      VuetifyLogo,
      ProductList,
      CustomerReview
    },
    data () {
      return {
        productList: [
          {
            name: 'Gift box',
            price: 'Nrs 3000',
            image: '/image/product1.jpg',
            description: 'This is good paper product.'
          },
          {
            name: 'Envelope',
            price: 'Nrs 4000',
            image: '/image/product2.jpg',
            description: 'This is good paper product.'
          },
          {
            name: 'Gift box',
            price: 'Nrs 3000',
            image: '/image/product1.jpg',
            description: 'This is good paper product.'
          },
          {
            name: 'Envelope',
            price: 'Nrs 4000',
            image: '/image/product2.jpg',
            description: 'This is good paper product.'
          }

        ]
      }
    }
  }
</script>
