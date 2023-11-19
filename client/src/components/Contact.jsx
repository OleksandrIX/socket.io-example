import React from "react";
import {v4 as uuidv4} from "uuid";
import Card from "./Card";

const Contact = (props) => {
    return (<Card key={uuidv4()} user={props.user}/>)
}

export default Contact