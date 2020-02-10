<template>
      <v-card class="pa-3">
            <v-card-title>
             Update Your Details
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="formValues.first_Name"
                label="First Name"
                flat
                prepend-inner-icon="mdi-account-box"
              ></v-text-field>
              <v-text-field
                v-model="formValues.last_Name"
                label="Last Name"
                flat
                prepend-inner-icon="mdi-account"
              ></v-text-field>

              <v-text-field
                v-model="formValues.email"
                type="email"
                label="Email"
                flat
                prepend-inner-icon="mdi-email"
              ></v-text-field>
              <v-text-field
                v-model="formValues.phone"
                single-line
                label="phone"
                flat
                prepend-inner-icon="mdi-phone"
              ></v-text-field>
              <v-text-field
                v-model="formValues.address"
                label="Address"
                flat
                prepend-inner-icon="mdi-home"
              ></v-text-field>
            </v-card-text>
        <v-card-actions>
            <v-col class="text-right">
              <v-btn color="red darken-1" class="white--text" @click="updateUser">
                Update
              </v-btn>
            </v-col>
        </v-card-actions>
  </v-card>
</template>
<script>
  export default {

    data () {
      return {
        formValues: {
          first_Name: '',
          last_Name:'',
          email:'',
          password: '',
          phone:'',
          address:''
        }
      }
    },
    created() {
      this.formValues = {...this.$auth.user}
    },
    methods: {
      updateUser () {
        const dataPost = {
          first_Name: this.formValues.first_Name,
          last_Name:this.formValues.last_Name,
          email: this.formValues.email,
          phone:this.formValues.phone,
          address:this.formValues.address
        }
        this.$axios.$put(`users/edit/${this.$auth.user._id}`,  dataPost )
          .then(()=> {
            this.$emit('close')
            this.setNotifyMessage({message: "Successfully Updated Details.", color: "green"})
          })
          .catch((error)=> {
            this.setNotifyMessage(error.response.data.message, 'red')
          })
      }
    }
  }
</script>

