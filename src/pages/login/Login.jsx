import React, { useContext, useRef } from 'react'
import './login.css'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from "@material-ui/core"
import { useNavigate } from 'react-router-dom'
// import { CircularProgress } from "@mui/material"
const Login = () => {
    const email = useRef()
    const password = useRef()
    const { isFetching, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register')
    }
    // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({
            email: email.current.value,
            password: password.current.value
        }
            , dispatch);
        // console.log(email.current.value)
        // console.log(password.current.value)
    };


    // const google=()=>{
    //     window.open("http://localhost:8800/api/auth/google","_self")
    // }
    // const facebook=()=>{
    //     window.open("http://localhost:8800/api/auth/facebook","_self")
    // }
    // const github=()=>{
    //     window.open("http://localhost:8800/api/auth/github","_self")
    // }
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social</h3>
                    <span className="loginDesc">Connect with others</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">

                        <form className='formBox' onSubmit={handleClick}>
                            <input type='email' ref={email} placeholder="Email" className="loginInput" required />
                            <input type='password' ref={password} placeholder="Password" className="loginInput" required />
                            <button className="loginButton" type='submit'>
                                {/* Log In */}
                                {isFetching ? <CircularProgress style={{ color: 'white' }} /> : "Log In"}
                            </button>
                            <span className="loginForgot">Forgot Password?</span>

                            {/* <div className="socialLoginContainer">
                        <img onClick={facebook} className='socialLogin' src={PF + "/facebook.png"} alt="" />
                        <img onClick={google} className='socialLogin' src={PF + "/google.png"} alt="" />
                        <img onClick={github} className='socialLogin' src={PF + "/github.png"} alt="" />
                        
                    </div> */}

                        </form>
                        <button onClick={handleRegister} className="loginRegisterButton">
                            Create a New Account
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login