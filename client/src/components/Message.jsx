import React from "react";
import styled from "styled-components";

const Message = (props) => {

    return(
        <Container>
            {props.message}
        </Container>
    )
}

const Container = styled.div`

`

export default Message