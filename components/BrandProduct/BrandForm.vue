<template>
  <v-card>
    <v-card-title>
      <div>Create New Brand</div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="formValues.brandName"
            label="Brand Name"
            prepend-inner-icon="mdi-file"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-img v-if="formValues._id"
                 :src="`http://localhost:9000/static/${formValues.brandImage}`"
                 height="100"
                 width="100"
                 contain
          ></v-img>
<!--          <v-file-input-->
<!--            v-model="formValues.brandImage"-->
<!--            label="Brand Image"-->
<!--            prepend-inner-icon="mdi-file"-->
<!--          ></v-file-input>-->
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        text
        color="grey"
        @click="$emit('close')"
      >
        Cancel
      </v-btn>
      <v-btn
        color="red darken-2"
        class="white--text"
        @click="createBrand()"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    props: ['actionData'],
    data () {
      return {
        formValues: {}
      }
    },
    created() {
      this.formValues = this.actionData
    },
    methods: {
      createBrand () {
        let dataToPost = new FormData()
        dataToPost.append('brandName', this.formValues.brandName)
        dataToPost.append('brandImage', this.formValues.brandImage)
        if(this.formValues._id) {
          this.updateBrand(dataToPost)
        } else {
          this.$axios.$post(`/brand`, dataToPost)
            .then(() => {
              this.setNotifyMessage('Successfully added brand.')
              this.$emit('close')
            })
            .catch(() => {
              this.setNotifyMessage('Something went wrong.')
            })
        }
      },
      updateBrand (data) {
        this.$axios.$put(`/brand/${this.formValues._id}`, data)
          .then((result)=> {
            this.$emit('close')
            this.setNotifyMessage({message: "Successfully Update", color: 'green'})
          })
      }
    }
  }
</script>
