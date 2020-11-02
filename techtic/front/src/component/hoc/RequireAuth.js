import React from 'react';
import { getToken } from '../../auth';
import { Redirect } from 'react-router-dom';

export default function (ComposedComponent) {

  function RequireAuth(props) {

    const token = getToken();

    if (!token) {
      return <Redirect to="/login" />
    }
    return <ComposedComponent {...props} />;
  }

  return RequireAuth;
}
