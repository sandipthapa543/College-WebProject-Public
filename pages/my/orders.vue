<template>
  <v-container class="mt-9">
    <v-card >
      <v-card-title>
        My Orders
      </v-card-title>
      <v-card-text>
        <v-data-table
          :items="myOrders"
          :headers="headers"
        >
          <template
            slot="item"
            slot-scope="props"
          >
            <tr>
              <td>
                <v-row align="center">
                  <v-col cols="auto">
                    <v-img
                      :src="`http://localhost:9000/static/${props.item.product.productImage}`"
                      height="100"
                      width="100"
                      contain
                    ></v-img>
                  </v-col>
                  <v-col>
                    {{ props.item.product.productName }}
                  </v-col>
                </v-row>
              </td>
              <td>
                {{ props.item.quantity }}
              </td>
              <td>
                {{ props.item.product.productPrice }}
              </td>
              <td>
                <v-chip
                  color="green"
                  class="white--text"
                >
                  {{ props.item.status }}
                </v-chip>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    data () {
      return{
        myOrders: [],
        headers: [
          { text: 'Product', sortable: false},
          { text: 'Quantity', sortable: false},
          { text: 'Price', sortable: false},
          { text: 'Status', sortable: false},
        ]
      }
    },
    created() {
      this.getMyorders()
    },
    methods: {
      getMyorders () {
        this.$axios.$get(`cart/?status=Checkout&userId=${this.$auth.user._id}`)
        .then((response)=> {
          this.myOrders = response
        })
      }
    }
  }
</script>
