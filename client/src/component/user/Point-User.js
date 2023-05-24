import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';

function PointUser(){
    const [pointlist,setPointList] = useState([]);

    const [lastHistory,setLastHistory] = useState([]);
    const [roleUID,setRoleUID] = useState([]);
    const [status,setStatus] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3001/getLastHistory").then((response) => {
            setLastHistory(response.data);
        })
        lastHistory.map((his,key) => {
            axios.get(`http://localhost:3001/checkRole/${his.UID}`).then((response) => {
                setRoleUID(response.data);
            })
            roleUID.map((role,key)=>{
                if (role.Role == "U"){
                    axios.put(`http://localhost:3001/updateStatusU/${his.Point}`).then((response) => {
                        setStatus(response.data);
                    })
                }
                else if (role.Role == "C"){
                    axios.put(`http://localhost:3001/updateStatusC/${his.Point}`).then((response) => {
                        setStatus(response.data);
                    })
                }else {}
            })
        })
    },[])

    const showPoint = () =>{
        axios.get("http://localhost:3001/showPoint").then((response) =>{
            setPointList(response.data)
        })
    }

    const deletePoint = (id) => {
        Swal.fire({
            title: 'Do you want to Delete?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/deletePoint/${id}`).then((response) => {
                    setPointList(
                        pointlist.filter((val) => {
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
            <div>
                <table className='table'>
                    <thead>
                    <tr>
                        <th scope='col'>Point</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Map</th>

                    </tr>
                    </thead>
                    {showPoint()}
                    {pointlist.map((val,key) => {
                        return(
                            <tbody>
                            <tr>
                                <th scope='row'>{val.Point}</th>
                                <td>{val.Name}</td>
                                <td>{val.Address}</td>
                                <td>{val.Status}</td>
                                <td><a href={val.Link} type='button' target='_blank' className='btn btn-primary'>Link</a></td>

                            </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        )
}
export  default PointUser;