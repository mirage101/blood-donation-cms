<template>
    <div>
        <h2>Centers</h2>  
       
         <table class="ui celled table">
        <thead>
          <tr>
              <th>Center location</th>
              <th>contacts</th>
              <th>Work time</th>
              <th>Edit</th>                           
              <th>View</th>                                          
              <th>Delete</th>
          </tr>
        </thead>
         <tbody>
              <tr v-for="center in centers" v-bind:key="center.id">
                
                <td data-label="Name">{{center.location}} </td>
                <td v-html="center.contacts"> </td>
                <td data-label="Name">{{center.work_time}} </td>
                <td>
                  <router-link :to="{ name: 'edit-center', params: { center_id: center.center_id }}" class="btn btn-warning"><i class="fa fa-eye"></i> edit</router-link>
                  </td>   
                  <td>
                  <router-link :to="{ name: 'view-center', params: { center_id: center.center_id }}" class="btn btn-success"><i class="fa fa-eye"></i> view</router-link>
                  </td>                          
                <td><button @click="deleteCenter(center.center_id)" class="btn btn-danger">Delete</button></td>
                
             </tr>
              
          </tbody>
     </table> 
      <router-link to="/driver/create-center" class="btn btn-primary"><i class="fa fa-eye"></i> Create center</router-link>
    </div>
</template>

<script>
 import db from '../../db'
  
  export default {
    name: 'centers',
    data () {
      return {
        centers: [],
        loading: true
      }
    },
    created () {
      db.collection('centers').get().then((querySnapshot) => {
        this.loading = false
        querySnapshot.forEach((doc) => {
          const data = {
            'id': doc.id,
            'center_id': doc.data().center_id,
            'location': doc.data().location,
            'contacts': doc.data().contacts,
            'work_time': doc.data().work_time,
          }
          this.centers.push(data)
          
        })
      })
      
    },
    methods:{
       deleteCenter(center_id) {
        
        if(confirm ('Are you sure?')) {
          
          db.collection('centers').where('center_id', '==', center_id).get().then((querySnapshot) => {
            console.log(querySnapshot)
            querySnapshot.forEach((doc) => {              
              doc.ref.delete();
              console.log('center deleted');              
            }, (e) =>{
                console.log(e)  
            });
          })
        }
      }
    }
  }
</script>
