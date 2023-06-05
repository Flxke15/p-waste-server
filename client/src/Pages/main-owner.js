import React, {useEffect, useState} from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import Cookies from 'universal-cookie';
import {Routes, Route, useNavigate} from 'react-router-dom';
import UserList from "../component/admin/UserList";
import History from "../component/History";
import Information from "../component/Information";
import PointOwner from "../component/owner/Point-Owner";

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
            <div className='App container' style={{marginBottom:'20px'}}>
                <div style={{justifyContent:"flex-end",display:"flex",marginTop:'10px'}}>
                    <div className='profile-box'>
                        <p>Owner : {name.Surname} </p>
                        <button className='btn btn-secondary' onClick={logout}>Logout</button>
                    </div>
                </div>

                <div className='row border' style={{padding:"20px"}}>
                    <h1>สรุปรายเดือน</h1>
                </div>

                <div className='row border style={{padding:"20px"}}'>
                    <div className='col border' style={{padding:"20px"}}>
                        <h1>History</h1>
                        <History/>
                    </div>
                    <div className='col border' style={{padding:"20px"}}>
                        <h1>เวลาการทำงาน</h1>
                        <Information/>
                    </div>
                </div>

                <div className='row border' style={{padding:"20px"}}>
                    <div className='col'>
                        <h1>Point</h1>
                        <PointOwner/>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default MainOwner;