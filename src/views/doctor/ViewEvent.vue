<template>
  <div id="view-page">
    <div class="collection with-header">
      <div class="collection-header"><h4>{{name}}</h4></div>
      <div class="collection-item">Event Name: {{name}}</div>
      <div class="collection-item">Event Description: {{descr}}</div>
      <div class="collection-item">Event start: {{start}}</div>
      <div class="collection-item">Event end: {{end}}</div>
      <div class="collection-item">Event status: {{status}}</div>
      <div class="collection-item">Event type: {{type}}</div>
    </div>
    <router-link to="/driver/manage-events" class="btn btn-secondary">Back</router-link>
    <button @click="deleteEvent(event_id)" class="btn btn-danger">Delete</button>
    <router-link v-bind:to="{ name: 'edit-event', params: { page_id: event_id }}" class="btn btn-warning">
        
        Edit
      </router-link>
    
  </div>
</template>

<script>
  import db from '../../db'
  export default {
    name: 'view-event',
    data () {
      return {
         name:'',
        descr:'',
        status:'enabled', //expired
        end:'',
        start:'',
        type:'' //emergent, frequient  
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('events').where('id', '==', to.params.event_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.event_id = doc.data().id;
            vm.name = doc.data().name;
            vm.desc = doc.data().descr;
            vm.start = doc.data().start;
            vm.end = doc.data().end;
            vm.status= doc.data().status;
            vm.type= doc.data().type;
            
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
            this.event_id = doc.data().event_id;
            this.name = doc.data().name;
            this.desc = doc.data().descr;
            this.start = doc.data().start;
            this.end = doc.data().end;
            this.status= doc.data().status;
            this.type= doc.data().type;            
          })
        })
      },
      deleteEvent (id) {
        if(confirm ('Are you sure?')) {
          db.collection('events').where('id', '==', this.$route.params.event_id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push('/driver/manage-events')
            })
          })
        }
      }
    }
  }
</script>
