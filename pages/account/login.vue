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
              <v-img src="/car.png" height="300"  width="100">
              </v-img>
            </v-row>
          </v-col>
          <v-col>
            <div>
              Login With Email
            </div>
            <div>
              <v-form
              v-model="valid"
              ref="form">
              <v-text-field
                v-model="username"
                label="Username"
                :rules="emailRules"
                flat
                prepend-inner-icon="mdi-account"
              ></v-text-field>
              <v-text-field
                v-model="password"
                type="password"
                flat
                :rules="passwordRules"
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
              </v-form>
            </div>
          </v-col>
        </v-row>
      </v-card>
  </v-container>
    </v-img>

</template>
<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        valid: true,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length < 10 || 'Password must contain 10 characters',
        ],
        photo: [
          {
            src: 'image.jpg'},
          {
            src: 'banner.jpg'},
          {src:
              'bannerslider.png'},


        ],


      }
    },
    methods: {
      login() {
        const dataToPost = {
          email: this.username,
          password: this.password
        }


        if (this.$refs.form.validate()) {
          this.$auth.loginWith('local', {data: dataToPost})
            .then(() => {
              this.setNotifyMessage("Successfully Login. Enjoy Shopping.")
            })
            .catch((error) => {
              this.setNotifyMessage(error.response.data.message, 'red')
            })
        }
      }
    }
  }
</script>
