import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status); // true if logged in
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && !authStatus) {
      // Page requires auth but user not logged in
      navigate('/login');
    } else if (!authentication && authStatus) {
      // Page should be public but user is logged in
      navigate('/');
    } else {
      setLoader(false);
    }
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout;
