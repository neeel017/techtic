import React, {Fragment, useState} from 'react';
import request from '../../request';
import { login } from '../../auth';
import { toast } from 'react-toastify';
import { getErrors } from '../../auth';
import classNames from 'classnames';
import { withRouter } from "react-router-dom";

const Login = (props) => {
    const [loginData, setLoginData] = useState({
      email: '',
      password: ''
    });
    const [errors, setErrors] = useState({});
    const [isDisable, setIsDisable] = useState(false);

    const handleSubmit = (e) => {
      request.post('/user/login', loginData).then((res) => {
        login(res.data.token);
        setErrors({});
        setIsDisable(false);
        props.history.push("/dashboard");
      }).catch((err) => {
        setIsDisable(false);
        toast.error(err.response.data.message);
        setErrors(getErrors(err.response.data).fields)
      });
    }

    const onChange = (e) => {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    return (
      <Fragment>
        <div className="login-form">
            <form>
                <h2 className="text-center">Log in</h2>       
                <div className="form-group">
                    <input type="text"
                      className={classNames('form-control', {
                        'is-invalid': errors.email,
                      })}
                      placeholder="Email"
                      name="email"
                      required
                      onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="password" 
                      className={classNames('form-control', {
                        'is-invalid': errors.email,
                      })}
                      placeholder="Password"
                      name="password"
                      required
                      onChange={onChange} />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-primary btn-block" onClick={handleSubmit} disabled={isDisable}>Log in</button>
                </div>       
            </form>
        </div>
      </Fragment>
    );
}

export default withRouter(Login);