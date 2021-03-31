<template>
    <div>
        <h1>Donors list</h1>
        <table class="ui celled table">
        <thead>
          <tr>
              <th>First Name</th>
              <th>Last Name</th>                           
              <th>E-mail</th>                                          
              <th>City</th>
              <th>Telephone</th>
              <th>Blood Type</th>
              <th>Blood Factor</th>
              <th>Edit data</th>  
              <th>View data</th>
          </tr>
        </thead>
         <tbody>
             
              <tr v-for="user in users" v-bind:key="user.id">
                
                <td data-label="Name">{{user.firstName}} </td>
                <td data-label="Name">{{user.lastName}} </td>
                <td data-label="Name">{{user.user_email}} </td>
                <td data-label="Name">{{user.city}} </td>
                <td data-label="Name">{{user.telephone}} </td>
                <td data-label="Name">{{user.bloodType}} </td>
                <td data-label="Name">{{user.bloodFactor}} </td>
                
                <td>
                  <router-link :to="{ name: 'edit-user', params: { user_id: user.user_id }}" class="btn btn-warning">edit</router-link>
                  </td>   
                  <td>
                  <router-link :to="{ name: 'view-user', params: { user_id: user.user_id }}" class="btn btn-success">view</router-link>
                  </td>                          
             </tr>
              
          </tbody>
     </table> 
    
    </div>
</template>
<script>
import db from '../../db'
export default {
    name: 'Donors-list',
    data () {
      return {
        users: [],
        loading: true
      }
    },
    created () {
      
      db.collection('users').get().then((querySnapshot) => {
        this.loading = false
        console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          const data = {
            'id': doc.id,
            'user_id': doc.data().user_id,
            'firstName': doc.data().firstName,
            'lastName': doc.data().lastName,
            'user_email': doc.data().user_email,
            'city': doc.data().city,
            'age': doc.data().age,
            'telephone': doc.data().telephone,
            'bloodType': doc.data().bloodType,
            'bloodFactor': doc.data().bloodFactor,        
          }
        
          this.users.push(data);
            
        })
        console.log(this.users)
      })
       
    },
    
}
</script>