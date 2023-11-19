import React from "react";
import {useSelector} from "react-redux";
import Login from "./page/Login";
import Chat from "./page/Chat";

const App = () => {
    const currentUser = useSelector(state => state.user.currentUser)

    if (!currentUser.isActive && localStorage.getItem('username') === null) {
        return (
            <>
                <Login/>
            </>
        )
    } else {
        return (
            <>
                <Chat/>
            </>
        )
    }

}

export default App