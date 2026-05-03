// 物件情報を表示するカードコンポーネント（編集・削除ボタン付き）
function PropertyCard({ property, onEdit, onDelete }) {
  const formattedRent = property.rent.toLocaleString('ja-JP')

  return (
    <div className="property-card">
      <div className="property-image">
        <span className="property-icon">🏠</span>
      </div>
      <div className="property-info">
        <h3 className="property-name">{property.name}</h3>
        <p className="property-area">
          <span className="property-tag">📍 {property.area}</span>
          <span className="property-tag">{property.floor_plan}</span>
        </p>
        <p className="property-rent">
          ¥{formattedRent}<span className="rent-unit"> / 月</span>
        </p>
      </div>
      <div className="property-actions">
        <button className="btn-edit" onClick={() => onEdit(property)}>
          編集
        </button>
        <button className="btn-delete" onClick={() => onDelete(property.id)}>
          削除
        </button>
      </div>
    </div>
  )
}

export default PropertyCard
