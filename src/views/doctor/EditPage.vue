<template>
  <div id="new-page">
    <h3>Edit Page</h3>
    <div class="row">
    <form @submit.prevent="updatePage" class="col s12">
     
      <div class="mb-3">
        <label class="form-label">Name</label>
         <input type="text" v-model="name" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Page content</label>
          <vue-editor v-model="content" />    
      </div>
  

      <button type="submit" class="btn btn-primary">Submit</button>
      <router-link to="/" class="btn btn-secondary">Cancel</router-link>
     
    </form>
  </div>
  </div>
</template>

<script>
  import db from '../../db'
  import { VueEditor } from "vue2-editor";

  export default {
    name: 'edit-page',
    components: {
      VueEditor
    },
    data () {
      return {
        page_id: null,
        name: null,
        //content: "<h1>Some initial content</h1>",
        path: null,
        order: null,
        access: null
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('pages').where('page_id', '==', to.params.page_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.page_id = doc.data().page_id;
            vm.name = doc.data().name;
            vm.content = doc.data().content;
            vm.path = doc.data().path;
            vm.order = doc.data().order;
            vm.access= doc.data().access;
          })
        })
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        db.collection('pages').where('page_id', '==', this.$route.params.page_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
             this.page_id = doc.data().page_id;
            this.name = doc.data().name;
             this.content = doc.data().content;
             this.path = doc.data().path;
             this.order = doc.data().order;
             this.access= doc.data().access;  
          })
        })
      },
      updatePage () {
        db.collection('pages').where('page_id', '==', this.$route.params.page_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              page_id: this.page_id,
              name: this.name,
              content: this.content,
              path: this.path,
              order: this.order,
              access: this.access
            })
            .then(() => {
              this.$router.push({ name: 'view-page', params: { page_id: this.page_id }})
            });
          })
        })
      }
    }
  }
</script>