import {useState , useEffect} from "react";
import axios from "axios";
import Navbar from "../component/navbar";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
function Login() {

    const navigate = useNavigate();

    const  [username,setUsername] = useState("");
    const  [password,setPassword] = useState("");
    const  [loginStatus,setLoginStatus] = useState("")

    const login = () => {
        axios.post("http://localhost:3001/login", {
            username : username,
            password : password,
        }).then((response) => {
            if (response.data.message){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Check your Username or Password',
                    footer: '<a href="/mainUser">Login with Guest Mode</a>'
                })
                //setLoginStatus(response.data.message)
            }else {
                if (response.data[0].Role === "A"){
                    navigate('/mainAdmin');
                    setLoginStatus(response.data[0].Surname)
                }else {
                    navigate('/mainOwner');
                    setLoginStatus(response.data[0].Surname)
                }
            }
        });

    };

    return (
        <div className="App container">
            <Navbar/>
            <div className='information'>
                <form action=''>
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label'>User :</label>
                        <input
                            type={'text'}
                            className={'form-control'}
                            placeholder={'Enter User'}
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='age' className='form-label'>Password :</label>
                        <input
                            type={'password'}
                            className={'form-control'}
                            placeholder={'Enter Password'}
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                        />
                    </div>
                    <div className='login-btn'>
                        <a className='btn btn-secondary' href='/mainUser' role='button' style={{marginRight: 2 + 'em'}}>Login with Guest</a>
                        <a className='btn btn-success' role='button' onClick={login}>Login</a>
                        <h1>{loginStatus}</h1>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Login;
