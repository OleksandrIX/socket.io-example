import React from "react";
import {useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import Contact from "./Contact";

const Contacts = () => {
    const users = useSelector(state => state.user.users)

    return (
        <>
            {users.map((user) =>
                user.username !== localStorage.getItem('username') ?
                    <Contact key={uuidv4()} user={user}/> : ''
            )}
        </>
    )
}

export default Contacts