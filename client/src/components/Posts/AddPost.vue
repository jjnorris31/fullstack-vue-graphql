<template>
  <v-container>
    <v-row>
      <v-col cols="6" offset="3">
        <h1 class="text--primary">Add post</h1>
      </v-col>
      <v-col cols="6"
             offset="3">

        <v-card color="accent"
                class="px-4 py-2"
                dark>
          <v-container>
            <v-form @submit.prevent="signUp()"
                    ref="signUpForm"
                    lazy-validation
                    v-model="isFormValid">

              <!-- image URL input -->
              <v-layout row>
                <v-flex xs12>
                  <v-text-field prepend-icon="mdi-account"
                                v-model="title"
                                :rules="titleRules"
                                label="Post title"
                                type="text">
                  </v-text-field>
                </v-flex>
              </v-layout>

              <!-- title input -->
              <v-layout row>
                <v-flex xs12>
                  <v-text-field prepend-icon="mdi-account"
                                v-model="imageUrl"
                                :rules="imageRules"
                                label="Image URL"
                                required
                                type="text">
                  </v-text-field>
                </v-flex>
              </v-layout>

              <!-- image preview -->
              <v-row>
                <v-flex xs12>
                  <img :src="imageUrl" height="300px">
                </v-flex>
              </v-row>

              <!-- categories select -->
              <v-layout row>
                <v-flex xs12>
                  <v-select prepend-icon="mdi-account"
                            v-model="Categories"
                            :items="['Art', 'Education', 'Travel', 'Photography']"
                            multiple
                            :rules="categoriesRules"
                            label="Categories"
                            type="text">
                  </v-select>
                </v-flex>
              </v-layout>

              <!-- description text area -->
              <v-layout row>
                <v-flex xs12>
                  <v-textarea :rules="descriptionRules" v-model="description" label="Description">
                  </v-textarea>
                </v-flex>
              </v-layout>

              <v-row justify="center">
                <v-col cols="12"
                       class="d-flex justify-center">
                  <v-btn color="accent"
                         :disabled="!isFormValid"
                         type="submit">Save
                  </v-btn>
                </v-col>
              </v-row>

            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AddPost",
  data: () => {
    return {
      isFormValid: false,
      title: '',
      imageUrl: '',
      categories: [],
      description: '',
      titleRules: [
        title => !!title || 'Title is required',
      ],
      imageRules: [
        imageUrl => !!imageUrl || 'Image is required',
      ],
      categoriesRules: [
        categories => categories.length >= 1 || 'At lest one category is required'
      ],
      descriptionRules : [
        desc => !!desc || 'Description is required',
        desc => desc.length < 200 || 'Description must have less than 200 characters'
      ],
    }
  },
}
</script>

<style scoped>

</style>