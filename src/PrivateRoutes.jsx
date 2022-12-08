import { Typography } from '@mui/material';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const PrivateRoutes = () => {
  let auth = useAuth();
  if (auth === undefined)
    return <Typography variant="h3">Loading...</Typography>;
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
