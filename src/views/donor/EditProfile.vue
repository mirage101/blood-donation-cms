<template>
    <div>
        Hello {{this.firstName + ' ' + this.lastName }} you can edit your profile bellow:
         <form class="ui large form">
            <div class="ui stacked secondary segment">
              
               <!-- <div class="field">
                  <div class="ui left icon input large">
                     <i class="mail icon"></i>
                     <input type="text" name="email" value="{{this.email}}" v-model="email" />
                  </div>
               </div>
               <div class="field">
                  <div class="ui left icon input large">
                     <i class="lock icon"></i>
                     <input type="password" name="password" placeholder="Password" v-model="password" />
                  </div>
               </div> -->
               <!-- <div class="field">
                  <div class="ui left icon input large">
                     <i class="lock icon"></i>
                     <input type="password" name="password" placeholder="Confirm password" v-model="confirmPassword" />
                  </div>
               </div> -->
          
               <div class="field">
                  <div class="ui left icon input large">
                     <i class="lock icon"></i>
                     <input type="text" name="firstName" placeholder="First Name" v-model="firstName" />
                  </div>
               </div>
                <div class="field">
                  <div class="ui left icon input large">
                     <i class="lock icon"></i>
                     <input type="text" name="lastName" placeholder="Last Name" v-model="lastName" />
                  </div>
               </div>
               <div class="field">
                  <div class="ui left icon input large">
                     <i class="compass icon"></i>
                     <input type="text" name="city" placeholder="City" v-model="city" />
                  </div>
               </div>
                <div class="field">
                  <div class="ui left icon input large">
                     <i class="phone icon"></i>
                     <input type="tel" name="telephone" placeholder="ex. g. +22 111 22 11" v-model="telephone" />
                  </div>
               </div>
                <div class="field">
                  <div class="ui left icon input large">
                     <i class="lock icon"></i>
                     <input type="number" name="age" placeholder="Age" v-model="age" />
                  </div>
               </div>
                 <div class="field">
                  <div class="ui left icon input large">
                     <i class="lock icon"></i>
                     <select v-model="bloodType">
                        <option value="0" selected>0</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                     </select>
                  </div>
                 </div>
                  <div class="field">
                  <div class="ui left icon input large">
                     <i class="lock icon"></i>
                     Blood factor
                     <select v-model="bloodFactor">
                        <option value="-" selected>-</option>
                        <option value="+">+</option>                        
                     </select>
                  </div>
               </div>
                
              
               <div class="ui fluid large green submit button" @click="updateUserInfo">Update your data</div>
            </div>
           
            <div class="ui error message"></div>
         </form>
         <div>Delete your profile</div>
         <div class="ui fluid large red submit button" @click="deleteUserInfo">deleteUserInfo</div>
    </div>
</template>
<script>
import firebase from "firebase";
  
export default {
    data() {
        return {
            user: null,
            userData:null,
           firstName:null,
            lastName:null,
            city:this.city,
            bloodType:null,
            bloodFactor:null,
            age:null,
            telephone:null,
        };
    },
    created() {
        const db = firebase.firestore();
        db.collection('users').where('user_id', '==', firebase.auth().currentUser.uid)
        .get()
        .then((querySnapshot) => {
            
            querySnapshot.forEach((doc) => {
                console.log(doc.id, ' => ', doc.data())
                this.firstName = doc.data().firstName
                this.lastName = doc.data().lastName,
                this.age = doc.data().age,
                this.bloodFactor = doc.data().bloodFactor,
                this.bloodType = doc.data().bloodType,
                this.city = doc.data().city,
                this.telephone = doc.data().telephone              
            })
        })

        console.log(this.firstName, this.lastName)
        // const db = firebase.firestore();
        //  db.collection('users').doc(firebase.auth().currentUser.uid).
        //         onSnapshot(function(doc){

        //             console.log('current data:', doc.data())

        //               var newData = doc.data()

        //             this.profileData = newData;

        //           })
            
    },
    methods:{
        updateUserInfo(){
            const db = firebase.firestore();
             db.collection('users').where('user_id', '==', firebase.auth().currentUser.uid).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.update({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    age: this.age,
                    bloodFactor: this.bloodFactor,
                    city: this.city,
                    telephone: this.telephone
                })
                .then(() => {
                    console.log('update successfull')
                });
            })
            })
        },
        deleteUserInfo(){
            console.log('delete')
             const db = firebase.firestore();
            var user = firebase.auth().currentUser;
            //delete user data in firestore
            db.collection('users').where('user_id', '==', user.uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              console.log('data in firestore is deleted')
            })
          })
             
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
</script>