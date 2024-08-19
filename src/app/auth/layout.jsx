import React from 'react';


const AuthLayout = ({ children }) => {
  return (
    <div className="h-[100dvh] w-screen bg-gradient-to-r from-zinc-800 to-zinc-900 flex justify-center items-center ">     
        {children}
    </div>
  );
};

export default AuthLayout;
