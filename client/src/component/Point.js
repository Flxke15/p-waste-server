import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Point(){
    const [pointlist,setPointList] = useState([]);

    const showPoint = () =>{
        axios.get("http://localhost:3001/showPoint").then((response) =>{
            setPointList(response.data)
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
                    <th scope='col'>Name</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Map</th>
                </tr>
                </thead>
                {showPoint()}
                {pointlist.map((val,key) => {
                    return(
                        <tbody>
                        <tr>
                            <th scope='row'>{val.ID}</th>
                            <td>{val.Name}</td>
                            <td>{val.Address}</td>
                            <td><a href={val.link} type='button btn btn-primary' target='_blank' className='btn btn-primary'>Link</a></td>
                        </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
    )
}
export  default Point;