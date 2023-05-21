import React, {useEffect, useState} from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import Cookies from 'universal-cookie';
import {Routes, Route, useNavigate} from 'react-router-dom';
import UserList from "../component/UserList";

function MainOwner(){
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [name,setName] = useState({});

    useEffect(()=>{
        if (cookies.get('User') == undefined){
            navigate('/login');
        }else {
            setName(cookies.get('User'));
        }
        console.log(cookies.get('User'));
    },[])

    const logout = () =>{
        cookies.remove('User',{path:'/'})
        navigate('/login');
    }

    return(
        <div>
            <Navbar/>
            <div style={{justifyContent:"flex-end",display:"flex"}}>
                <div className='profile-box'>
                    <p>Owner : {name.Surname} </p>
                    <button className='btn btn-secondary' onClick={logout}>Logout</button>
                </div>
            </div>
            <div className='row'>
                <div className='col border'>
                    <h1>History</h1>
                </div>
                <div className='col border'>
                    <h1>เวลาการทำงาน</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col border'>
                    <h1>Point</h1>
                </div>
                <div className='col border'>
                    <h1>User</h1>
                    <br/><br/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default MainOwner;