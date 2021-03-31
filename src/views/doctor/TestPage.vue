<template>
  <div id="new-page">
    <h3>New Page</h3>
    <div class="row">
    <form @submit.prevent="savepage" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="page_id" required>
          <label>page ID#</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="name" required>
          <label>Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <vue-editor v-model="content" />          
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="path" required>
          <label>Path</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="order" required>
          <label>Order</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="access" required>
          <label>Access</label>
        </div>
      </div>
      <button type="submit" class="btn">Create Page</button>
      <router-link to="/" class="btn grey">Cancel</router-link>
    </form>
  </div>
  </div>
</template>

<script>
    import db from '../../db'
    import { VueEditor } from "vue2-editor";

    export default {
      name: 'test-page',
      components: { VueEditor },
      data () {
        return {
          page_id: null,
          name: null,
          content: "<h1>Some initial content</h1>",
          path: null,
          order: null,
          access: null,
          
        }
      },
      methods: {
        savepage () {
          db.collection('pages').add({
            page_id: this.page_id,
            name: this.name,
            content: this.content,
            path: this.path,
            order: this.order,
            access: this.access
          })
          .then(docRef => {
            console.log('Client added: ', docRef.id)
            this.$router.push('/')
          })
          .catch(error => {
            console.error('Error adding page: ', error)
          })
        }
      }
    }
</script>