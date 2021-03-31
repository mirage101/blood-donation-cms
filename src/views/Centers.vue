<template>
    <div>
        <h2>Centers</h2>  
          <div class="centers row">
            
              <div class="card col-3" v-for="center in centers" v-bind:key="center.id">
                <div class="card-body">
                  <div class="card-title">Location: {{center.location}} </div>
                  <div class="card-text">Contacts: <div v-html="center.contacts"></div> </div>
                  <div class="card-text">Working time: <div>{{center.work_time}}</div></div>
                </div>
             </div>
         </div>     
        
    </div>
</template>

<script>
import db from '../db'
  
  export default {
    name: 'centers',
    data () {
      return {
        centers: [],
        loading: true
      }
    },
    created () {
      db.collection('centers').get().then((querySnapshot) => {
        this.loading = false
        querySnapshot.forEach((doc) => {
          const data = {
            'id': doc.id,
            'center_id': doc.data().center_id,
            'location': doc.data().location,
            'contacts': doc.data().contacts,
            'work_time': doc.data().work_time,
          }
          this.centers.push(data)
          
        })
      })
      
    },    
  }
</script>
<style scoped>
.location{
  font-weight: bold;
}
.centers{
  display: flex;
  flex-wrap: wrap;
}
.centers .card{
  margin:2em 1em;  
}
</style>