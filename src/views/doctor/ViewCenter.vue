<template>
  <div id="view-page">
    <h1>View Center {{location}}</h1>
    <div class="collection with-header">
      <div class="collection-item">Center Location: {{location}}</div>
      <div class="collection-item">Center Contacts: {{descr}}</div>
      <div class="collection-item">Center work time: {{start}}</div>      
    </div>
    <router-link to="/driver/manage-Centers" class="btn btn-secondary">Back</router-link>
    <button @click="deleteCenter(center_id)" class="btn btn-danger">Delete</button>
    <router-link v-bind:to="{ name: 'edit-center', params: { center_id: center_id }}" class="btn btn-warning">
        Edit
    </router-link>
    
  </div>
</template>

<script>
  import db from '../../db'
  export default {
    name: 'view-center',
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
      deleteCenter (id) {
        if(confirm ('Are you sure?')) {
          db.collection('centers').where('center_id', '==', this.$route.params.center_id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push('/driver/manage-centers')
            })
          })
        }
      }
    }
  }
</script>
