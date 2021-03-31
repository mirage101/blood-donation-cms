<template>
   <div id="home">
      
     <table class="ui celled table">
        <thead>
          <tr>
              <th>Page name</th>
              <th>Edit</th>                           
              <th>View</th>                                          
              <th>Delete</th>
          </tr>
        </thead>
         <tbody>
              <tr v-for="page in pages" v-bind:key="page.id">
                <td data-label="Name">{{page.name}} </td>
                <td>
                  <router-link :to="{ name: 'edit-page', params: { page_id: page.page_id }}" class="btn btn-warning">edit</router-link>
                  </td>   
                  <td>
                  <router-link :to="{ name: 'view-page', params: { page_id: page.page_id }}" class="btn btn-success">view</router-link>
                  </td>                          
                <td><button @click="deletepage(page.page_id)" class="btn btn-danger">Delete</button></td>
                
             </tr>
              
          </tbody>
     </table> 
    <router-link :to="{path: '/admin/new-page'}" class="btn btn-primary">
          Create new page
        </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
 import db from '../../db'
  
  export default {
    name: 'home',
    data () {
      return {
        pages: [],
        loading: true
      }
    },
    created () {
      db.collection('pages').orderBy('order').get().then((querySnapshot) => {
        this.loading = false
        querySnapshot.forEach((doc) => {
          const data = {
            'id': doc.id,
            'page_id': doc.data().page_id,
            'name': doc.data().name,
            'content': doc.data().content,
            'path': doc.data().path,
            'order': doc.data().order,
            'access': doc.data().access
          }
          this.pages.push(data)
        })
      })
      
    },
    methods:{
       deletepage (page_id) {
         
         
        if(confirm ('Are you sure?')) {
          db.collection('pages').where('page_id', '==', page_id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              
            })
          })
        }
      }
    }
  }
</script>