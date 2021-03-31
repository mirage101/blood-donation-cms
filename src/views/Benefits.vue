<template>
    <div v-html="pageContent">
      
    </div>
</template>

<script>
 import db from '../db'
  
  export default {
    name: 'home',
    data () {
      return {
        pages: [],
        loading: true,
        pageContent: this.pageContent,
        pageName:''
      }
    },
    created () {
      db.collection('pages').where('page_id', '==', '001').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {              
                    this.pageName = doc.data().name,
                    this.pageContent = doc.data().content
          })
        })
      }
    

    
  }
</script>