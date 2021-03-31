<template>
  <div id="new-page">
    <h3>Edit Center</h3>
    <div class="row">
    <form @submit.prevent="updateCenter" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="location" required>
          <label>location</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <vue-editor v-model="contacts" />          
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="work_time" required>
          <label>work_time</label>
        </div>
      </div>
      <button type="submit" class="btn btn-success">Update Center</button>
      <router-link to="/driver/manage-centers" class="btn btn-secondary">Cancel</router-link>
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
         location: 'city',
          contacts: 'address',
          work_time: '09:00 - 17:00',
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('centers').where('center_id', '==', to.params.center_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.center_id = doc.data().center_id;
            vm.location = doc.data().location;
            vm.contacts = doc.data().contacts;
            vm.work_time = doc.data().work_time;           
          })
        })
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        db.collection('centers').where('center_id', '==', this.$route.params.center_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.center_id = doc.data().center_id;
            this.name = doc.data().name;
            this.location = doc.data().location;
            this.contacts = doc.data().contacts;
            this.work_time = doc.data().work_time;                     
          })
        })
      },
      updateCenter () {
        db.collection('centers').where('center_id', '==', this.$route.params.center_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              center_id: this.center_id,
              location: this.location,
              contacts: this.contacts,
              work_time: this.work_time              
            })
            .then(() => {
              //this.$router.push({ name: 'view-event', params: { event_id: this.event_id }})
              this.$router.push('/driver/manage-centers')
            });
          })
        })
      }
    }
  }
</script>