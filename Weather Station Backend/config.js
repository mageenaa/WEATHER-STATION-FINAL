const firebase = require('firebase')
const { initializeApp } = require('firebase-admin')

firebaseConfig = {
    apiKey: "AIzaSyC0NT17TukxEKnRse5TwzbZNthH03JR52g",
    authDomain: "iot-colabs.firebaseapp.com",
    databaseURL: "https://iot-colabs-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iot-colabs",
    storageBucket: "iot-colabs.appspot.com",
    messagingSenderId: "1052600480021",
    appId: "1:1052600480021:web:95dd9ef2191d2de5e6b91c",
    measurementId: "G-XB31HM4TRM"
}

firebase.initializeApp(firebaseConfig)
const db=firebase.realtime()
const User=db.collection('Users')
module.exports = User