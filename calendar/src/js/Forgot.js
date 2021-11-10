import React from 'react';
import {Link} from "react-router-dom";
import '../css/forgot.css'

function RenderForgot()
{
    return (
        <div className='Forgot_Form'>
            <div className="center">
                <h1>Enter Name and Email </h1>
                <form>
                    <div className="data">
                        <input type="text" required/>
                            <span/>
                            <label>UserName</label>
                    </div>
                    <div className="data">
                        <input type="text" required/>
                            <span/>
                            <label>email</label>
                    </div>
                    <input type="submit" value="Get new password"/>
                    <Link to='/'><button>Cancel</button></Link>
                </form>
            </div>
        </div>
    );
}
export  default RenderForgot;