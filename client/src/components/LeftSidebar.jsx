import React from "react";
import Contacts from "./Contacts";
import {useDispatch, useSelector} from "react-redux";
import {removeCurrentUserAction, removeUsersAction} from "../store/userReducer";
import styled from "styled-components";
import {removeSocketAction} from "../store/socketReducer";

const LeftSidebar = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const socket = useSelector(state => state.socket.socket)

    const logout = ()=>{
        socket.emit('disconnect-user', {userId: currentUser.id})
        socket.disconnect()
        localStorage.removeItem('username')
        dispatch(removeCurrentUserAction())
        dispatch(removeSocketAction())
        dispatch(removeUsersAction())
    }

    return (
        <LeftSidebarStyle>
            <div className='header-current-user'>
                <h1 className='currentUser'>{currentUser.username}</h1>
                <button className='button-logout' onClick={logout}>Вийти</button>
            </div>
            <Contacts/>
        </LeftSidebarStyle>
    )
}

const LeftSidebarStyle = styled.div`
  top: 0;
  left: 0;
  width: 20%;
  height: 100%;
  position: absolute;
  text-align: center;
  background: rgb(40, 47, 53);
  
  .header-current-user {
    background-color: #272728;
    
    .currentUser {
      height: 6vh;
      font-size: 5vh;
    }

    .button-logout {
      font-size: 3vh;
      color: white;
      background-color: #4c50ff;
      border: 0;
      cursor: pointer;
    }

    .button-logout:hover {
      background-color: #5e93ff;
    }
  }
`

export default LeftSidebar