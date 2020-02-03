<template>
  <v-card>
    <v-card-title>
      Create Product
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="formValues.productName"
            label="Product Name"
            prepend-inner-icon="mdi-file"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="formValues.productCategory"
            label="Product Category"
            prepend-inner-icon="mdi-file"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="formValues.brand"
            label="Brand"
            prepend-inner-icon="mdi-file"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="formValues.stock"
            label="Stock"
            prepend-inner-icon="mdi-file"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="formValues.status"
            label="Status"
            prepend-inner-icon="mdi-file"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="formValues.price"
            label="price"
            prepend-inner-icon="mdi-cash"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-textarea
            v-model="formValues.description"
            label="Description"
            prepend-inner-icon="mdi-file"
          ></v-textarea>
        </v-col>
        <v-col cols="6">
          <v-file-input
            v-model="formValues.image"
            label="Product Image"
            prepend-inner-icon="mdi-file"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="grey" text>
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
        statusChoices: ['Published', 'Unpublished'],
        formValues: {

        }
      }
    },
    methods: {
      createProduct () {
        let formData = new FormData()
        formData.append('productName', this.formValues.productName)
        formData.append('productCategory', this.formValues.productCategory)
        formData.append('brand', this.formValues.brand)
        formData.append('productDescription', this.formValues.description)
        formData.append('stock', this.formValues.stock)
        formData.append('status', this.formValues.status)
        formData.append('productImage', this.formValues.image)
        this.$axios.$post(`products/add`, formData)
        .then(() => {
          this.setNotifyMessage('Successfully Created Product.')
          this.$emit('close')
        })
        .catch(() => {
          this.setNotifyMessage('Something went wrong.', 'red')
        })
      }
    }
  }
</script>
