
const cors = require('cors')({origin: true});
const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {

  if (authUser.email) {
    const customClaims = {
      donor: true,
    };
    try {
      var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims)

      return db.collection("roles").doc(authUser.uid).set({
        email: authUser.email,
        role: customClaims
      })

    } catch (error) {
      console.log(error)
    }

  }

});

exports.setUserRole = functions.https.onCall(async (data, context) => {

    //if (!context.auth.token.admin) return
  
    try {
      var _ = await admin.auth().setCustomUserClaims(data.uid, data.role)
  
      return db.collection("roles").doc(data.uid).update({
        role: data.role
      })
  
    } catch (error) {
      console.log(error)
    }
  
  });
  
  exports.removeUser = functions.firestore.document("/users/{uid}")
  .onDelete((snapshot, context) => {        
      const serviceAccount = require('./src/serviceAccountKey.json');
      admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: "https://vue-spas-ffe28.firebaseio.com"
      });
      return admin.auth().deleteUser(context.params.uid);
  });