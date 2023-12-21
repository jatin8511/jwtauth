import { Navigate, useLocation } from "react-router-dom"

export default function ProtectedRoute({ auth, children }) {
  let location = useLocation()
  return auth ? children : <Navigate to={'/login'} state={{ from: location }} />
}