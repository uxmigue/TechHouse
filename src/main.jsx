import React from 'react'
import ReactDOM from 'react-dom/client'
import { initializeApp } from "firebase/app";
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/index.css"

const firebaseConfig = {
  apiKey: "AIzaSyCrNJifej_pkL1d96P03wSbYzBV4Y59vck",
  authDomain: "techhousebd-106fe.firebaseapp.com",
  projectId: "techhousebd-106fe",
  storageBucket: "techhousebd-106fe.appspot.com",
  messagingSenderId: "330193216145",
  appId: "1:330193216145:web:95871bf7f9c8d52f211530"
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(<App />)