import React, {useState} from "react";
import axios from "axios";
import Navbar from "../component/navbar";
import Footer from "../component/footer";

function MainUser() {
    const [userList,setUserList] = useState([]);

    return(
        <div>
            <Navbar/>
            <a className='btn btn-secondary' href='/Login' role='button' style={{marginRight: 2 + 'em'}}>Go to Login</a>
            <h1>This is Main User Page.</h1>
            <Footer/>
        </div>
    )
}

export default MainUser;