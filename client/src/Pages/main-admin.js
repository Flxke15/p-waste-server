import React from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import axios from "axios";
import {useState} from "react";
import Swal from "sweetalert2";
import {Routes, Route, useNavigate} from 'react-router-dom';
import UserList from "../component/UserList";
import ".//pages.css"

function MainAdmin(){
    const navigate = useNavigate();

    const [show,toggleShow] = useState(true)

    const [userList,setUserList] = useState([]);
    const showUsers = () => {
        axios.get("http://localhost:3001/showUser").then((response) => {
            setUserList(response.data);
        })
    }


    return(
        <div className="App container">
            <Navbar/>
            <h1>This is Main Admin Page. <a className='btn btn-secondary' href='/Login' role='button' style={{marginRight: 2 + 'em'}}>Go to Login</a></h1>

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
                    <a className='btn btn-success' href='/addUser' role='button' style={{marginRight: 2 + 'em'}}>AddUser</a>
                    <button className={'btn btn-primary'} onClick={() =>toggleShow(!show)} style={{marginRight: 2 + 'em'}}>
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