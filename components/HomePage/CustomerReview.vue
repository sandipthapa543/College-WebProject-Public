<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" class="text-center title font-weight-bold">Happy Customer</v-col>
      <v-col md="6" sm="12">
        <div>Happy Customers</div>
        <div>What customer has to say!</div>
      </v-col>
      <v-col md="6" sm="12" class="">
        <v-carousel
          height="120"
          :show-arrows="false"
          hide-delimiter-background
        >
          <v-carousel-item>
            <v-card class="pa-3">
              <div>Sandip Thapa</div>
              <div>On 24th December</div>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>
