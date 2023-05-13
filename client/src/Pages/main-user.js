import React, {useState} from "react";
import axios from "axios";
import Navbar from "../component/navbar";
import Footer from "../component/footer";

function MainUser() {
    const [userList,setUserList] = useState([]);
    const showUsers = () => {
        axios.get("http://localhost:3001/showUser").then((response) => {
            setUserList(response.data);
        })
    }
    return(
        <div>
            <Navbar/>
            <h1>This is Main User Page.</h1>
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
                        </div>
                    )
                })}
            </div>
            <Footer/>
        </div>
    )
}

export default MainUser;