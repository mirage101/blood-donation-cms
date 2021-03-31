<template>
 <div>
     <form class="mt-3" @submit.prevent="login">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="card bg-light">
              <div class="card-body">
                <h3 class="font-weight-light mb-3">Register for a blood donor</h3>
         
      
  <div class="col-md-12 form-group">
    <label for="email" class="form-label">Email</label>
     <input type="text" name="email" placeholder="E-mail address" v-model="email" class="form-control"/>
  </div>
  <div class="col-md-12 form-group">
    <label for="password" class="form-label">Password</label>
    <input type="password" name="password" placeholder="Password" v-model="password" class="form-control"/>
  </div>
  <div class="col-12 form-group">
    <label for="city" class="form-label">City</label>
      <input type="text" name="city" placeholder="City" v-model="city" class="form-control"/>
  </div>
  <div class="col-12 form-group">
    <label for="telephone" class="form-label">Telephone</label>
    <input type="tel" name="telephone" placeholder="ex. g. +22 111 22 11" v-model="telephone" class="form-control"/>
  </div>
  <div class="col-md-12 form-group">
    <label for="inputCity" class="form-label">City</label>
    <input type="text" class="form-control" id="inputCity">
  </div>
 <div class="col-md-12 form-group">
   <label for="inputCity" class="form-label">Age</label>
    <input type="number" name="age" placeholder="Age" v-model="age" class="form-control"/>
 </div>
  <div class="col-md-12 form-group">
    <label for="blood type" class="form-label">Choose your blood type: </label>
    <select id="inputState" class="form-select" name="blood type" v-model="bloodType">
      <option selected>Choose...</option>
      <option value="0" selected>0</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="AB">AB</option>
      <option value="unknown">unknown</option>
    </select>
  </div>
  <div class="col-md-12 form-group">
    <label for="inputState" class="form-label">Choose your blood factor: </label>
    <select id="inputState" class="form-select" v-model="bloodFactor">
      <option value="-" selected>-</option>
      <option value="+">+</option>           
      <option value="unknown">unknown</option>
    </select>
  </div>
   <div class="col-12 form-group">
    <button type="submit" class="btn btn-primary" @click="register">Register</button>
  </div>
    <div>
            Have an account already?
            <router-link :to="{ name: 'login' }">Login</router-link>
         </div>
 
  </div>
  </div>
  </div>
  </div>

  </div>
  
</form>
          
       
   </div>
</template>
<script>
import firebase from "firebase";

export default {
  data: function() {
    return {
      displayName: null,
      email: null,
      password:null,
      passTwo: null,
      error: null,
      isAdmin: null,
       firstName:null,
         lastName:null,
         city:null,
         bloodType:null,
         bloodFactor:null,
         age:null,
         telephone:null,
    };
  },
  methods: {
    async register() {
          const info = { //variable contains infro from form
            firstName: this.firstName,
            lastName: this.lastName,
            city: this.city,
            bloodType: this.bloodType,
            bloodFactor: this.bloodFactor,
            age: this.age,            
            telephone: this.telephone,
         };
         try {
           var {
             user
           } = await firebase
             .auth()
             .createUserWithEmailAndPassword(this.email, this.password)
           // signout
           .then(
            userCredentials => {
              
               console.log(userCredentials.user.uid)
               const db = firebase.firestore();
                db.collection("users").add({
                  user_id: userCredentials.user.uid,
                  user_email:this.email,
                  firstName: info.firstName,
                  lastName: info.lastName,
                  city: info.city,
                  bloodType: info.bloodType,
                  bloodFactor: info.bloodFactor,
                  age: info.age,            
                  telephone: info.telephone,
                })
                
                .then((docRef) => {
                   console.log("Document written with ID: ", docRef.id);
                   console.log('redirect')
                    
                  this.$router.push("/");                  
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
               });
            }

         )
         } catch (error) {
           console.log(error.message);
         }
       },
       addRole(uid, userRole) {
            
            
            var addMessage = firebase.functions().httpsCallable("setUserRole");

            var data = { uid: uid, role: { userRole: true } };
            console.log(data)
            addMessage(data)
                .then(function(result) {
                    console.log(result);
                })
                .catch(function(error) {
                    console.log(error)
                });
        },
    // register: function() {
    //   const info = { //variable contains infro from form
    //     email: this.email,
    //     password: this.passOne,
    //     displayName: this.displayName,
    //     isAdmin: this.isAdmin
    //   };
    //   if (!this.error) {
    //     Firebase.auth()
    //       .createUserWithEmailAndPassword(info.email, info.password)
    //       .then(
    //         userCredentials => {
    //           return userCredentials.user
    //             .updateProfile({
    //               displayName: info.displayName,
    //               isAdmin: info.isAdmin
    //             })
    //             .then(() => {
    //               this.$router.replace("meetings");
    //               console.log(userCredentials.user.isAdmin)
    //             });

                
    //         },
    //         error => {
    //           this.error = error.message;
    //         }
    //       );
    //   }
    // }
  },
  watch: {
    passTwo: function() {
      if (
        this.passOne !== "" &&
        this.passTwo !== "" &&
        this.passTwo !== this.passOne
      ) {
        this.error = "passwords must match";
      } else {
        this.error = null;
      }
    }
  }
};
</script>
