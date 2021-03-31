<template>
  <div id="new-page">
    <h3>Edit Event {{name}}</h3>
    <div class="row">
    <form @submit.prevent="updateEvent" class="col s12">
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
      <div class="row">
        <div class="input-field col s12">
          <select v-model="status">
            <option value="enable">enable</option>
            <option value="disable">disable</option>
          </select>
          <label>Status</label>
        </div>
      </div>
      <button type="submit" class="btn btn-success" @click="updateEvent">Update Event</button>
      <router-link to="/driver/manage-events" class="btn btn-secondary">Cancel</router-link>
    </form>
  </div>
  </div>
</template>

<script>
  import db from '../../db'
  import { VueEditor } from "vue2-editor";

  export default {
    name: 'edit-event',
    components:{
    VueEditor
    },
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
        db.collection('events').where('event_id', '==', this.$route.params.event_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.event_id = doc.data().event_id;
            this.name = doc.data().name;
            this.descr = doc.data().descr;
            this.start = doc.data().start;
            this.end = doc.data().end;
            this.status= doc.data().status;
            this.type= doc.data().type;            
          })
        })
      },
      updateEvent () {
        db.collection('events').where('id', '==', this.$route.params.event_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              event_id: this.event_id,
              name: this.name,
              descr: this.descr,
              start: this.start,
              end: this.end,
              status: this.status,
              type: this.type,              
            })
            .then(() => {
              //this.$router.push({ name: 'view-event', params: { event_id: this.event_id }})
              this.$router.push('/driver/manage-events')
            });
          })
        })
      }
    }
  }
</script>