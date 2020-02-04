<template>
    <v-img
      src="https://www.agnigroup.com.np/templates/yootheme/cache/banner5-c0033a11.webp"
      aspect-ratio="2.3"
    >
      <v-container class="pt-12 mt-12">
      <v-card class="pa-3">
        <v-col class="font-weight-bold title text-center">
          Automotive Spares Center
        </v-col>
        <v-row>
          <v-col>
            <div>Our Brands</div>
            <v-row>
              <v-col v-for="index in 4" :key="index">
                Ferrari
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <div>
              Login With Email
            </div>
            <div>
              <v-text-field
                v-model="username"
                label="Username"
                flat
                prepend-inner-icon="mdi-account"
              ></v-text-field>
              <v-text-field
                v-model="password"
                type="password"
                flat
                label="Password"
                prepend-inner-icon="mdi-lock"
                append-icon="mdi-eye"
              ></v-text-field>
              <v-row align="center">
                <v-col>
                  <v-btn color="red darken-1" class="white--text" @click="login">
                    Login
                  </v-btn>

                </v-col>
                <v-col>
                  <v-checkbox
                    label="Remember Me"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-card>
  </v-container>
    </v-img>

</template>
<script>
  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login () {
        const dataToPost = {
          email: this.username,
          password: this.password
        }
        this.$auth.loginWith('local', {data: dataToPost} )
        .then(()=> {
          this.setNotifyMessage("Successfully Login. Enjoy Shopping.")
        })
        .catch((error)=> {
          this.setNotifyMessage(error.response.data.message, 'red')
        })
      }
    }
  }
</script>
