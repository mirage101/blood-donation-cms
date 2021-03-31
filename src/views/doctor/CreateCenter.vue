<template>
  <div id="new-page">
    <h3>New Center</h3>
    <div class="row">
    <form @submit.prevent="saveCenter" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="location" required>
          <label>Location</label>
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
          <label>Work time</label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Create center</button>
      <router-link to="/driver/manage-centers" class="btn btn-secondary">Cancel</router-link>
    </form>
  </div>
  </div>
</template>

<script>
    import db from '../../db'
    import { VueEditor } from "vue2-editor";

    export default {
      name: 'new-center',
      components: { VueEditor },
      data () {
        return {
          location: 'city',
          contacts: 'address',
          work_time: '09:00 - 17:00',
        }
      },
      methods: {
        saveCenter () {
          db.collection('centers').add({
            center_id: this.center_id,
            location: this.location,
            contacts: this.contacts,
            work_time: this.work_time
          })
          .then(docRef => {
            console.log('Center added: ', docRef.id)
            this.$router.push('/driver/manage-centers')
          })
          .catch(error => {
            console.error('Error adding center: ', error)
          })
        }
      }
    }
</script>