import { React, useRef } from 'react'
import './register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
const navigate =useNavigate();
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleClick = async(e) => {
        e.preventDefault();
        if(password.current.value !== passwordAgain.current.value){
            password.current.setCustomValidity("password don't match")
        }else{
            const user={
                username: username.current.value,
            email: email.current.value,
            password: password.current.value,
            passwordAgain: passwordAgain.current.value
            };
try{
    await axios.post(`/auth/register`,user);
    navigate('/login')
}
catch(err){
    console.log(err);
}
        }
        };
    // console.log(user)

    const google=()=>{
        window.open("http://localhost:8800/api/auth/google","_self")
        // console.log('nnj')


    }
    const facebook=()=>{
        window.open("http://localhost:8800/api/auth/facebook","_self")
    }
    const github=()=>{
        window.open("http://localhost:8800/api/auth/github","_self")
    }



    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social</h3>
                    <span className="loginDesc">Connect with others</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input ref={username} placeholder="Username" className="loginInput" required/>
                        <input ref={email} type='email' placeholder="Email" className="loginInput" required/>
                        <input ref={password} type='password' placeholder="Password" className="loginInput" required/>
                        <input ref={passwordAgain} type='password'  placeholder="Password Again" className="loginInput" required/>
                        <button className="loginButton" type='submit'>Sign Up</button>
                        {/* <button className="loginRegisterButton">
                            Log into Account
                        </button> */}
                        <div className="socialLoginContainer">
                        <img onClick={facebook} className='socialLogin' src={PF + "/facebook.png"} alt="" />
                        <img onClick={google} className='socialLogin' src={PF + "/google.png"} alt="" />
                        <img onClick={github} className='socialLogin' src={PF + "/github.png"} alt="" />

                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Register