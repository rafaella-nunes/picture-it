import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const isAunthenticated = false;
  return (
    <>
    {isAunthenticated ? (
      <Navigate to="/" />
      ) : (
        <> 
          <section>
            <Outlet />
          </section>
        </>
      )}
    </>
  )
}

export default AuthLayout