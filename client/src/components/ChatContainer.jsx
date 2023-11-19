import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {v4 as uuidv4} from "uuid";
import {addAllMessagesAction, addMessageAction} from "../store/messageReducer";

const ChatContainer = () => {
    const chatContainer = useRef(null)

    const dispatch = useDispatch()
    const messages = useSelector(state => state.message.messages)
    const currentUser = useSelector(state => state.user.currentUser)
    const socket = useSelector(state => state.socket.socket)

    useEffect(() => {
        chatContainer.current.scrollTop = chatContainer.current.scrollHeight
    }, [messages])

    useEffect(() => {
        socket.on('all_messages', (data) => {
            let msg = []
            for (const datum of data) {
                for (const message of datum) {
                    msg.push(message)
                }
            }
            sortMessageByTime(msg)
            dispatch(addAllMessagesAction({messages: msg}))
        })
    }, [socket, dispatch])

    useEffect(() => {
        const handleMessage = ({message, from}) => {
            if (currentUser.selectUser.selectUserId === from) {
                dispatch(addMessageAction({message}))
            }
        }
        socket.on('receive_message', handleMessage)

        return () => {
            socket.off('receive_message', handleMessage)
        }
    }, [socket, currentUser.selectUser.selectUserId, dispatch])


    const sortMessageByTime = (msg) => {
        const sortDate = (a, b) => {
            let [dateA] = a.dateSend.split(' ')
            let [dateB] = b.dateSend.split(' ')
            dateA = dateA.split('.').reverse().join('')
            dateB = dateB.split('.').reverse().join('')
            return dateA - dateB
        }

        const sortTime = (a, b) => {
            let [, timeA] = a.dateSend.split(' ')
            let [, timeB] = b.dateSend.split(' ')
            timeA = timeA.split(':').join('')
            timeB = timeB.split(':').join('')
            return timeA - timeB
        }

        msg.sort(sortTime)
        msg.sort(sortDate)

        return msg
    }

    const date = (dateSend) => {
        const [date, time] = dateSend.split(' ')
        return (<span className='date'>{date} {time}</span>)
    }

    return (
        <Container>
            <div ref={chatContainer} className='messages'>
                {messages.map((message) => {
                        return (
                            <div key={uuidv4()} className={currentUser.username === message.sender ? 'sender' : 'receiver'}>
                                <h3>{message.sender}</h3>
                                <p>{message.message}</p>
                                {date(message.dateSend)}
                            </div>
                        )
                    }
                )}
            </div>
        </Container>
    )
}

const Container = styled.div`
  top: 7vh;
  bottom: 6vh;
  height: calc(100% - 15vh);
  justify-content: flex-end;

  .messages {
    overflow-y: auto;
    
    .sender {
      padding: 1vh;
      font-size: 3vh;
      margin: 1vw;
      align-self: flex-end;
      width: 20vw;
      border-radius: 4px;
      background-color: rgba(86, 225, 225, 0.56);
    }

    .receiver {
      margin: 10px;
      align-self: flex-start;
      width: 300px;
      border-radius: 4px;
      background-color: rgba(86, 225, 225, 0.56);
    }

    .date {
      margin-top: 1vh;
      word-spacing: 13vw;
      font-size: 1.5vh;
    }
  }
`

export default ChatContainer