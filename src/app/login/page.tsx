import LoginForm from '@/components/LoginForm';
import React from 'react';

const Login = () => {
  return <LoginForm isDev={process.env.NODE_ENV === 'development'} />;
};

export default Login;
