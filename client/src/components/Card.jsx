import React from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {v4 as uuidv4} from "uuid";
import {selectUserAction} from "../store/userReducer";

const Card = (props) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const socket = useSelector(state => state.socket.socket)

    const selectUser = () => {
        dispatch(selectUserAction({
            ...currentUser,
            selectUserId: props.user.id,
            selectUsername: props.user.username,
            isSelected: true
        }))

        socket.emit('get_all_messages', {sender: currentUser.username, receiver: props.user.username})
    }

    return (
        <CardStyle key={uuidv4()}>
            <div className='card' onClick={selectUser}>{props.user.username}</div>
        </CardStyle>
    )
}

const CardStyle = styled.div`
  margin-top: 1.5vh;
  background: #243862;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
  font-size: 2vw;
  text-align: center;
  
  .card:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`


export default Card