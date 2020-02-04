<template>
  <v-app light>
    <v-app-bar
      color="red darken-4 lighten-1"
      dark
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
        <v-list>
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
              :content="cartDetails.length"
            >
            <div
              class="mx-3"
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
            <v-card-text>
              <v-row v-if="cartDetails && cartDetails.length">
                <v-col
                  v-for="(product, index) in cartDetails" :key="index"
                >
                  {{ product }}
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col class="text-center">
                  No any Product added.
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

      </v-menu>
    </v-app-bar>
    <div class="mt-11">
      <nuxt />
      <vue-snackbar></vue-snackbar>
    </div>
    {{ cartDetails }}
    <v-footer class="grey darken-3">
      <span>&copy; 2019 eCresson</span>
    </v-footer>
  </v-app>
</template>

<script>
  import VueSnackbar from "../components/LayoutUtils/VueSnackbar";
  import { mapGetters, mapMutations } from "vuex"
  export default {
    components: {VueSnackbar},
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
            this.setCartDetails(response.result || [])
          })
      }
    }
  }
</script>
