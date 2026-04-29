import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getWithExpiry } from '@/utils/auth';
import { generateRouteAccessMap } from '@/utils/route-access';

const routeAccessMap = generateRouteAccessMap();

function ProtectedRoute({ children }: { children?: JSX.Element }) {
  const location = useLocation();
  const hadStoredSession = Boolean(
    localStorage.getItem('token') || localStorage.getItem('user'),
  );
  const token = getWithExpiry('token');
  const user = getWithExpiry('user', true);
  // 🔐 Not logged in
  if (!token || !user) {
    return (
      <Navigate
        to="/"
        replace
        state={
          hadStoredSession
            ? {
                snackbar: {
                  message: 'Your session has expired. Please sign in again.',
                  type: 'error',
                },
              }
            : undefined
        }
      />
    );
  }

  const allowedRoles = routeAccessMap[location.pathname];

  // 🚫 If route exists but role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
