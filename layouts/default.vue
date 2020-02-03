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
      <v-btn text class="text-capitalize">
        <v-icon
          v-text="'mdi-cart'"
        ></v-icon>
        Cart
      </v-btn>
    </v-app-bar>
    <div class="mt-11">
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
    methods: {
      logout () {
        this.$auth.logout();
        this.setNotifyMessage("Successfully Logout.")
      }
    }
  }
</script>
