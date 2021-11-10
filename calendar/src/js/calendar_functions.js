import React from 'react'
import axios from "axios";
import {ReactSession} from 'react-client-session';
let chosen_friends=[];
ReactSession.setStoreType("localStorage");

var dt = new Date();
var temp = new Date();
var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
var current_day;
var prev_id=123;
var chosen_events=[];

function func(id)
{
    const x = document.getElementById(id);
    if(x.style.display === "block")
        x.style.display = "none";
    else
        x.style.display = "block";
}

function start()
{
    console.clear();
    dt.setDate(1);
    const day = dt.getDay();

    const EndDate = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
    const prevDate = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();

    const today = new Date().getDate();
    document.getElementById("date").innerHTML=dt.toDateString();
    document.getElementById("month").innerHTML=months[dt.getMonth()];
    var cells="";
    for (var x=day;x>0;x--)
        cells+="<div id="+'prev_'+x+"  class='prev_date'>" + (prevDate-x+1) +"</div>";

    for (var i=1;i<=EndDate;i++)
    {
        if( i===today)
        {
            if(dt.getMonth()===temp.getMonth()&&dt.getYear()===temp.getYear())
                cells+="<div id="+i+" class='today'>" +i +"</div>";
            else
                cells+="<div id="+i+" class='not_today' >" +i +"</div>";
        }
        else
            cells+="<div id="+i+">" +i +"</div>";
    }
    document.getElementsByClassName("days")[0].innerHTML=cells;
    for (let i = 0;i<=EndDate;i++){
        var el =document.getElementById (i);
        if(el)
            el.addEventListener ("click", function (){GetEventsForDay(i);}, false);
    }

    for (x=day;x>0;x--){
        el =document.getElementById ('prev_'+x);
        if(el)
            el.addEventListener ("click", function (){moveDate('prev')}, false);
    }
}

function moveDate(param)
{
    if(param==='next')
        dt.setMonth(dt.getMonth()+1);
    else
        dt.setMonth(dt.getMonth()-1);
    start();
    setTimeout('', 1000);
    GetEventsForDay();
}

function GetEventsForDay(date=current_day)
{
    try{document.getElementById(prev_id).style.borderColor = "HoneyDew";
        document.getElementById(date).style.borderColor = "crimson";
    }
    catch {}

    prev_id=date;
    const month = dt.getMonth() + 1;
    const year = dt.getFullYear();
    chosen_events=[];

    current_day=date;
    axios.post('http://localhost:5000/get_events',
        {
            day:date,
            month:month,
            year:year,
            id:ReactSession.get('id').toString()
        })
        .then(user_events => {
            var x = document.getElementById('ManageEvents');
            x.style.display = "block";
            var tmp = document.getElementById('tableData');
            var temp="";
            if (!user_events.data.message){
                try {
                    var temp_array =user_events.data.user_list;
                    temp_array.sort(function (a, b) {
                        return a['time'].localeCompare(b['time']);
                    });
                    for (let key in temp_array){
                        let arr=temp_array[key];
                        temp+="<tr id="+(1+key)+"00><td>"+arr['name']+"</td><td>"+arr['time']+"</td><td>"+arr['description']+"</td></tr>";
                    }
                    tmp.innerHTML=temp;
                    for (let key in temp_array)
                    {
                        let t = document.getElementById((1+key)*100);
                        if(t)
                            t.addEventListener("click", function (){GetClickedEvent((1+key)*100)}, false);
                    }
                }
                catch(error) {
                    temp+="<tr><td>new event</td><td>hour</td><td>a few words</td></tr>";
                    tmp.innerHTML=temp;
                }
            }
            else{
                temp+="<tr><td>new event</td><td>hour</td><td>a few words</td></tr>";
                tmp.innerHTML=temp;
            }
        });
}

function GetClickedEvent(id)
{
    var table = document.getElementById(id);
    if(table.style.backgroundColor !== "lightgreen"){
        table.style.backgroundColor = "lightgreen";
        chosen_events.push(id);
    }
    else{
        table.style.backgroundColor = "white";
        chosen_events.splice(chosen_events.indexOf(id),1);
    }
}

function  Display(id)
{
    func('back');
    const x = document.getElementById(id);
    if(x.style.display==='none')
        x.style.display='block';
    else
        x.style.display='none';
}

function ShowAddEvent(event)
{
    event.preventDefault();
    Display('AddEvent');
    document.getElementById("mes_add").innerHTML='<h1>Create new Event</h1>';
    document.getElementById("name").value = "";
    document.getElementById("time").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("date_").value =current_day+'/'+(dt.getMonth()+1)+'/'+dt.getFullYear();
}

function AddEvent(event)
{
    event.preventDefault();
    var name = document.getElementById('name').value;
    var time = document.getElementById('time').value;
    var date = document.getElementById('date_').value;
    var desc = document.getElementById('desc').value;
    axios('http://localhost:5000/add_event',{
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
        time:time,
        date:date,
        desc:desc,
        id:ReactSession.get('id')
    }
    }
        )
        .then(resp => {
                if (resp.data.message==='Success') {
                    ShowAddEvent(event);
                    GetEventsForDay();
                }
            else
            {
                document.getElementById("mes_add").innerHTML =
                    '<h1 style="color:lightblue;">'+resp.data.message+'</h1>';
            }
        });
}

