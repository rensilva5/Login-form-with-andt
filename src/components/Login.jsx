import { useState } from "react"
import {initializeApp} from "firebase/app"
import { createUserWithEmailAndPassword, getAuth,
        GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup,
       } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCIBgIPMzAKyScaugFieAzKP5w7WN7SfrQ",
    authDomain: "first-login-rs.firebaseapp.com",
    projectId: "first-login-rs",
    storageBucket: "first-login-rs.appspot.com",
    messagingSenderId: "995443477761",
    appId: "1:995443477761:web:e1e0c43378f81533f65f00"
  }

function Login ({setIsLoggedIn}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const connectAuth = async () => {
        //connect to firebase project
        const app = initializeApp(firebaseConfig)
        // also connet to Auth
        return getAuth(app)
    }
    const handleLogin = async () => {
        const auth = await connectAuth()
        const user = await signInWithEmailAndPassword(auth, email, password)
            .catch(err => alert(err.message))
        if (user) {
            console.log(user.user)
            setIsLoggedIn(true)
        }
    }

    const handleGoogleLogin = async () => {
        const auth = await connectAuth()
        const provider = new GoogleAuthProvider()
        const user = await signInWithPopup(auth, provider)
            .catch (err => alert(err.message))
            if (user) {
                console.log(user.user)
                setIsLoggedIn(true)
            }
    }

    const handleSignUp = async () => {
        const auth = await connectAuth()
        //send email and password to firebase Auth
        const user = await createUserWithEmailAndPassword(auth, email, password)
            .catch(err => alert (err.message))
        //if all ok
        if (user) {
            console.log(user)
            setIsLoggedIn(true)
        }
        // if error
        // pop up error 
    }
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="email">
                Email:
                <input
                 value={email} onChange={e => setEmail(e.target.value)}
                 name="emamil" type="email" palceholder="youtyhere.com"/>
            </label> <br />
            <label htmlFor="password">
                Password
                <input 
                value={password} onChange={e => setPassword(e.target.value)}
                name="password" type="password"/>
            </label> <br/>
            
            <button onClick={handleLogin}>Login</button>&nbsp;
            <button onClick={handleSignUp}>Sign Up</button>
            <br/>
            <button onClick={handleGoogleLogin}>Login w/ google</button>
        </form>
    )
}

export default Login