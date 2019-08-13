import React from "react";

export function LoginBtn(props) {
  return (
    <button {...props} className="login-btn">
      {props.children}
    </button>
  );
}
