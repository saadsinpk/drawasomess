import React from "react";
import styled from "styled-components";
import { FaCircle, faExclamationCircle } from "react-icons/fa";
const Text = styled.div`
  font-size:12px;
  color:#d91111;
  bottom:-1.5rem;
  position:absolute;
  display:flex;
  gap:5px;
    align-item:center

`

function ErrorText(props) {
    return <Text >
       <faExclamationCircle />
        {props.children}
    </Text>;
}

export default ErrorText;
