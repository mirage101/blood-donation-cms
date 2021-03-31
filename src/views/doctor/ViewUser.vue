<template>
  <div id="view-page">
    <div class="collection with-header">
      <div class="collection-item">First Name: {{firstName}}</div>
      <div class="collection-item">Last Name: {{lastName}}</div>
      <div class="collection-item">E-mail: {{path}}</div>
      <div class="collection-item">City: {{city}}</div>
      <div class="collection-item">Age: {{age}}</div>
      <div class="collection-item">Telephone: {{telephone}}</div>
      <div class="collection-item">Blood Type: {{bloodType}}</div>
      <div class="collection-item">Blood Factor: {{bloodFactor}}</div>
    </div>
    <router-link to="/driver/donors-list" class="btn btn-secondary">Back</router-link>    
    <router-link v-bind:to="{ name: 'edit-user', params: { user_id: user_id }}" class="btn btn-warning">        
        Edit
    </router-link>
    
  </div>
</template>

<script>
  import db from '../../db'
  export default {
    name: 'view-page',
    data () {
      return {
         email: null,
         firstName:null,
         lastName:null,
         city:null,
         bloodType:null,
         bloodFactor:null,
         age:null,
         telephone:null,
      }
    },
    beforeRouteEnter (to, from, next) {
      db.collection('users').where('user_id', '==', to.params.user_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.user_id = doc.data().user_id;
            vm.firstName = doc.data().firstName,
            vm.lastName = doc.data().lastName,
            vm.user_email = doc.data().user_email,
            vm.city = doc.data().city,
            vm.age = doc.data().age,
            vm.telephone = doc.data().telephone,
            vm.bloodType = doc.data().bloodType,
            vm.bloodFactor = doc.data().bloodFactor
          })
        })
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        
        db.collection('users').where('user_id', '==', this.$route.params.user_id).get().then((querySnapshot) => {
            
          querySnapshot.forEach((doc) => {
            this.user_id = doc.data().user_id;
            this.firstName = doc.data().firstName,
            this.lastName = doc.data().lastName,
            this.user_email = doc.data().user_email,
            this.city = doc.data().city,
            this.age = doc.data().age,
            this.telephone = doc.data().telephone,
            this.bloodType = doc.data().bloodType,
            this.bloodFactor = doc.data().bloodFactor
          })
        })
      },
      
    }
  }
</script>
