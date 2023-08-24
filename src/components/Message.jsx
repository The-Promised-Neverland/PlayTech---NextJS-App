import React from "react";
import { Alert } from "./ReactBootStrap";

const Message = ({ variant, children }) => {
  return (
    <Alert
      variant={variant}
      style={{
        padding: "1rem",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
