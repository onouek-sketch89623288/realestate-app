import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Login from './pages/Login'
import Register from './pages/Register'
import Properties from './pages/Properties'
import AuthGuard from './components/AuthGuard'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 初回レンダリング時に現在のセッションを取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // 認証状態（ログイン・ログアウト）の変化を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <span className="loading-icon">🏠</span>
        <p>読み込み中...</p>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* ログイン済みの場合は物件一覧へリダイレクト */}
        <Route path="/login" element={session ? <Navigate to="/properties" replace /> : <Login />} />
        <Route path="/register" element={session ? <Navigate to="/properties" replace /> : <Register />} />

        {/* 認証が必要なルート */}
        <Route
          path="/properties"
          element={
            <AuthGuard session={session}>
              <Properties session={session} />
            </AuthGuard>
          }
        />

        {/* その他のパスはログイン状態に応じてリダイレクト */}
        <Route path="*" element={<Navigate to={session ? '/properties' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