function ShowUpdateEvent(event)
{
    event.preventDefault();
    if(chosen_events.length!==0) {
        Display('UpdateEvent');
        var table = document.getElementById(chosen_events[0]);
        document.getElementById("mes_up").innerHTML = '<h1>Update Event</h1>';
        document.getElementById("up_name").value = table.cells[0].innerHTML;
        document.getElementById("up_time").value = table.cells[1].innerHTML;
        document.getElementById("up_desc").value = table.cells[2].innerHTML;
        document.getElementById("up_date").value = current_day + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();
    }
}

function UpdateEvent(event)
{
    event.preventDefault();
    var name = document.getElementById('up_name').value;
    var time = document.getElementById('up_time').value;
    var date = document.getElementById('up_date').value;
    var desc = document.getElementById('up_desc').value;
    var get_event = document.getElementById(chosen_events[0]);

    axios('http://localhost:5000/update_event',{
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
                time:time,
                date:date,
                desc:desc,
                get_name:get_event.cells[0].innerHTML,
                get_time:get_event.cells[1].innerHTML,
                get_desc:get_event.cells[2].innerHTML,
                id:ReactSession.get('id')
            }
        }
    )
        .then(resp => {
            if (resp.data.message==='Success') {
                ShowUpdateEvent(event);
                GetEventsForDay();
            }
            else
            {
                document.getElementById("mes_up").innerHTML =
                    '<h1 style="color:lightblue;">'+resp.data.message+'</h1>';
            }
        });
}

function ShowShareEvent(event)
{
    event.preventDefault();
    if(chosen_events.length!==0) {
        func('back');
        chosen_friends=[];
        var x = document.getElementById('ShareEvent');
        if (x.style.display !== 'none')
            x.style.display = 'none';
        else{
            x.style.display = 'block';
            let text='';
            axios('http://localhost:5000/get_friends',{
                    method:'POST',
                    credentials: "include",
                    headers:{
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        withCredentials: true,
                        mode: 'no-cors',
                    },
                data: {
                    id:ReactSession.get('id')
                }
                }
            )
                .then(resp => {
                    if (resp.data.message==='Success') {
                        let friends=resp.data.friend_list;
                        for (let elem in friends)
                            text+='<tr><td id=fr_'+elem+'>'+friends[elem]+'</td></tr>';
                        let tbl =document.getElementById('friends_table');
                        tbl.innerHTML=text;
                        for (let elem in friends){
                            let t = document.getElementById('fr_'+elem);
                            if (t)
                                t.addEventListener("click",function(){SelectFriend('fr_'+elem)},false);
                        }
                    }
                });
        }
    }
}

function ShareEvent(event)
{
    event.preventDefault();
    var names=[];
    for (var a of chosen_events){
        var temp = document.getElementById(a);
        names.push(temp.cells[0].innerHTML);
    }
    axios('http://localhost:5000/share_event',{
            method:'POST',
            credentials: "include",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                withCredentials: true,
                mode: 'no-cors',
            },
            data: {
                chosen_friends:chosen_friends,
                chosen_events:names,
                date:current_day + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear(),
                id:ReactSession.get('id')
            }
        }
    )
        .then(resp => {
            if (resp.data.message==='Success') {
                    ShowShareEvent(event);
                }
                else
                    document.getElementById("mes_share_event").innerHTML =
                        '<h1 style="color:lightblue;">'+resp.data.message+'</h1>';

        });
}

function SelectFriend(id)
{
    var x = document.getElementById(id);
    if(x.style.backgroundColor==='aquamarine')
    {
        chosen_friends.splice(chosen_friends.indexOf(x.innerHTML));
        x.style.backgroundColor='white'
    }
    else
    {
        chosen_friends.push(x.innerHTML);
        x.style.backgroundColor='aquamarine';
    }
}

function ShowDeleteEvent(event)
{
    event.preventDefault();
    if(chosen_events.length!==0) {
        Display('DeleteEvent');
    }
}

function DeleteEvent(event)
{
    event.preventDefault();
    var names=[];
    for (var a of chosen_events){
        var temp = document.getElementById(a);
        names.push(temp.cells[0].innerHTML);
    }

    axios('http://localhost:5000/delete_event',{
            method:'POST',
            credentials: "include",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                withCredentials: true,
                mode: 'no-cors',
            },
            data: {
                names:names,
                date:current_day + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear(),
                id:ReactSession.get('id')
            }
        }
    )
        .then(resp => {
            if (resp.data.message==='Success'){
                ShowDeleteEvent(event);
                GetEventsForDay();
            }
            else
                document.getElementById("mes_del").innerHTML
                    ='<h1 style="color:lightblue;">'+resp.data.message+'</h1>';
        });
}
























export {
    start,
    func,
    GetEventsForDay,
    ShowAddEvent,
    Display,
    moveDate,
    AddEvent,
    ShowUpdateEvent,
    UpdateEvent,
    ShowShareEvent,
    ShareEvent,
    ShowDeleteEvent,
    DeleteEvent
}