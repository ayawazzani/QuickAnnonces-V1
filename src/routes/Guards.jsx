import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../store/selectors.js'

export function ProtectedRoute({ children }){
  const user = useSelector(selectAuthUser)
  const location = useLocation()
  if (!user) return <Navigate to="/connexion" state={{ from: location }} replace />
  return children
}

export function AdminRoute({ children }){
  const isAdmin = useSelector(state => state.auth.isAdmin)
  const location = useLocation()
  if (!isAdmin) return <Navigate to="/" state={{ from: location }} replace />
  return children
}
