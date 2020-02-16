<template>
  <v-card>
    <v-card-title>
      Create Product
    </v-card-title>
    <v-card-text>
      <v-form
        v-model="valid"
        ref="form">
        <v-row>

        <v-col cols="6">
          <v-text-field
            :rules="nameRules"
            v-model="formValues.productName"
            label="Product Name"
            prepend-inner-icon="mdi-file"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            :rules="nameRules"
            v-model="formValues.productCategory"
            label="Product Category"
            prepend-inner-icon="mdi-file"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="formValues.brand"
            label="Brand"
            :rules="nameRules"
            :items="brandChoices"
            item-text="brandName"
            item-value="_id"
            prepend-inner-icon="mdi-file"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="formValues.stock"
            label="Stock"
            :rules="nameRules"
            prepend-inner-icon="mdi-file"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            :rules="nameRules"
            v-model="formValues.status"
            label="Status"
            :items="statusChoices"
            prepend-inner-icon="mdi-file"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="formValues.price"
            label="price"
            :rules="nameRules"
            prepend-inner-icon="mdi-cash"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-textarea
            v-model="formValues.description"
            label="Description"
            :rules="nameRules"
            prepend-inner-icon="mdi-file"
          ></v-textarea>
        </v-col>
        <v-col cols="6">
          <v-file-input
            v-model="formValues.image"
            label="Product Image"
            :rules="nameRules"
            prepend-inner-icon="mdi-file"
          ></v-file-input>
        </v-col>
      </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="grey" @click="$emit('close')" text>
        Cancel
      </v-btn>
      <v-btn
        color="red darken-3"
        class="white--text"
        depressed
        @click="createProduct"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        brand: {},
        valid: true,
        nameRules: [
          v => !!v ||  'This field is required.'
        ],
        statusChoices: ['Published', 'Unpublished'],
        brandChoices: [],
        formValues: {

        }
      }
    },
    created() {
      this.getBrand()
    },
    methods: {
      createProduct () {
        let formData = new FormData()
        formData.append('productName', this.formValues.productName)
        formData.append('productCategory', this.formValues.productCategory)
        formData.append('brandId', this.formValues.brand)
        formData.append('productDescription', this.formValues.description)
        formData.append('productStock', this.formValues.stock)
        formData.append('productStatus', this.formValues.status)
        formData.append('productImage', this.formValues.image)
        formData.append('productPrice', this.formValues.price)
        this.$axios.$post(`product`, formData)
        .then(() => {
          this.setNotifyMessage({ message: 'Successfully Created Product.', color: 'green'})
          this.$emit('close')
        })
        .catch(() => {
          this.setNotifyMessage('Something went wrong.', 'red')
        })
      },
      getBrand () {
        this.$axios.$get('brand')
        .then((response)=> {
          this.brandChoices = response
        })
      }
    }
  }
</script>
