import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import PropertyCard from '../components/PropertyCard'
import PropertyForm from '../components/PropertyForm'

function Properties({ session }) {
  const [properties, setProperties]         = useState([])
  const [loading, setLoading]               = useState(true)
  const [error, setError]                   = useState('')
  const [showForm, setShowForm]             = useState(false)
  const [editingProperty, setEditingProperty] = useState(null) // nullなら新規登録、値があれば編集

  // -----------------------------------------------------
  // SELECT: ログイン中ユーザーの物件一覧を取得
  // RLSにより auth.uid() = user_id の物件のみ返される
  // -----------------------------------------------------
  const fetchProperties = async () => {
    setLoading(true)
    setError('')

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError('物件の取得に失敗しました')
    } else {
      setProperties(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  // -----------------------------------------------------
  // DELETE: 物件を削除（確認ダイアログ付き）
  // -----------------------------------------------------
  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除しますか？')) return

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) {
      alert('削除に失敗しました。もう一度お試しください。')
      return
    }
    // 削除成功後はローカルのstateからも除去して再フェッチを省く
    setProperties(prev => prev.filter(p => p.id !== id))
  }

  // 編集ボタンクリック時：対象物件をstateにセットしてフォームを開く
  const handleEdit = (property) => {
    setEditingProperty(property)
    setShowForm(true)
  }

  // フォームを閉じる（状態リセット）
  const handleCloseForm = () => {
    setShowForm(false)
    setEditingProperty(null)
  }

  // INSERT / UPDATE 完了後：フォームを閉じて一覧を再取得
  const handleSaved = () => {
    handleCloseForm()
    fetchProperties()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="properties-container">
      <header className="properties-header">
        <div className="header-left">
          <span className="header-logo">🏠</span>
          <h1 className="header-title">物件一覧</h1>
        </div>
        <div className="header-right">
          {/* ログイン中のメールアドレスを表示（タブレット以上） */}
          <span className="user-email">{session?.user?.email}</span>
          <button onClick={handleLogout} className="btn-logout">
            ログアウト
          </button>
        </div>
      </header>

      <main className="properties-main">
        {/* ツールバー：件数と新規登録ボタン */}
        <div className="properties-toolbar">
          <p className="properties-count">
            {loading ? '読み込み中...' : `${properties.length}件の物件`}
          </p>
          <button className="btn-add" onClick={() => setShowForm(true)}>
            ＋ 物件を登録
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <div className="loading-state">
            <span className="loading-icon">🏠</span>
            <p>読み込み中...</p>
          </div>
        ) : properties.length === 0 ? (
          /* 物件が0件の場合の空状態 */
          <div className="empty-state">
            <span className="empty-icon">🏠</span>
            <p className="empty-text">まだ物件が登録されていません</p>
            <button className="btn-add" onClick={() => setShowForm(true)}>
              最初の物件を登録する
            </button>
          </div>
        ) : (
          <div className="properties-grid">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* 新規登録・編集モーダル（showFormがtrueの間だけ表示） */}
      {showForm && (
        <PropertyForm
          property={editingProperty}
          session={session}
          onSaved={handleSaved}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  )
}

export default Properties
