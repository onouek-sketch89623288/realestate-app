import { Navigate } from 'react-router-dom'

// 未ログインの場合はログイン画面にリダイレクトするガードコンポーネント
function AuthGuard({ session, children }) {
  if (!session) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default AuthGuard
