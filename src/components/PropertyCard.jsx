// 物件情報を表示するカードコンポーネント
function PropertyCard({ property }) {
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
          <span className="property-tag">{property.rooms}</span>
        </p>
        <p className="property-rent">¥{formattedRent}<span className="rent-unit"> / 月</span></p>
      </div>
    </div>
  )
}

export default PropertyCard
