import React from 'react'
import axios from "axios";
import {Display} from "./calendar_functions";
import {ReactSession} from "react-client-session";
import {useHistory} from "react-router-dom";
import {ShowShareEvent} from "./calendar_functions";
let chosen_friends=[];

function func(id)
{
    const x = document.getElementById(id);
    if(x.style.display === "block")
        x.style.display = "none";
    else
        x.style.display = "block";
}
function Show_Fields(event)
{
    event.preventDefault();
    const x = document.getElementById("field");
    const y = document.getElementById("confirm");
    document.getElementById("check_password").value='';
    x.style.display = "none";
    y.style.display = "block";

}
function ShowAccess(event)
{
    event.preventDefault();
    const x = document.getElementById("field");
    const y = document.getElementById("confirm");
    document.getElementById("check_password").value='';
        y.style.display = "none";
        x.style.display = "block";
}
function ShowManageAccount(event)
{
    event.preventDefault();
    func('back');
    func('ManageUser');
    Show_Fields(event);
}

function CheckPassword(event)
{
    event.preventDefault();
    var check=document.getElementById('check_password').value;
    axios('http://localhost:5000/user',{
            method:'POST',
            credentials: "include",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                withCredentials: true,
                mode: 'no-cors',
            },
            data: {
                check:check,
                id:ReactSession.get('id')
            }
        }
    )
        .then(resp => {
            if (resp.data.message==='Success'){
                ShowAccess(event);
                document.getElementById("username").value=resp.data.username;
                document.getElementById("user_name").value=resp.data.name;
                document.getElementById("surname").value=resp.data.surname;
                document.getElementById("email").value=resp.data.email;
                document.getElementById("message").innerHTML ='<h1>Update User Data</h1>';
            }
            else
                document.getElementById("message").innerHTML ='<h1 style="color:crimson;">Access denied</h1>';
        });
}

function ChangeData(event)
{
    event.preventDefault();
    var name_value=document.getElementById('user_name').value;
    var surname_value=document.getElementById('surname').value;
    var username_value=document.getElementById('username').value;
    var password_value1=document.getElementById('password1').value;
    var password_value2=document.getElementById('password2').value;
    var email_value=document.getElementById('email').value;

    axios('http://localhost:5000/change_user_data',{
            method:'POST',
            credentials: "include",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                withCredentials: true,
                mode: 'no-cors',
            },
            data: {
                name:name_value,
                surname:surname_value,
                username:username_value,
                password1:password_value1,
                password2:password_value2,
                email:email_value,
                id:ReactSession.get('id')
            }
        }
    )
        .then(resp => {
            if (resp.data.message==='Success'){
                ReactSession.set('username',resp.data.username);
                document.getElementById('user').innerText = 'Logged as '+resp.data.username;
                func('ManageUser');
                func('back');
            }

            else
                document.getElementById("message").innerHTML ='<h1 style="color:crimson;">'+resp.data.message+'</h1>';
        });

}

function RenderLogOut()
{
    const history = useHistory();
    function LogOut(event)
    {
        event.preventDefault();
        ReactSession.set('id',null);
        history.push('/');
    }
    return (
        <a id="logout" onClick={LogOut}>Log Out</a>
    );
}

function  check()
{
    var x = document.getElementById('admin');
    if(ReactSession.get('role')==='admin'){

        if (x.style.display === 'none')
            x.style.display = 'block';
    }
    else
        x.style.display = 'none';
}

function AddFriend(event)
{
    event.preventDefault();
    var name = document.getElementById('friend_name').value;
    axios('http://localhost:5000/add_friend',{
            method:'POST',
            credentials: "include",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                withCredentials: true,
                mode: 'no-cors',
            },
            data: {
                name:name,
                id:ReactSession.get('id')
            }
        }
    )
        .then(resp => {
            if (resp.data.message==='Success') {
                Display('AddFriend')
            }
            else
                document.getElementById("mes_add_friend").innerHTML
                    ='<h1 style="color:lightblue;">'+resp.data.message+'</h1>';
        });
}

// function DeleteAccount(event)
// {
//     var history = useHistory();
//     event.preventDefault();
//     function Work(event)
//     {
//         event.preventDefault();
//         axios('http://localhost:5000/delete_account',{
//                 method:'POST',
//                 credentials: "include",
//                 headers:{
//                     'Access-Control-Allow-Origin': '*',
//                     'Content-Type': 'application/json',
//                     withCredentials: true,
//                     mode: 'no-cors',
//                 },
//                 data: {
//                     id:ReactSession.get('id')
//                 }
//             }
//         )
//             .then(resp => {
//                 if (resp.data.message==='Success') {
//                     history.push('/');
//                 }
//             });
//     }
//     Work(event);
// }
function ShowDeleteAccount(event)
{
    event.preventDefault();
    func('back');
    var x = document.getElementById('DeleteAccount');
    if (x.style.display === 'none')
        x.style.display = 'block';
    else
        x.style.display = 'none';
}



export {
    CheckPassword,
    ShowManageAccount,
    ChangeData,
    check,
    AddFriend,
    ShowDeleteAccount
}

export  default RenderLogOut;