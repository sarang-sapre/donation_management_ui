import React from "react";
import axios from "axios";
import API_URL from '../../API/API_CONFIG.json';
import qs from 'qs';
import Alert from 'react-bootstrap/Alert';

class ResetPassword extends React.Component{
    constructor(){
        super();
        this.state = {
            username:"",
            new_password:"",
            confirm_password:"",
            reset_key:"",
            IsError:0,
            errormsg:"",
            IsSuccess:0
        }
        this.IsHandleCahnge = this.IsHandleCahnge.bind(this);
        this.IsHandleSubmit = this.IsHandleSubmit.bind(this);
    }

    IsHandleCahnge(event) {
        if (event.target.id === 'resetkey') {
            this.setState({
                reset_key: event.target.value
            })
        } else if (event.target.id === 'newpassword') {
            this.setState({
                new_password: event.target.value
            })
        } else if(event.target.id === 'confirmpassword'){
            this.setState({
                confirm_password: event.target.value
            })
        }else if(event.target.id === 'username'){
            this.setState({
                username: event.target.value
            })
        }else{
            alert("Something Went Wrong")
        }
        }
         
      IsHandleSubmit(event){
        if(this.state.new_password !== this.state.confirm_password){
         this.setState({
            IsError:1
         })
        }else {

            this.setState({
                IsError:0
             })

            let data = {
                reset_key:this.state.reset_key,
                username:this.state.username,
                new_password:this.state.new_password
            }

            let para = qs.stringify(data)
            axios.post(API_URL.ForgotPasswor,para).then((res) => {
                let obj = res.data[0][0];
                if (obj.status === 0) {
                    this.setState({
                        IsError: 1
                    })
                    this.setState({
                        errormsg: obj.msg
                    })
                } else if (obj.status === 1) {
                    console.log(1)
                    this.setState({
                        IsSuccess: 1
                    })
                } else {
                    alert("Something Went Wrong")
                }
            })

        }


    };

    render() {
        return (
            <>
            {this.state.error ? <Alert key="danger" variant="danger"><h2>{this.state.errormsg}</h2></Alert> : ""}
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Forgot Password</h3>
                        <div className="form-group mt-3">
                            <label>Rest Key</label>
                            <input
                                id="resetkey"
                                type="text"
                                value={this.state.reset_key}
                                className="form-control mt-1"
                                placeholder="Enter reset key"
                                onChange={this.IsHandleCahnge}
                            />
                        </div>
                        <div className="form-group mt-3">
                        <label>Username</label>
                            <input
                                id="username"
                                type="text"
                                value={this.state.username}
                                className="form-control mt-1"
                                placeholder="Enter usernamey"
                                onChange={this.IsHandleCahnge}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>New Password</label>
                            <input
                                id="newpassword"
                                type="password"
                                value={this.state.new_password}
                                className="form-control mt-1"
                                placeholder="Enter new password"
                                onChange={this.IsHandleCahnge}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Confirm Password</label>
                            <input
                                id="confirmpassword"
                                type="password"
                                value={this.state.confirm_password}
                                className="form-control mt-1"
                                placeholder="Confirm password"
                                onChange={this.IsHandleCahnge}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            </>
        )
    }
}

export default ResetPassword