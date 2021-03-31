<template>
    <section>
        <div class="ui middle aligned center aligned grid">
            <div class="column">
                <h1>Donor</h1>
                <p v-if="user">Hello {{this.firstName + ' ' + this.lastName}} : {{user.email}}</p>
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
           user: null,
           userData:null,
           userId : null,
           firstName:'',
           lastName: '',
        };
    },
    created() {
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            self.user = user;
        });
       
       
    


        const db = firebase.firestore();
        //get user data
        //console.log(firebase.auth().currentUser.uid)
        db.collection('users').where('user_id', '==', firebase.auth().currentUser.uid)
        .get()
        .then((querySnapshot) => {
            
            querySnapshot.forEach((doc) => {
                console.log(doc.id, ' => ', doc.data())
                this.firstName = doc.data().firstName
                this.lastName = doc.data().lastName               
            })
        })

        //console.log(this.firstName, this.lastName)
        // const db = firebase.firestore();
        //  db.collection('users').doc(firebase.auth().currentUser.uid).
        //         onSnapshot(function(doc){

        //             console.log('current data:', doc.data())

        //               var newData = doc.data()

        //             this.profileData = newData;

        //           })
            
    },
    methods: {
        signout() {
            firebase
                .auth()
                .signOut()
                .then(user => {
                    // this.$store.commit("setUser", null);
                    this.$router.push("/login");
                });
        }
    }
};
</script><br><br><br>