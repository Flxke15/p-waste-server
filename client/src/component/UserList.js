import React, {useState,useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

function UserList(){

    const navigate = useNavigate();
    const [userList,setUserList] = useState([]);
    const showUsers = () => {
        axios.get("http://localhost:3001/showUser").then((response) => {
            setUserList(response.data);
        })
    }
    const deleteUser = (id) => {
        Swal.fire({
            title: 'Do you want to Delete?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                    axios.delete(`http://localhost:3001/deleteUser/${id}`).then((response) => {
                    setUserList(
                        userList.filter((val) => {
                            return val.id != id;
                        })
                    )
                    window.location.reload(false);
                })
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Delete Success',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (result.isDenied) {
                Swal.fire('Changes are not delete', '', 'info')
            }
        })
    }
    return(
        <div className='showUser'>
            {showUsers()}
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

    )
}
export  default UserList;