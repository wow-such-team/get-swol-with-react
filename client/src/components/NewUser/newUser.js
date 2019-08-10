import React from "react";
import './style.css';

function CreateUser() {
    return (
        <div class="userLoginForm">
            <form>
                <div class="form-group row" >
                    <label for="staticEmail" class="col-sm-2 col-form-label" id="emailForm">Email</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control" id="staticEmail" value="email@example.com"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label" id="passwordForm">Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword" placeholder="Password"/>        
                    </div>
                </div>  
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label" id="confirmForm">Confirm Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword" placeholder="Password"/>        
                    </div>
                </div>            
        </form>
            <button id="userButton" >Create Account</button>
            <br></br>
            <button id="userButton">Already a User?></button>
        </div>
    )};

export default CreateUser;