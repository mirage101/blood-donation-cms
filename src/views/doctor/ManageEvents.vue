<template>
   <div id="home">
      <h2>Events list</h2>      
     <table class="ui celled table">
        <thead>
          <tr>
              <th>Event Name</th>
              <th>Description</th>
              <th>Start</th>
              <th>End</th>
              <th>Enabled</th>
              <th>Edit</th>                           
              <th>View</th>                                          
              <th>Delete</th>
          </tr>
        </thead>
         <tbody>
              <tr v-for="event in events" :key="event.id">
                <td data-label="Name">{{event.name}} </td>
                <td v-html="event.descr"></td>
                <td data-label="Name">{{event.start}} </td>
                <td data-label="Name">{{event.end}} </td>
                <td data-label="Name">{{event.status}} </td>
                <td>
                  <router-link :to="{ name: 'edit-event', params: { event_id: event.event_id }}" class="btn btn-warning"><i class="fa fa-eye"></i> edit</router-link>
                  </td>   
                  <td>
                  <router-link :to="{ name: 'view-event', params: { event_id: event.event_id }}" class="btn btn-success"><i class="fa fa-eye"></i> view</router-link>
                  </td>                          
                <td><button @click="deleteEvent(event.event_id)" class="btn btn-danger">Delete</button></td>
                
             </tr>
              
          </tbody>
     </table> 
     
        <router-link :to="{path: '/event/create-event'}"  class="btn btn-primary">
          Create new event
        </router-link>
     
    <router-view></router-view>
  </div>
</template>

<script>
 import db from '../../db'
  
  export default {
    name: 'events',
    data () {
      return {
        events: [],
        loading: true
      }
    },
    created () {
      db.collection('events').get().then((querySnapshot) => {
        this.loading = false
        querySnapshot.forEach((doc) => {
          const data = {
            'id': doc.id,
            'event_id': doc.data().id,
            'name': doc.data().name,
            'descr': doc.data().descr,
            'start': doc.data().start,
            'end': doc.data().end,
            'status': doc.data().status
          }
          this.events.push(data)
          console.log(this.events)
        })
      })
      
    },
    methods:{
       deleteEvent(event_id) {
        console.log(event_id)
        if(confirm ('Are you sure?')) {
          
          db.collection('events').where('id', '==', event_id).get().then((querySnapshot) => {
            console.log(querySnapshot)
            querySnapshot.forEach((doc) => {
              
              doc.ref.delete();
              console.log('event deleted');
              
            }, (e) =>{
                console.log(e)  
            });
          })
        }
      }
    }
  }
</script>