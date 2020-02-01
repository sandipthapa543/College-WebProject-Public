<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pt-0">
        <v-row justify="center" align="center">
          <v-col md="6">
            <div class="font-weight-bold title">{{ title }}</div>
          </v-col>
          <v-col cols="6" class="text-right">
            <v-btn class="white--text text-capitalize" color="light-green lighten-1">View all</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col v-for="(item, index) in productList" :key="index" md="3" sm="12">
            <v-hover
              v-slot="{hover}"
            >
              <v-card
                :flat="!hover"
                class="mx-auto"
                max-width="300"
              >
                <v-img
                  class="white--text align-end"
                  height="200px"
                  :src="item.image"
                >
                </v-img>

                <v-card-text class="text--primary">
                  <div class="body-2">
                    {{ item.name }}
                    <span>
                          ({{item.description.substring(0, 18) + '...'}})
                        </span>
                  </div>

                  <div class="font-weight-bold body-1">{{ item.price }}</div>
                  <v-rating
                    small
                    :value="3"
                  >
                  </v-rating>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    props: ['productList', 'title']


  }
</script>
