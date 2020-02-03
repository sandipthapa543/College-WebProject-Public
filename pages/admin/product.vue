<template>
  <v-container>
    <v-card class="mt-5">
      <v-card-title>
        <v-icon v-text="'mdi-file'"></v-icon>
        <div>Product List</div>
        <v-spacer></v-spacer>
        <v-btn color="red darken-3" class="white--text" depressed @click="productForm = true">
          Create New
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table
        :items="productList"
        :headers="headers"
      >
        <template
          slot="item"
          slot-scope="props"
        >
          <tr>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.category }}</td>
            <td>{{ props.item.brand }}</td>
            <td>{{ props.item.stock }}</td>
            <td>{{ props.item.status }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="productForm" width="960">
      <product-form v-if="productForm"></product-form>
    </v-dialog>
  </v-container>
</template>
<script>
  import ProductForm from "../../components/Product/ProductForm";
export default {
  components: {ProductForm},
  data () {
    return {
      productForm: false,
      productList: [
        {
          name: 'Mirror', category: 'Something', brand: 'Ferrai', stock: 4, status: 'Published'
        }
      ],
      headers: [
        { text: 'Name', value: 'productName', sortable: false },
        { text: 'Category', value: 'productName', sortable: false },
        { text: 'Brand', value: 'productName', sortable: false },
        { text: 'Stock', value: 'productName', sortable: false },
        { text: 'Status', value: 'productName', sortable: false }
      ]
    }
  }
}
</script>
