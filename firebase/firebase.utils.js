import firebase from "firebase";
import "firebase/firestore";
import * as Google from "expo-google-app-auth";

// FILL IN THESE TWO FROM FIREBASE
const firebaseIosId = "";
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;

export const onSignOut = () => auth.signOut();

export const onSignIn = async ({ googleUser, setUser }) => {
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  const isUserEqual = (userLoggingIn, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === userLoggingIn.user.id
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );

      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(async function (result) {
          const { uid } = result.user;

          const { isNewUser } = result.additionalUserInfo;

          if (isNewUser) {
            // Create New User in database here
            const userRef = firestore.doc(`users/${uid}`);
            await userRef.set({
              gmail: result.user.email,
              profile_picture: result.additionalUserInfo.profile.picture,
              first_name: result.additionalUserInfo.profile.given_name,
              last_name: result.additionalUserInfo.profile.family_name,
              last_logged_in: Date.now(),
              created_at: Date.now(),
            });
          } else {
            // Receive user info and transactions and update last logged in
            const userRef = firestore.doc(`users/${uid}`);
            await userRef.update({
              last_logged_in: Date.now(),
            });
          }
          // setAccessToken(result.accessToken);
          setUser(result.user);
        })
        .catch(function (error) {
          // Handle Errors here.
          console.error(error);
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // The email of the user's account used.
          // var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // var credential = error.credential;
          // ...
        });
    } else {
      onSignOut();
      alert("It seems like you were already logged in... Please try again!");
    }
  });
};

export const signInWithGoogle = async ({ setUser }) => {
  const googleUser = await Google.logInAsync({
    iosClientId: firebaseIosId,
    scopes: ["profile", "email"],
  });
  if (googleUser.type === "success") {
    await onSignIn({ googleUser, setUser });
  } else {
    alert("I am sorry, we couldn't verify your login. Please try again.");
  }
};

export const addTransaction = async (uid, transaction) => {
  if (!uid) return;

  const collectionRef = firestore.collection(`users/${uid}/transactions`);

  await collectionRef
    .add({
      ...transaction,
      last_edited: Date.now(),
      created_at: Date.now(),
    })
    .then((docRef) => {
      return docRef.update({
        transactionsID: docRef.id,
      });
    });

  const transactions = await collectionRef.get();
  const allTransactions = transactions.docs.map((doc) => doc.data());
  return allTransactions;
};
