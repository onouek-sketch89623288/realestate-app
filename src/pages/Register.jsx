import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    // パスワード一致チェック
    if (password !== confirm) {
      setError('パスワードが一致しません')
      return
    }

    setLoading(true)

    // Supabaseで新規ユーザー登録
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError('登録に失敗しました。再度お試しください。')
    } else {
      setMessage('確認メールを送信しました。メールをご確認の上、ログインしてください。')
    }
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">🏠</div>
        <h1 className="auth-title">不動産管理アプリ</h1>
        <h2 className="auth-subtitle">会員登録</h2>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">メールアドレス</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">パスワード（6文字以上）</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              minLength={6}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">パスワード（確認）</label>
            <input
              type="password"
              className="form-input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="パスワードを再入力"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '登録中...' : '会員登録'}
          </button>
        </form>

        <p className="auth-link">
          すでにアカウントをお持ちの方は{' '}
          <Link to="/login">ログイン</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
