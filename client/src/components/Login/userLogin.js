import React from "react";
import './style.css';

export function Username(props) {
    return (
        <div className="form-group login-box">
            <label for="inputUsername" id="username">Username</label>
            <input className="form-control" {...props} />
        </div>
    );
}


export function Email(props) {
    return (
        <div className="form-group login-box">
            <label for="inputEmail" id="email">Email</label>
            <input className="form-control" {...props} />
        </div>
    );
}

export function Password(props) {
    return (
        <div className="form-group login-box">
            <label for="inputPassword" id="password">Password</label>
            <input type="password" className="form-control" {...props} />
        </div>
    )
}

export function Container({ fluid, children }) {
    return <div className={`container${fluid ? "-fluid" : ""}`}>{children}</div>;
  }
  
  export function Row({ fluid, children }) {
    return <div className={`row${fluid ? "-fluid" : ""}`}>{children}</div>;
  }

  export function Col({ size, children }) {
    return (
      <div
        className={size
          .split(" ")
          .map(size => "col-" + size)
          .join(" ")}
      >
        {children}
      </div>
    );
  }