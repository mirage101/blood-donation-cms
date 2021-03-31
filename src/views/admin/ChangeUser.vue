<template>
    <div>
           

                <h2>List of special users</h2>
                <table class="ui celled table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>                           
                            <th>Edit</th>                            
                            <th>Enable/disable</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td data-label="Name">{{user.email}} </td>
                            <select @change="changeRole(user.id, $event)">
                                <option :selected="user.role.driver" value="driver">Doctor</option>
                                <option :selected="user.role.admin" value="admin">Admin</option>                            
                            </select>
                            <td><button>edit</button></td>                           
                            <td><button>disable</button></td>
                        </tr>
                    </tbody>
                </table>
    </div>
</template>
<script>
import firebase from "firebase";
export default {
    data() {
        return {
            users: [],
            user: null,            
        };
    },

    created() {
       
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            self.user = user;
        });

        this.users = [];
        firebase
            .firestore()
            .collection("roles")
            .get()
            .then(snap => {
                snap.forEach(doc => {
                    var user = doc.data();
                    user.id = doc.id;
                    console.log(doc.data());
                    if (!user.role.donor ) this.users.push(user);
                    //if (!user.role.customer) this.users.push(user);
                    //if (!user.role.admin) this.users.push(user);
                });
            });

    
    },
    //add watcher on updated
    methods: {

        changeRole(uid, event) {
            var addMessage = firebase.functions().httpsCallable("setUserRole");

            var data = { uid: uid, role: { [event.target.value]: true } };
            console.log(data)
            addMessage(data)
                .then(function(result) {
                    console.log(result);
                })
                .catch(function(error) {
                    console.log(error)
                });
        },
     
        
    }
};
</script>