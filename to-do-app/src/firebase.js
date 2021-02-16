import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCTMPMiZPCD0_jbXpRoUPMR43_Wxpza2bQ",
    authDomain: "todo-app-cp-f0adf.firebaseapp.com",
    projectId: "todo-app-cp-f0adf",
    storageBucket: "todo-app-cp-f0adf.appspot.com",
    messagingSenderId: "198273440509",
    appId: "1:198273440509:web:a5b18245c37a2a9126bc94",
    measurementId: "G-81J1J5FZFE"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()
    
