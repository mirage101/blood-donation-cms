<template>
  <div id="app">
    <Header
      :user="user"
      :userstate="userstate"     
      :isAdmin="isAdmin"
      :isDonor="isDonor"
      :isDriver="isDriver"
      @logout="logout"
    />
    <Footer />
    <router-view
      class="container"
      :user="user"
      :userstate="userstate"     
      :isAdmin="isAdmin"
      :isDonor="isDonor"
      :isDriver="isDriver"
      :meetings="meetings"
      :error="error"
      @logout="logout"
      @checkIn="checkIn"
    />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import firebase from "firebase";
import db from "./db.js";

export default {
  name: "App",
  data: function() {
    return {
      user: null,
      error: null,
      meetings: [],
       userstate:false,
      isAdmin:false,
      isDriver: false,
      isDonor: false
    };
  },
  methods: {
    logout: function() {
      firebase.auth()
        .signOut()
        .then(() => {
          this.isAdmin = false;
          this.isDriver = false;
          this.isDonor = false;
          this.user = null; //reset user
          this.$router.push("login"); //reroute to login
        });
    },
    
    checkIn: function(payload) {
      console.log(payload)
      console.log(payload.user_id)
      console.log(payload.event_id)
      db.collection("users")
        .doc(payload.user_id)        
        .collection("events")
        .doc(payload.event_id)
        .get()
        .then(doc => {   
          
          if (!doc.exists) {
            console.log('ima')
            db.collection("donorlist")
              .add({
                user_id: payload.user_id,
                event_id: payload.event_id,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
              })
              .then(() =>{
              console.log(payload.user_id, payload.event_id)
                this.$router.push(
                  "donor/enlist"
                )
                }
              );
          } else {
            this.error = "Sorry, no such event";
          }
        });
    }
  },
  mounted() {
    
    firebase.auth().onAuthStateChanged(user => {
            if (user) {  
                this.userstate = true;
            } else { 
                this.userstate = false;
            } 
        });
        
        //check user roles
         firebase.auth().onAuthStateChanged(userAuth => {
            if (userAuth) {
                firebase
                    .auth()
                    .currentUser.getIdTokenResult()
                    .then(tokenResult => {
                        console.log('tokenResult.claims.donor: ' + tokenResult.claims)
                        if(tokenResult.claims.admin){
                            this.isAdmin = true
                        }else if(tokenResult.claims.driver){
                            this.isDriver = true
                        }else if(tokenResult.claims.donor){
                            this.isDonor = true
                        }
                         console.log(this.isAdmin)
                    });
            }         
          });
      },
   
  
  components: {
    Header,
    Footer
  }
};
</script>


<style lang="scss">
$primary: red;
@import "node_modules/bootstrap/scss/bootstrap";
.vert-offset-top-2{
    margin-top: 2em;
}
#view-page,
#new-page{
  a{
    margin: 0 1em;
  }
}
.collection{
  margin:1em 0 2em 0;
}
.input-field {
  margin:0 0 2em 0;
  label{
    width: 100%;
    display: inline-block;
  }
}
.edit-profile{
  button{
    margin:1em;
  }
}
</style>
