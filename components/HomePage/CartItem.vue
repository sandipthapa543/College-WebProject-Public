<template>
  <v-card outlined>
    <v-row align="center">
      <v-col md="6" sm="12" class="py-0">
        <v-row align="center">
          <v-col cols="auto">
            <v-img
              v-if="productDetail"
              :src="`http://localhost:9000/static/${productDetail.productImage}`"
            ></v-img>
          </v-col>
          <v-col cols="auto" class="font-weight-bold">
            {{ productDetail.productName }}
          </v-col>
        </v-row>
      </v-col>
      <v-col md="2" sm="12">
       <v-text-field
         v-model="quantityCount"
         min="1"
         type="number"
       ></v-text-field>
      </v-col>
      <v-col md="2" sm="12">
        {{ price }}
    </v-col>
      <v-col md="2" sm="12">
        <v-btn icon @click="removeFromCart">
          <v-icon
            color="red"
            v-text="'mdi-close-circle'"
          ></v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    props: ['cartId', 'productDetail', 'quantity'],
    data () {
      return {
        quantityCount: this.quantity || '1',
        loading: true
      }
    },
    computed: {
      price () {
        return this.productDetail.productPrice * this.quantity
      }
    },
    watch: {
      quantityCount () {
        this.updateQuantity()
      },
      quantity () {
        this.quantityCount = this.quantity
      }
    },
    created() {
      this.quantityCount = this.quantity
    },
    methods: {
      updateQuantity () {
        this.$axios.$put(`cart/${this.cartId}`, {quantity: this.quantityCount})
        .then(()=> {
          this.$emit('refresh')
          this.$emit('change', this.quantityCount)
        })
      },
      removeFromCart () {
        this.$axios.$delete(`cart/${this.cartId}`)
        .then(()=> {
          this.$emit('refresh')
          this.setNotifyMessage({message: 'Successfully removed item.', color: 'green'})
        })
      }
    }
  }

</script>
