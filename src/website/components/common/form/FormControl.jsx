import React from "react";
import Input from "./Input";

function FormControl(props) {
  switch (props.control) {
    case "input":
      return <Input {...props} />;
    default:
      return null;
  }
}

export default FormControl;
