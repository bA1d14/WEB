import React from 'react';
import axios from "axios";
import '../css/login.css';
import {ReactSession} from 'react-client-session';
import {useHistory,Link} from "react-router-dom";

ReactSession.setStoreType("localStorage");
function RenderLogin()
{
    const history = useHistory();
    function Work(event) {
        event.preventDefault();
        var username = document.getElementById('name').value;
        var password = document.getElementById('password').value;
        axios.post('http://localhost:5000/',
            {
                username: username,
                password: password
            })
            .then(resp => {
                if (resp.data.message === 'Success') {
                    ReactSession.set('id',resp.data.id);
                    ReactSession.set('role',resp.data.role);
                    ReactSession.set('username',resp.data.username);
                   history.push('/menu') ;
                }
                else
                {
                    document.getElementById("login").innerHTML =
                        '<h1 style="color:crimson;">'+resp.data.message+'</h1>';
                }
            });

    }
    return (
        <div className='Login_form'>
            <div className="center">
                <div id="login">
                    <h1 id="meta">Login</h1>
                </div>
                <form onSubmit={Work} className="main">
                    <div className="data">
                        <input type="text" id="name" placeholder=" "/>
                        <span/>
                        <label>UserName</label>
                    </div>
                    <div className="data">
                        <input type="password" id="password" placeholder=" "/>
                        <span/>
                        <label>Password</label>
                    </div>
                    <div className="forgot">
                        <Link to='/forgot'>Forgot Password ?</Link>
                    </div>
                    <input  type="submit" value="Login"/>
                    <div className="signup"> First time here ?
                        <Link to='/signup'> SignUp</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default  RenderLogin;