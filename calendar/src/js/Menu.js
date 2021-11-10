import React from 'react';
import '../css/menu.css';
import RenderLogOut from "./functions";
import {CheckPassword, ShowManageAccount,ChangeData,check,AddFriend,ShowDeleteAccount} from './functions';
import {start,func,Display,ShowAddEvent,AddEvent,ShowUpdateEvent,UpdateEvent,moveDate,ShowShareEvent,ShareEvent,DeleteEvent,ShowDeleteEvent} from "./calendar_functions";
import tab from '../img/tab.png';
import cncl from '../img/cancel.png';
import prev from '../img/prev.png';
import next from '../img/next.png';
import {ReactSession} from 'react-client-session';
function RenderMenu()
{
    if (ReactSession.get('id'))
        return (
            <div className='Menu_Form' onLoad={start}>
            <input type="checkbox" id="check"/>
                <label htmlFor="check">
                    <img onClick={check} src={tab} id="btn"/>
                    <img src={cncl} id="cncl"/>
                </label>

                <div className="sidebar" onLoad={check}>
                    <header>My Calendar</header>
                    <ul>
                        <li><a href={'#'} onClick={function(){func('Settings')}}>Setting</a></li>
                        <li><a href={'#'} onClick={function(){Display('AddFriend')}}>Add Friend</a></li>
                        <li><a>About</a></li>
                    </ul>
                </div>
                <div className="nav">
                    <RenderLogOut/>
                    <a id="user" onClick={ShowManageAccount}>Logged as {[ReactSession.get('username')]}</a>
                </div>
                <div className="wrapper">
                    <div id="calendar" className="calendar">
                        <div className="month">
                            <div className="prev">
                                <span><img src={prev} onClick={function (){moveDate('prev')}}/></span>
                            </div>
                            <div>
                                <h2 id="month"/>
                                <p id="date"/>
                            </div>
                            <div className="next" onClick="">
                                <span><img src={next} onClick={function (){moveDate('next')}}/></span>
                            </div>
                        </div>
                        <div className="week">
                            <div>Sun</div>
                            <div>Mon</div>
                            <div>Tue</div>
                            <div>Wed</div>
                            <div>Thu</div>
                            <div>Fri</div>
                            <div>Sat</div>
                        </div>
                        <div className="days"/>
                    </div>
                    <div id="ManageEvents" >
                        <h1 >Events</h1>
                        <table id="events">
                            <thead>
                            <col width="150px"/>
                            <col width="140px"/>
                            <tr>
                                <th>Name</th>
                                <th>time</th>
                                <th>description</th>
                            </tr>
                            </thead>
                            <tbody id="tableData">
                            </tbody>
                        </table>
                        <div className="Events">
                            <a className="add" onClick={ShowAddEvent}>Add Event</a>
                            <a className="update" onClick={ShowUpdateEvent}>Update Event</a>
                            <a className="add"  onClick={ShowShareEvent} style={{backgroundColor:"antiquewhite"}}>Share Event</a>
                            <a className="delete" onClick={ShowDeleteEvent}>Delete Event</a>
                        </div>
                    </div>
                    <div id="Settings" style={{display:'none'}}>
                        <div className="Settings">
                            <h1>Settings</h1>
                            <ul>
                                <li>
                                    <button>do smth</button>
                                </li>
                                <li>
                                    <button>do smth else</button>
                                </li>
                                <li id="admin">
                                    <button onClick={function(){alert('magic !')}}>admin tricks</button>
                                </li>
                                <li>
                                    <button style={{backgroundColor:'crimson',color:'whitesmoke'}} className="delete" onClick={ShowDeleteAccount}>delete account</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="pop_up">
                    <div id="back" style={{display:'none'}}/>
                    <div id="AddEvent" className="popup_box" style={{display:'none'}}>
                        <div className="content">
                            <h1 id="mes_add">Create new Event</h1>
                            <form>
                                <div className="data">
                                    <input type="text" id="name" placeholder=" "/>
                                        <span/>
                                        <label>Name</label>
                                </div>
                                <div className="data">
                                    <input type="text" id="time" placeholder=" "/>
                                        <span/>
                                        <label>Time</label>
                                </div>
                                <div className="data">
                                    <input type="text" id="date_" placeholder=" "/>
                                        <span/>
                                        <label>dd/mm/yy</label>
                                </div>
                                <div className="data">
                                    <input type="text" id="desc" placeholder=" "/>
                                        <span/>
                                        <label>description</label>
                                </div>
                                <input type="submit" onClick={AddEvent} value="Save"/>
                            </form>
                            <form>
                                <button onClick={ShowAddEvent} className="exit">Cancel</button>
                            </form>
                        </div>
                    </div>
                    <div id="UpdateEvent" className="popup_box" style={{display:'none'}}>
                        <div className="content">
                            <h1 id="mes_up">Update Event</h1>
                            <form>
                                <div className="data">
                                    <input type="text" id="up_name" placeholder=" "/>
                                        <span/>
                                        <label>Name</label>
                                </div>
                                <div className="data">
                                    <input type="text" id="up_time" placeholder=" "/>
                                        <span/>
                                        <label>time</label>
                                </div>
                                <div className="data">
                                    <input type="text" id="up_date" placeholder=" "/>
                                        <span/>
                                        <label>dd/mm/yy</label>
                                </div>
                                <div className="data">
                                    <input type="text" id="up_desc" placeholder=" "/>
                                        <span/>
                                        <label>description</label>
                                </div>

                                <input onClick={UpdateEvent} type="submit" value="Save"/>
                            </form>
                            <form >
                                <button onClick={ShowUpdateEvent} className="exit">Cancel</button>
                            </form>
                        </div>
                    </div>
                    <div id="DeleteEvent" className="popup_box" style={{display:'none'}}>
                        <div className="content">
                            <h1 id="mes_del">You sure ?</h1>
                            <form >
                                <input onClick={DeleteEvent} style={{marginTop:20}} type="submit" value="Save"/>
                            </form>
                            <form>
                                <button onClick={ShowDeleteEvent} className="exit">Cancel</button>
                            </form>
                        </div>
                    </div>
                    <div id="ShareEvent" className="popup_box" style={{display:'none'}}>
                        <div className="content">
                            <h1 id="mes_share_event">Share Event(s) with a friend</h1>
                            <div id="friends">
                                <table id="friends_table">
                                </table>

                            </div>
                            <form>
                                <input onClick={ShareEvent} type="submit" value="Yes"/>
                            </form>
                            <form>
                                <button onClick={ShowShareEvent} className="exit">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
    {/*====================================================*/}
                <div className="pop_up">
                    <div id="DeleteAccount" className="popup_box" style={{display:'none'}}>
                        <div className="content">
                            <h1 id="mes_del_acc">Delete Account</h1>
                            <form>
                                <input  type="submit" style={{marginTop:25}} value="Yes"/>
                            </form>
                            <form>
                                <button onClick={ShowDeleteAccount} className="exit">Cancel</button>
                            </form>
                        </div>
                    </div>
                    <div id="AddFriend" className="popup_box" style={{display:'none'}}>
                        <div className="content">
                            <h1 id="mes_add_friend">Add Friend</h1>
                            <form>
                                <div className="data">
                                    <input type="text" id="friend_name" placeholder=" "/>
                                        <span/>
                                        <label>Name</label>
                                </div>
                                <input onClick={AddFriend} type="submit" value="Yes"/>
                            </form>
                            <form>
                                <button onClick={function(){Display('AddFriend')}} className="exit">Cancel</button>
                            </form>
                        </div>
                    </div>
                    <div id="ManageUser" className="popup_box" style={{display:'none'}}>
                        <div className="content">
                            <div id="message">
                                <h1>Update User Data</h1>
                            </div>
                            <form id="confirm" >
                                <div className="data">
                                    <input type="password" id='check_password' placeholder=" "/>
                                        <span/>
                                        <label>Enter Password</label>
                                </div>
                                <input type="submit" onClick={CheckPassword} value="Confirm"/>
                            </form>

                            <form id="field" style={{display:'none'}}>
                                <div className="data">
                                    <input type="text" id="username"  placeholder=" "/>
                                        <span/>
                                        <label>UserName</label>
                                </div>
                                <div className="data">
                                    <input type="text" id="user_name"  placeholder=" "/>
                                        <span/>
                                        <label>Name</label>
                                </div>
                                <div className="data">
                                    <input type="text" id="surname"  placeholder=" "/>
                                        <span/>
                                        <label>Surname</label>
                                </div>
                                <div className="data">
                                    <input type="text" id="email"  placeholder=" "/>
                                        <span/>
                                        <label>Enter Email</label>
                                </div>
                                <div className="data">
                                    <input type="password" id="password1" placeholder=" "/>
                                        <span/>
                                        <label>New Password</label>
                                </div>
                                <div className="data">
                                    <input type="password" id="password2" placeholder=" "/>
                                        <span/>
                                        <label>Confirm New Password</label>
                                </div>
                                <input type="submit" onClick={ChangeData} value="Save"/>
                            </form>
                            <form>
                                <button onClick={ShowManageAccount} className="exit">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
        );
    return (
        <h1 style={{textAlign:'center', marginTop:200}}>Return to login</h1>
    );
}


export default RenderMenu;