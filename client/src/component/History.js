import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

function History(){
    const [historylist,setHistoryList] = useState([]);

    const showHistory = () =>{
        axios.get("http://localhost:3001/showHistory").then((response) =>{
            setHistoryList(response.data)
        })
    }

    const map = () =>{

    }

    return(
        <div>
            <table className='table'>
                <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>UID</th>
                    <th scope='col'>Point</th>
                    <th scope='col'>DateTime</th>
                </tr>
                </thead>
                {showHistory()}
                {historylist.map((val,key) => {
                    return(
                        <tbody>
                        <tr>
                            <th scope='row'>{val.No}</th>
                            <td>{val.UID}</td>
                            <td>{val.Point}</td>
                            <td>{val.Datetime}</td>
                        </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
    )
}
export  default History;