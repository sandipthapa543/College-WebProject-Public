<template>
  <v-img
    src="https://www.agnigroup.com.np/templates/yootheme/cache/banner5-c0033a11.webp"
    aspect-ratio="2.3"
  >
    <v-container class="pt-12 mt-12">
      <v-card class="pa-3">
        <v-col class="font-weight-bold title text-center">
         Sign Up with Automotive Spares Center
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
              SignUp with us
            </div>
            <div>
              <v-text-field
                v-model="first_Name"
                label="First Name"
                flat
                prepend-inner-icon="mdi-account-box"
              ></v-text-field>
              <v-text-field
                v-model="last_Name"
                label="Last Name"
                flat
                prepend-inner-icon="mdi-account"
              ></v-text-field>

              <v-text-field
                v-model="email"
                type="email"
                label="Email"
                flat
                prepend-inner-icon="mdi-email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                type="password"
                flat
                label="Password"
                prepend-inner-icon="mdi-lock"
                append-icon="mdi-eye"
              ></v-text-field>
              <v-text-field
                v-model="phone"
                single-line
                label="phone"
                flat
                prepend-inner-icon="mdi-phone"
              ></v-text-field>
              <v-text-field
                v-model="address"
                label="Address"
                flat
                prepend-inner-icon="mdi-home"
              ></v-text-field>
              <v-row align="center">
                <v-col>
                  <v-btn color="red darken-1" class="white--text" @click="signup">
                    Sign Up
                  </v-btn>

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
        first_Name: '',
        last_Name:'',
        email:'',
        password: '',
        phone:'',
        address:''
      }
    },
    methods: {
      signup () {
        const dataPost = {
          first_Name: this.first_Name,
          last_Name:this.last_Name,
          email: this.email,
          password: this.password,
          phone:this.phone,
          address:this.address
        }
        this.$axios.$post('users/SignUp',  dataPost )
          .then(()=> {
            this.setNotifyMessage("Successfully Register. Enjoy Shopping.")
          })
          .catch((error)=> {
            this.setNotifyMessage(error.response.data.message, 'red')
          })
      }
    }
  }
</script>

