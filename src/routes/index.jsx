import { createBrowserRouter } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ErrorRoutes from './ErrorRoutes';

const token = localStorage.getItem('token');

const router = createBrowserRouter(
  token ? [MainRoutes, ErrorRoutes] : [LoginRoutes],
  { basename: '/' }
);

export default router;

