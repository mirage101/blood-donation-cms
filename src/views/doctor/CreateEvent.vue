<template>
    <div>
        <h1>Create event</h1>        
    <div class="row">
    <form @submit.prevent="createEvent">
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="name" required>
          <label>Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <vue-editor v-model="descr" />          
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="date" v-model="start" required>
          <label>Start</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="date" v-model="end" required>
          <label>End</label>
        </div>
      </div>
      <button type="submit" class="btn" @click="createEvent">Create Event</button>
      <router-link to="/driver/manage-events" class="btn grey">Cancel</router-link>
    </form>
  </div>
    </div>
</template>

<script>
import db from '../../db'
import { VueEditor } from "vue2-editor";

export default {
    name:'create-event',
    components: { VueEditor },
    data(){
        return{
            id:'',
            name:'',
            descr:'<p>Event description</p',
            status:'enabled', //expired
            end:'',
            start:'',
            type:'' //emergent, frequient            
        }
    },
    computed:{
         genUID() { //generate uid 
           return new Date().getTime().toString();                             
        }
    },
    methods:{
     createEvent(){
          console.log(this.genUID)
          db.collection('events').add({
            id: this.genUID,
            name: this.name,
            descr: this.descr,
            start: this.start,
            end: this.end,
            type: this.type,
            status:this.status
          })
          .then(docRef => {
            console.log('Event added: ', docRef.id)
            this.$router.push('/driver/manage-events')
          })
          .catch(error => {
            console.error('Error adding event: ', error)
          })
        
     }   
       
    }

}
</script>