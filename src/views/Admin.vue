<template>
    <section>
        <div class="ui middle aligned center aligned grid">
            <div class="column">
                <router-view></router-view>
            </div>
        </div>
    </section>
</template>
<script>
import firebase from "firebase";
export default {
    data() {
        return {
            users: [],
            user: null,
            email:'',
            crEmail:'',
            crPassword: "",
            isAdmin:false,
            crRole:''
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

        signout() {
            firebase
                .auth()
                .signOut()
                .then(user => {
                    this.isAdmin = false;
                    this.$router.push("/");
                });
        },
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
     
        async createUser(){    
            var uid = 1;        
            try {
            var {
                user
            } = await firebase
                .auth()
                .createUserWithEmailAndPassword(this.crEmail, this.crPassword)
                .then(function success(userData){
                    var uid = userData.uid;
                //     var addMessage = firebase.functions().httpsCallable("setUserRole");
                //     var data = { uid: uid, role: { admin: true } };
                //      addMessage(data)
                // .then(function(result) {
                //     console.log(result);
                // })
                // .catch(function(error) {
                //     console.log(error)
                // });
          
                }).catch(function failure(error) {

          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);

            });
                
               
            } catch (error) {
            console.log(error.message);
            }

        },
     
         deleteUser(uid) {
             console.log(firebase.functions().removeUser())
            // var deleteUserData = firebase.functions()("removeUser");

            // var data = { uid: uid};
            // console.log(data)
            // deleteUserData(data)
            //     .then(function(result) {
            //         console.log(result);
            //     })
            //     .catch(function(error) {
            //         console.log(error)
            //     });
        },
    }
};
</script>