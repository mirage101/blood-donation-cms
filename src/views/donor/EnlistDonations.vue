<template>
    <div>
        <h2>My donation events:</h2>
        
       <div v-for="event in events" :key="event.id">
           <h2>{{event.name}}</h2>
           <p>{{event.descr}}</p>
           <small>from: {{event.start}}</small> -
           <small>to: {{event.end}}</small>
       </div>

    </div>
</template>

<script>
import firebase from 'firebase'
import db from '../../db'
  
  export default {
    name: 'enlist',
    data () {
      return {
        events: [],
        loading: true,
        isActive: false,
        user_id: '',
        user_events:[],
        user_events_recordlist:[]
      }
    },
    methods:{
      
        },

    created () {
          
    this.user_id = firebase.auth().currentUser.uid;
    console.log(this.user_id)
       db.collection('donorlist').where('user_id', '==', this.user_id).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                const data = {
                    'event_id': doc.data().event_id,
                }
                   console.log(data)
                this.user_events.push(data)
                console.log(this.user_events)
                })
            })

    
      
      db.collection('events').where('event_id', '==', 1).get().then((querySnapshot) => {
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
          
          })
        })
         // console.log(this.user_events_recordlist)
  
      
    },
   
  }
</script>