import React from 'react';
import { Link, withRouter } from "react-router-dom";
import request from "../../request";
import { logout } from '../../auth';

const Header = (props) => {

  const logoutUser = (e) => {
    e.preventDefault();
    request
      .post('/user/logout')
      .then(response => {
        logout();
        
        props.history.push("/login");
      })
      .catch(error => {
      });
  }

  return (
    <div className="bd-example">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <label class="navbar-brand mr-auto">{props.title}</label>
        <div class="form-inline my-2 my-lg-0">
          <Link to={"/"} onClick={logoutUser}>Logout</Link> 
        </div>
      </nav>
    </div>
  );
}
export default withRouter(Header);
