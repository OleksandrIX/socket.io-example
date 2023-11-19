import React from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";

const MainContainer = () => {
    const currentUser = useSelector(state => state.user.currentUser)

    if (!currentUser.selectUser.isSelected) {
        return (
            <Container>
                <div className='div-no-select-user'>
                    <h3>Виберіть чат</h3>
                </div>
            </Container>
        )
    } else {
        return (
            <Container>
                <div className='container-select-user'>
                    <h1>{currentUser.selectUser.selectUsername}</h1>
                </div>
                <ChatContainer/>
                <ChatInput/>
            </Container>
        )
    }
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 20%;
  width: 80%;
  height: 100%;

  .div-no-select-user {
    position: fixed;
    left: 50%;
    top: 40%;
    width: 25%;
    background: rgba(121, 129, 134, 0.4);
    border-radius: 100px;

    h3 {
      text-align: center;
      color: white;
      font-size: 2vw;
    }
  }

  .container-select-user {
    background-color: #272728;
    text-align: center;
    height: 6vh;
    
    h1{
      font-size: 5vh;
    }
  }
`

export default MainContainer