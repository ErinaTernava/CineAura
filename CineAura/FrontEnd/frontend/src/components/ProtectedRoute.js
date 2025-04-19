import { Navigate } from 'react-router-dom';
import useAuthToken from '../hooks/useAuthToken';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
