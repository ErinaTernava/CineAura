import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const [token, setToken] = useState(cookies.access_token || '');
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setToken(cookies.access_token || '');

    try {
      if (cookies.access_token) {
        const decodedToken = jwtDecode(cookies.access_token);

        const id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        setUserId(id);
        setUserRole(role);
      } else {
        setUserId('');
        setUserRole(null);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, [cookies.access_token]);

  const clearToken = () => {
    removeCookie('access_token');
    setToken('');
    setUserId('');
    setUserRole(null);
  };

  return { token, userId, userRole, clearToken };
};

export default useAuthToken;
