import React from "react";
import '../LogIn/login.css';
import axios from "axios";
import API_URL from '../../API/API_CONFIG.json';
import Header from '../Header/header.component';
import Alert from 'react-bootstrap/Alert';
import qs from 'qs';




class LogIn extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            status: null,
            error: 0,
            errormsg: "",
            islogin: 0
        }

        this.IsHandleCahnge = this.IsHandleCahnge.bind(this);
        this.IsHandleSubmit = this.IsHandleSubmit.bind(this);
    }

    

    IsHandleCahnge(event) {
        if (event.target.id === 'username') {
            this.setState({
                username: event.target.value
            })
        } else if (event.target.id === 'password') {
            this.setState({
                password: event.target.value
            })
        } else {
            alert("Something Went Wrong")
        }

    };

    IsLogin(users, pwd){


        let user = {
            username: users,
            password: pwd
        }

        let cred = qs.stringify(user)

        axios.post(API_URL.SignIN, cred,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((res) => {
                let obj = res.data[0][0];
                if (obj.status === 0) {
                    this.setState({
                        error: 1
                    })
                    this.setState({
                        errormsg: obj.msg
                    })
                } else if (obj.status === 1) {
                    this.setState({
                        islogin: 1
                    })
                    localStorage.setItem('ActiveSession',obj.status);
                    window.location.assign('http://13.233.29.162/dashboard')

                } else {
                    alert("Something Went Wrong")
                }
            })

    }

    IsHandleSubmit(e) {

        this.IsLogin(this.state.username, this.state.password)
        e.preventDefault();

    }


    render() {
        return (
            <>
                {Boolean(this.state.error) ? <Alert key="danger" variant="danger"><h2>{this.state.errormsg}</h2></Alert> : ""}
                {Boolean(localStorage.getItem('ActiveSession')) ? <Header name={this.state.username} />
                :
                <div className="Auth-form-container">
                    <form className="Auth-form">
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Sign In</h3>
                            <div className="form-group mt-3">
                                <label>Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    value={this.state.username}
                                    className="form-control mt-1"
                                    placeholder="Enter username"
                                    onChange={this.IsHandleCahnge}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={this.state.password}
                                    className="form-control mt-1"
                                    placeholder="Enter password"
                                    onChange={this.IsHandleCahnge}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.IsHandleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                            <p className="forgot-password text-right mt-2">
                                <a href="/FortgotPassword"
                                >Forgot password</a>
                            </p>
                        </div>
                    </form>
                </div>
    }
            </>
        );
    }
}

export default LogIn