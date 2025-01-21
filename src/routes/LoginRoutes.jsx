import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import NoPageFound from 'pages/NoPageFound';
// import ForgetSuccess from 'pages/authentication/ForgetSuccess';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthForgetPass = Loadable(lazy(() => import('pages/authentication/ForgetPassword')));
const ForgetSuccess = Loadable(lazy(() => import('pages/authentication/ForgetSuccess')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <AuthLogin />
    },
    {
      path: '/forgetPass',
      element: <AuthForgetPass />
    },
    {
      path: '/forgetSuccess',
      element: <ForgetSuccess />
    },
    {
      path: '/register',
      element: <AuthRegister />
    },
    {
      path: '/*',
      element: <AuthLogin />
    }
  ]
};

export default LoginRoutes;
