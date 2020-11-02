import React from 'react';
import { Redirect } from 'react-router-dom';
import { getToken } from '../../auth';

export default function (ComposedComponent) {

  function CheckIfLoggedIn(props) {
    const token = getToken();

    if (token) {
      return <Redirect to="/dashboard" />
    }
    return <ComposedComponent {...props} />;
  }

  return CheckIfLoggedIn;
}
