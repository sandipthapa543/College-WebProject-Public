<template>
  <v-container>
    <v-card class="mt-5">
      <v-card-title>
        <v-icon v-text="'mdi-file'"></v-icon>
        <div>Product List</div>
        <v-spacer></v-spacer>
        <v-btn color="info" class="white--text" depressed @click="productForm = true">
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
            <td>{{ props.item.productName }}</td>
            <td>{{ props.item.productDescription }}</td>
            <td>{{ brandLists.length ? brandLists.find(x => x._id === props.item.brandId).brandName : '' }}</td>
            <td>{{ props.item.productStock }}</td>
            <td>{{ props.item.productStatus }}</td>
            <td>
              <v-btn @click="deleteId = props.item._id, deleteForm = true" icon>
                <v-icon color="red" v-text="'mdi-close-circle'"></v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="productForm" width="960" persistent>
      <product-form v-if="productForm" @close="productForm = false, getAllProduct()"></product-form>
    </v-dialog>
    <v-dialog
      v-model="deleteForm"
      width="500"
      persistent
    >
      <v-card>
        <v-card-title>
          Confirm Delete
        </v-card-title>
        <v-card-text>
          You are about to delete this product.
        </v-card-text>
        <v-card-actions>
          <v-col class="text-right">
            <v-btn class="text-capitalize" text color="grey" @click="deleteForm = false">
              Cancel
            </v-btn>
            <v-btn class="white--text text-capitalize" color="red" @click="deleteProduct">
              Confirm
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
  import ProductForm from "../../components/Product/ProductForm";
export default {
  components: {ProductForm},
  layout: 'admin',
  data () {
    return {
      productForm: false,
      productList: [
        {
          name: 'Mirror', category: 'Something', brand: 'Ferrai', stock: 4, status: 'Published'
        }
      ],
      brandChoices: [],
      deleteForm: false,
      deleteId: '',
      brandLists: [],
      headers: [
        { text: 'Name', value: 'productName', sortable: false },
        { text: 'Category', value: 'productName', sortable: false },
        { text: 'Brand', value: 'productName', sortable: false },
        { text: 'Stock', value: 'productName', sortable: false },
        { text: 'Status', value: 'productName', sortable: false },
        { text: 'Action', value: 'productName', sortable: false }
      ]
    }
    },
  created() {
    this.getAllProduct()
    this.getAllBrands()
  },
  methods: {
      getAllProduct() {
        this.$axios.$get('product')
          .then((response) => {
            this.productList = response.result
          })
      },
    getAllBrands () {
        this.$axios.$get('brand/')
      .then((response)=> {
        this.brandLists = response
      })
    },
    deleteProduct () {
        this.$axios.$delete(`product/${this.deleteId}`)
      .then(()=> {
        this.setNotifyMessage({ message: "Successfully Deleted Product ", color: "green"})
        this.getAllProduct()
        this.deleteForm = false
      })
    }
    }
}
</script>
