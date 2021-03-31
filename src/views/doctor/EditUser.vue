<template>
  <div id="new-page">
    <h3>Edit User</h3>
    <div class="row">
    <form @submit.prevent="updateUser" class="col s12">
      <div class="row">
        <div class="input-field">
          <label for="firstName">First name:</label> 
          <input type="text" v-model="firstName" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <label for="lastName">Last name:</label> 
          <input type="text" v-model="lastName" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <label for="city">City:</label>
          <input type="text" v-model="city" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <label for="bloodType">BloodType:</label>
          <input type="text" v-model="bloodType" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <label for="bloodFactor">Blood Factor:</label>
          <input type="text" v-model="bloodFactor" required>
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <label for="age">Age:</label>
          <input type="text" v-model="age" required>
        </div>
      </div>
       <div class="row">
        <div class="input-field">
           <label for="telephone">Telephone: </label>
          <input type="text" v-model="telephone" required>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <router-link to="/driver/donors-list" class="btn btn-warning">Cancel</router-link>
    </form>
  </div>
  </div>
</template>

<script>
  import db from '../../db'
    export default {
    name: 'edit-user',
    data () {
      return {
         email: null,
         password: null,
         //confirmPassword: null,
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
      updateUser () {
        db.collection('users').where('user_id', '==', this.$route.params.user_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              page_id: this.page_id,
              // user_id: userCredentials.user.uid,
               user_email:this.email,
               firstName: this.firstName,
               lastName: this.lastName,
               city: this.city,
               bloodType: this.bloodType,
               bloodFactor: this.bloodFactor,
               age: this.age,            
               telephone: this.telephone,
            })
            .then(() => {
              this.$router.push({ name: 'view-user', params: { user_id: this.user_id }})
            });
          })
        })
      }
    },

  }
</script>