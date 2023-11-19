import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import styled from "styled-components";
import {connect} from "../api/user.api";
import {addCurrentUserAction} from "../store/userReducer";

const Login = () => {
    const [username, setUsername] = useState('')
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)

    const connectUser = async () => {
        try {
            await axios.post(connect, {username: username})
            localStorage.setItem('username', username)
            dispatch(addCurrentUserAction({...currentUser, username: username, isActive: true}))
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (event) => {
        setUsername(event.target.value)
    }

    const enterClick = (e) => {
        if (e.keyCode === 13) {
            connectUser().then()
        }
    }

    return (
        <LoginStyle>
            <div className='header'>
                <h1>Авторизація</h1>
            </div>
            <h1 className='username'>{username}</h1>
            <div className='input'>
                <input type='text'
                       className='input-login'
                       placeholder="Нікнейм"
                       onChange={handleChange}
                       onKeyDown={(e) => enterClick(e)}/>
                <button className='button-login' onClick={connectUser}>Війти</button>
            </div>
        </LoginStyle>
    )
}

const LoginStyle = styled.div`
  height: 100%;
  width: 100%;
  flex-direction: column;

  .header {
    height: 6vh;
    width: 100%;
    background-color: #222;
    text-align: center;

    h1 {
      font-size: 5vh;
    }
  }

  .username {
    font-size: 6vh;
    padding: 2vh;
    margin-top: 4vh;
    text-align: center;
  }

  .input {
    flex-direction: row;
    justify-content: center;
    margin-top: 6vh;

    .input-login {
      color: #fff;
      width: 20vw;
      height: 4vh;
      font-size: 3vh;
      border: 0;
      border-bottom: 0.1vh solid #9b9b9b;
      outline: 0;
      background: transparent;
      transition: border-color 0.2s;
    }

    .button-login {
      font-size: 3vh;
      color: white;
      background-color: #4c50ff;
      border: 0;
    }

    .button-login:hover {
      background-color: #5e93ff;
    }
  }
`

export default Login