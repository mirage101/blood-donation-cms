<template>
    <div class="card-columns vert-offset-top-2">
      <div class="card" style="width: 18rem;" v-for="event in events" :key="event.id">
        <!-- <img src="..." class="card-img-top" alt="..."> -->
        
        <div class="card-body">
          <h5 class="card-title">{{event.name}}</h5>
          <p class="card-text" v-html="event.descr"></p>
          <small>from: {{event.start}}</small> -
           <small>to: {{event.end}}</small>
          <!-- <a href="#" class="btn btn-primary" >More info</a> -->
           <button v-if="isDonor" @click="handleCheckIn(event.id)" class="button">Enlist</button>

        </div>
      </div>       
    </div>
</template>
<script>
import firebase from 'firebase'
import db from '../db'
  
  export default {
    name: 'events',
    props:["isDonor"],
    data () {
      return {
        events: [],
        loading: true,
        
      }
    },
    methods:{
       handleCheckIn: function(id) {
   
        this.$emit("checkIn", {
          user_id: firebase.auth().currentUser.uid,
          event_id:id
        });
    
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
          //console.log(data)
          
        })
      });

       
      
    },
   
  }
</script>
