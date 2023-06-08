import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

function History(){
    const [historylist,setHistoryList] = useState([]);

    const [lastHistory,setLastHistory] = useState([]);
    const [roleUID,setRoleUID] = useState([]);
    const [status,setStatus] = useState([]);

    const [currentPage,setCurrentPage] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = historylist.slice(firstIndex,lastIndex);
    const npage = Math.ceil(historylist.length/recordsPerPage)
    const numbers = [...Array(npage+1).keys()].slice(1)



    const showHistory = () =>{
        axios.get("http://localhost:3001/showHistory").then((response) =>{
            setHistoryList(response.data)
        })
    }

    function prePage(){
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1)

        }
    }
    function changeCPage(id){
        setCurrentPage(id)

    }
    function nextPage(){
        if(currentPage !== npage){
            setCurrentPage(currentPage + 1)

        }
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
                {records.map((val,key) => {
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
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={prePage}>Prev</a>
                    </li>
                    {
                        numbers.map((n,i)=>(
                            <li className={`page-item ${currentPage === n ? `active` : ``}`} key={i}>
                                <a href='#' className='page-link' onClick={()=>changeCPage(n)} >{n}</a>
                            </li>
                        ))
                    }
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export  default History;