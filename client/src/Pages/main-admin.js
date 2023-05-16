import React from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import axios from "axios";
import {useState} from "react";
import Swal from "sweetalert2";
import {Routes, Route, useNavigate} from 'react-router-dom';

function MainAdmin(){
    const navigate = useNavigate();

    const [userList,setUserList] = useState([]);
    const showUsers = () => {
        axios.get("http://localhost:3001/showUser").then((response) => {
            setUserList(response.data);
        })
    }

    const deleteUser = (id) => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
                    setUserList(
                        userList.filter((val) => {
                            return val.id != id;
                        })
                    )
                    window.location.reload(false);
                })

            } else if (result.isDenied) {
                Swal.fire('Changes are not delete', '', 'info')
            }
        })


    }

    return(
        <div className="App container">
            <Navbar/>
            <h1>This is Main Admin Page.</h1>
            <a className='btn btn-success' href='/addUser' role='button' style={{marginBottom: 2 + 'em'}}>AddUser</a>
            <div className='showUser'>
                <button className={'btn btn-primary'} onClick={showUsers}>Show User</button>
                <br/><br/>
                {userList.map((val,key) =>{
                    return(
                        <div className='employee card'>
                            <div className='card-body text-left'>
                                <p className='card-text'>Surname: {val.Surname}</p>
                                <p className='card-text'>Lastname: {val.Lastname}</p>
                                <p className='card-text'>UID: {val.UID}</p>
                                <p className='card-text'>Address: {val.Address}</p>
                                <p className='card-text'>Role: {val.Role}</p>
                            </div>
                            <button className='btn btn-danger' onClick={() => {deleteUser(val.ID)}} style={{marginBottom:2 +'em'}}>Delete</button>
                        </div>
                    )
                })}
            </div>
            <Footer/>
        </div>
    )
}

export default MainAdmin;