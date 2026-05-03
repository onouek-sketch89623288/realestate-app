import { useState } from 'react'
import { supabase } from '../lib/supabase'

// 物件の新規登録・編集フォームモーダル
// property が null の場合は新規登録、値がある場合は編集モード
function PropertyForm({ property, session, onSaved, onCancel }) {
  const isEdit = !!property

  const [formData, setFormData] = useState({
    name:       property?.name       ?? '',
    rent:       property?.rent       ?? '',
    area:       property?.area       ?? '',
    floor_plan: property?.floor_plan ?? '',
  })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = {
      name:       formData.name,
      rent:       parseInt(formData.rent, 10),
      area:       formData.area,
      floor_plan: formData.floor_plan,
    }

    let supabaseError

    if (isEdit) {
      // UPDATE: 対象IDの物件を更新（RLSにより自分の物件のみ許可）
      const { error } = await supabase
        .from('properties')
        .update(payload)
        .eq('id', property.id)
      supabaseError = error
    } else {
      // INSERT: user_idを付与して新規登録（RLSのWITH CHECKで検証される）
      const { error } = await supabase
        .from('properties')
        .insert({ ...payload, user_id: session.user.id })
      supabaseError = error
    }

    if (supabaseError) {
      setError('保存に失敗しました。もう一度お試しください。')
      setLoading(false)
      return
    }

    onSaved()
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      {/* stopPropagation でオーバーレイクリックによる誤閉じを防ぐ */}
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEdit ? '物件を編集' : '物件を新規登録'}
          </h2>
          <button className="modal-close" onClick={onCancel} aria-label="閉じる">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">物件名</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="例：グランドマンション渋谷"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">家賃（円）</label>
            <input
              type="number"
              name="rent"
              className="form-input"
              value={formData.rent}
              onChange={handleChange}
              placeholder="例：150000"
              min={1}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">エリア</label>
            <input
              type="text"
              name="area"
              className="form-input"
              value={formData.area}
              onChange={handleChange}
              placeholder="例：渋谷区"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">間取り</label>
            <input
              type="text"
              name="floor_plan"
              className="form-input"
              value={formData.floor_plan}
              onChange={handleChange}
              placeholder="例：2LDK"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              キャンセル
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? '保存中...' : isEdit ? '更新する' : '登録する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PropertyForm
