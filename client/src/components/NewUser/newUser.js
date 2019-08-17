import React from "react";
import './style.css';

function CreateUser() {
    return (
        <div class="userLoginForm">
            <form>
                <div class="form-group row" >
                    <label for="username" class="col-sm-2 col-form-label" id="username">Username</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control" id="username" value="username (required)"/>
                    </div>
                </div>
                <div class="form-group row" >
                    <label for="email" class="col-sm-2 col-form-label" id="email">Email</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control" id="email" value="email@example.com"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label" id="password">Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="password" placeholder="Password"/>        
                    </div>
                </div>            
            </form>
            <button id="userButton" >Create Account</button>
            <br></br>
            <button id="userButton">Already a User?></button>
        </div>
    )};

export default CreateUser;