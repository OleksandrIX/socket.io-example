import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {addMessageAction} from "../store/messageReducer";

const ChatInput = () => {
    const textInput = useRef()
    const [textMessage, setTextMessage] = useState('')
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const socket = useSelector(state => state.socket.socket)

    const sendMessage = () => {
        textInput.current.value = ''

        const dateSend = () => {
            let dateTime = new Date().toLocaleString()
            let [date, time] = dateTime.split(' ')
            date = date.slice(0, date.length - 1)
            return `${date} ${time}`
        }

        const message = {
            sender: currentUser.username,
            receiver: currentUser.selectUser.selectUsername,
            dateSend: dateSend(),
            message: textMessage,
        }

        socket.emit('send_message', {message, to: currentUser.selectUser.selectUserId, from: currentUser.id})

        dispatch(addMessageAction({message}))
    }

    const enterClick = (e) => {
        if (e.keyCode === 13) {
            sendMessage()
        }
    }

    const handleChange = (event) => {
        setTextMessage(event.target.value)
    }

    return (
        <ContainerInput>
            <input ref={textInput}
                   placeholder='Повідомлення...'
                   onChange={handleChange}
                   onKeyDown={enterClick}/>
            <button onClick={sendMessage}>Відправити</button>
        </ContainerInput>
    )
}

const ContainerInput = styled.div`
  position: absolute;
  bottom: 1vh;
  margin-left: 1vw;
  flex-direction: row;

  input {
    height: 5vh;
    width: 71vw;
    color: #fff;
    border: 0;
    border-bottom: 0.1vh solid #9b9b9b;
    outline: 0;
    font-size: 4vh;
    background: transparent;
    transition: border-color 0.2s;
  }

  button {
    font-size: 2vh;
    height: 5vh;
    width: 7vw;
    border: 0;
    background-color: #4c50ff;
    cursor: pointer;
    color: white;
  }

  button:hover {
    background-color: #5e93ff;
  }
`

export default ChatInput