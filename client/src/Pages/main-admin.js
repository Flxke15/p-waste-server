import React from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import axios from "axios";
import {useState,useEffect} from "react";
import Swal from "sweetalert2";
import {Routes, Route, useNavigate} from 'react-router-dom';
import UserList from "../component/UserList";
import ".//pages.css"
import Cookies from 'universal-cookie';
import Point from "../component/Point";
import History from "../component/History";
import Information from "../component/Information";

function MainAdmin(){
    const navigate = useNavigate();
    const [show,toggleShow] = useState(true)
    const [userList,setUserList] = useState([]);
    const cookies = new Cookies();
    const [name,setName] = useState({});
    const logout = () =>{
         cookies.remove('User',{path:'/'})
         navigate('/login');
    }

    useEffect(()=>{
        if (cookies.get('User') == undefined){
            navigate('/login');
        }else {
            setName(cookies.get('User'));
        }
        console.log(cookies.get('User'));
    },[])

        return(
            <div className="App container">
                <Navbar/>
                <div style={{justifyContent:"flex-end",display:"flex"}}>
                    <div className='profile-box'>
                        <p>Admin : {name.Surname} </p>
                        <button className='btn btn-secondary' onClick={logout}>Logout</button>
                    </div>
                </div>

                <div className='row border'>
                    <div className='row'>
                        <div className='col'>
                            <h1>จุดให้บริการ</h1>
                        </div>
                        <div className='col' style={{display:"flex",justifyContent:"flex-end"}}>
                            <a className='btn btn-success' href='/addPoint' role='button' style={{display:"flex"}}>เพิ่มจุดให้บริการ</a>
                        </div>
                    </div>

                    <div className='row'>
                        <Point/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col border' >
                        <h1>History</h1>
                        <History/>
                    </div>
                    <div className='col border'>
                        <h1>Information</h1>
                        <Information/>
                    </div>
                </div>

                <div className='row border'>
                    <div className='row'>
                        <h1>User</h1>
                    </div>
                    <div className='row'>
                        <a className='btn btn-success' href='/addUser' role='button' style={{display:"flex"}}>AddUser</a>
                        <button className={'btn btn-primary'} onClick={() =>toggleShow(!show)} style={{display:"flex",textAlign:"center"}}>
                            {show ? "Show User" : "Hide" }
                        </button>
                        <br/><br/>
                        {!show &&
                            <UserList/>
                        }
                    </div>
                </div>

                <Footer/>
            </div>
        )
}

export default MainAdmin;