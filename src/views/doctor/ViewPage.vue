<template>
  <div id="view-page">
    <div class="collection with-header">
      <div class="collection-header"><h4>{{name}}</h4></div>
      <div class="collection-item">Content: <div v-html="content"></div></div>
    </div>
    <router-link to="/" class="btn btn-secondary">Back</router-link>
    <button @click="deletepage" class="btn btn-danger">Delete</button>
    <router-link v-bind:to="{ name: 'edit-page', params: { page_id: page_id }}" class="btn btn-warning">
        
        Edit
      </router-link>
    
  </div>
</template>

<script>
  import db from '../../db'
  export default {
    name: 'view-page',
    data () {
      return {
        page_id: null,
        name: null,
        content: null,
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
             this.access= doc.data().access            
          })
        })
      },
      deletepage () {
        if(confirm ('Are you sure?')) {
          db.collection('pages').where('page_id', '==', this.$route.params.page_id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push('/')
            })
          })
        }
      }
    }
  }
</script>
