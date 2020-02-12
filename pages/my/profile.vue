<template>
  <v-container>
    <v-card class="mt-8">
      <v-card-title>
        {{ `${userDetail.first_Name}  ${userDetail.last_Name}`}}
        <v-icon left v-text="'mdi-pencil'" @click="openProfileEditForm = true" />
        <v-spacer>
        </v-spacer>
        <v-btn
          depressed
          text
          color="indigo"
          @click="$router.push(`/my/orders`)"
        >
          My orders
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-col class="font-weight-bold subtitle py-0 blue-grey--text">
              <v-icon left v-text="'mdi-account'" />
              Personal Details
            </v-col>
            <v-row>
              <v-col cols="6">
                <v-row align="center">
                  <v-col cols="auto">
                    <v-icon v-text="'mdi-phone'" />
                  </v-col>
                  <v-col cols="auto">
                    <div class="grey--text">
                      Phone
                    </div>
                    <div class="blue-grey--text">
                      {{ userDetail.phone }}
                    </div>
                  </v-col>
                  <v-col />
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row align="center">
                  <v-col cols="auto">
                    <v-icon v-text="'mdi-message'" />
                  </v-col>
                  <v-col cols="auto">
                    <div class="grey--text">
                      Email
                    </div>
                    <div class="blue-grey--text">
                      {{ userDetail.email }}
                    </div>
                  </v-col>
                  <v-col />
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row align="center">
                  <v-col cols="auto">
                    <v-icon v-text="'mdi-map'" />
                  </v-col>
                  <v-col cols="auto">
                    <div class="grey--text">
                      Address
                    </div>
                    <div class="blue-grey--text">
                      {{ userDetail.address }}
                    </div>
                  </v-col>
                  <v-col />
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-dialog
        v-model="openProfileEditForm"
        width="960"
        scrollable
        persistent
        @keypress.esc="openProfileEditForm = false"
      >
        <add-new-user
          :title="'Update Your Details'"
          @close="openProfileEditForm = false, getUserDetail()"
        />
      </v-dialog>
    </v-card>
  </v-container>
</template>
<script>
  import AddNewUser from "../../components/AddNewUser"
  export default {
    components: { AddNewUser },
    data() {
      return {
        openProfileEditForm: false,
        userDetail: {}
      }
    },
    created() {
      this.getUserDetail()
    },
    methods: {
      getUserDetail() {
        this.$axios.$get(`users/me`)
        .then((response)=> {
          this.userDetail = response
        })
      }
    }
  }
</script>
