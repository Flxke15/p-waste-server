import React, {useState} from "react";
import axios from "axios";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Point from "../component/Point";
import History from "../component/History";
import UserList from "../component/UserList";
import PointUser from "../component/user/Point-User";

function MainUser() {
    const navigate = useNavigate();
    const gotologin = () => {
        navigate('/Login')
    }

    return(
        <div className='container'>
            <Navbar/>
            <div style={{justifyContent:"flex-end",display:"flex"}}>
                    <button className='btn btn-primary' onClick={gotologin} style={{marginBottom:"10px"}}>Go to Login</button>
            </div>

            <div className='row border'>
                <div className='row' style={{padding:"20px"}}>
                        <h1>จุดให้บริการ</h1>
                </div>

                <div className='row'>
                    <PointUser/>
                </div>
            </div>

            <div className='row'>
                <div className='col border' >
                    <h1>History</h1>
                    <History/>
                </div>
                <div className='col border'>
                    <h1>Information</h1>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default MainUser;