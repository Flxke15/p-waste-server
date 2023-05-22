import React, {useState,useEffect} from "react";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import axios from "axios";
import Swal from "sweetalert2";
import {Routes, Route, useNavigate} from 'react-router-dom';
import {getValue} from "@testing-library/user-event/dist/utils";

function AddUser(){

    const navigate = useNavigate();

    const [surname,setSurname] = useState("");
    const [lastname,setLastname] = useState("");
    const [uid,setUID] = useState("");
    const [address,setAddress] = useState("");
    const [userlist,setUserlist] = useState([]);

    const [getuid,setGetUID] = useState([]);
    const [userList,setUserList] = useState([]);


    const adduser = () => {
        axios.post('http://localhost:3001/adduser', {
            surname : surname,
            lastname : lastname,
            uid : uid,
            address : address
        }).then(() => {
            setUserlist([
                ...userlist,
                {
                    surname : surname,
                    lastname : lastname,
                    uid : uid,
                    address : address
                }
            ])
        })
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })
        navigate('/mainAdmin');
    }

    // useEffect(()=>{
    //     axios.get("http://localhost:3001/getUID").then((response) => {
    //         setGetUID(response.data);
    //     })
    //
    // },[])

    useEffect(()=>{
        getuid.map((val,key)=>{
            setUID(val.UID)
        })

    },[getuid])

    const getUID = async(event) => {
        event.preventDefault(false);
        await axios.get("http://localhost:3001/getUID").then((response) => {
            setGetUID(response.data);
        })
        Swal.fire({
            title : "Generate Success !",
        })

        console.log(getuid)
    }


    return(
        <div className='App container'>
            <Navbar/>

            <a href='/mainAdmin' role='button' className='btn btn-primary'>Back to home</a>
            <div className='adduser'>
                <form action='' >
                    <div className='mb-3'>
                        <label htmlFor='surname' className='form-label'>Surname :</label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Enter Surname...'
                            onChange={(event) => {
                                setSurname(event.target.value)
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='lastname' className='form-label'>Lastname :</label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Enter Lastname...'
                            onChange={(event) => {
                                setLastname(event.target.value)
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='uid' className='form-label'><mark><u>Please Scan RFID before Press Scan UID button</u></mark>
                            <button className='btn btn-primary' style={{marginLeft : 1 + 'em'}} onClick={getUID}>Scan UID</button>
                        </label>
                        <div>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter UID...'
                                value={uid}
                                onChange={(event) => {
                                    setUID(event.target.value)
                                }}
                                disabled
                            />
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='address' className='form-label'>Address :</label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Enter Address...'
                            onChange={(event) => {
                                setAddress(event.target.value)
                            }}
                        />
                    </div>
                    <button className='btn btn-success' onClick={adduser}>Save</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default AddUser;