<template>
  <v-container>
    <v-card class="mt-5">
      <v-card-title>
        <v-icon v-text="'mdi-file'"></v-icon>
        <div>Brand List</div>
        <v-spacer></v-spacer>
        <v-btn color="red darken-3" class="white--text" depressed @click="brandForm = true">
          Create New
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col
            v-for="(brand, index) in brandList"
            :key="index"
            cols="2"
          >
            <v-card>
              <v-row justify="center" align="center">
                <v-spacer></v-spacer>
                <v-col
                  class="mx-auto"
                  cols="center"
                >
                  <v-avatar
                    size="70"
                  >
                    <v-img
                      class="mx-auto"
                      :src="$options.BASE_URL +  '/' + brand.brandImage"
                    ></v-img>
                  </v-avatar>
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="text-center" cols="12">
                  {{ brand.brandName }}
                </v-col>
                <v-col>
                  <v-btn @click="brandDetail = brand, brandForm = true">Update</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="brandForm" width="960">
      <brand-form v-if="brandForm" :action-data="brandDetail" @close="getAllBrand(), brandForm = false, brandDetail= {}"></brand-form>
    </v-dialog>
  </v-container>
</template>
<script>
  import BrandForm from "../../components/BrandProduct/BrandForm";
  export default {
    components: {BrandForm},
    data () {
      return {
        brandForm: false,
        brandDetail: {},
        brandList: [
          {
            name: 'Mirror', category: 'Something', brand: 'Ferrai', stock: 4, status: 'Published'
          }
        ],
      }
    },
    created() {
      this.getAllBrand()
    },
    methods: {
      getAllBrand () {
        this.$axios.$get(`/brand/all`)
        .then((result)=> {
          this.brandList = result
        })
      }
    }
  }
</script>
