<template>
    <div class="edit-profile">
        Hello doctor<br>
        Your profile data:
        E-mail: <input type="text" v-model="email" /><br>
        <!-- E-mail: <input type="text" v-model="email" /><br> -->
        <button @click="deleteUserInfo" class="btn btn-danger">Delete user info</button>
        <button @click="updateUserInfo" class="btn btn-success">update user info</button>
    </div>
</template>
<script>
import firebase from 'firebase'



export default {
    data(){
        return {
            email:''
        }
    },
     created () {
        var user = firebase.auth().currentUser;
        if (user != null) {
            this.email = user.email;
            console.log(this.email)
        }
    },
    methods:{
        updateUserInfo(){
             var user = firebase.auth().currentUser;
          user.updateEmail(this.email).then(function() {
            // Update successful.
            console.log('update')
            }).catch(function(error) {
            // An error happened.
            console.log('error')
            });
        },
        deleteUserInfo(){
            if(confirm ('Are you sure?')) {
                console.log('delete')
                var user = firebase.auth().currentUser;
                //delete authenticated user
                user.delete().then(function() {
                console.log('user is deleted')
                
                 this.$router.push("/");   
                }).catch(function(error) {
                    console.log(error)
                });
            }
        }
    }
}
</script>