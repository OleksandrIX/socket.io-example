import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import styled from "styled-components";
import {io} from "socket.io-client";
import {getAllUsers} from "../api/user.api";
import {addAllUsersAction, addCurrentUserAction, addUserAction} from "../store/userReducer";
import {addSocketAction} from "../store/socketReducer";
import LeftSidebar from "../components/LeftSidebar";
import MainContainer from "../components/MainContainer";

const Chat = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const users = useSelector(state => state.user.users)
    const socket = useSelector(state => state.socket.socket)

    useEffect(() => {
        const getData = async () => {
            const {data} = await axios.get(getAllUsers)
            for (const user of data.users) {
                if (user.username === localStorage.getItem('username')) {
                    dispatch(addCurrentUserAction({
                        id: user.id,
                        username: localStorage.getItem('username'),
                        isActive: true,
                    }))
                }
            }
            dispatch(addAllUsersAction(data.users))
        }
        getData().then()
    }, [dispatch])

    useEffect(() => {
        if (currentUser.id !== '' && socket === null) {
            dispatch(addSocketAction({socket: io.connect('ws://192.168.0.146:5000')}))
        }
    }, [currentUser, socket, dispatch])

    useEffect(() => {
        if (socket !== null) {
            socket.emit('add-user', {userId: currentUser.id})
        }
    }, [socket, currentUser.id])

    useEffect(() => {
        const handleNewUser = ({user}) => {
            const isInUsers = users.some((el) => el.id === user.id)
            if (!isInUsers) {
                dispatch(addUserAction({user}))
            }
        }

        if (socket !== null) {
            socket.on('new-user', handleNewUser)

            return () => {
                socket.off('new-user', handleNewUser)
            }
        }
    }, [socket, users, dispatch])


    return (
        <ChatStyle>
            <LeftSidebar/>
            <MainContainer/>
        </ChatStyle>
    )
}

const ChatStyle = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export default Chat