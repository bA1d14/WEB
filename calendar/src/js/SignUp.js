import React from 'react';
import axios from "axios";
import '../css/sign_up.css'
import {Link, useHistory} from "react-router-dom";


function RenderSignUp()
{
    const history = useHistory();
    function Work(event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var surname = document.getElementById('surname').value;
        var username = document.getElementById('username').value;
        var password1 = document.getElementById('password1').value;
        var password2 = document.getElementById('password2').value
        var email = document.getElementById('email').value;
        axios.post('http://localhost:5000/sign_up',
            {
                name:name,
                surname:surname,
                username:username,
                password1:password1,
                password2:password2,
                email:email
            })
            .then(resp => {
                if (resp.data.message === 'Success') {
                    history.push('/menu') ;
                }
                else
                {
                    document.getElementById("message").innerHTML =
                        '<h1 style="color:crimson;">'+resp.data.message+'</h1>';
                }
            });

    }
    return (
     <div className='SignUp_Form'>
         <div className="center">
             <div id="message">
                 <h1>Register</h1>
             </div>
             <form>
                 <div className="data">
                     <input type="text" id="name" placeholder=" "/>
                         <span/>
                         <label>Name</label>
                 </div>
                 <div className="data">
                     <input type="text" id="surname" placeholder=" "/>
                         <span/>
                         <label>Surname</label>
                 </div>
                 <div className="data">
                     <input type="text" id="username" placeholder=" "/>
                         <span/>
                         <label>UserName</label>
                 </div>
                 <div className="data">
                     <input type="password" id="password1" placeholder=" "/>
                         <span/>
                         <label>Password</label>
                 </div>
                 <div className="data">
                     <input type="password" id="password2" placeholder=" "/>
                         <span/>
                         <label>Repeat password</label>
                 </div>
                 <div className="data">
                     <input type="text" id="email" placeholder=" "/>
                         <span/>
                         <label>Enter Email</label>
                 </div>
                 <h4>password must have 3 numbers + 5 letters (1 upper)</h4>
                 <input onClick={Work} type="submit" value="Register"/>
                 <Link to='/'><button>Cancel</button></Link>
             </form>
         </div>
     </div>
 );
}

export default  RenderSignUp;