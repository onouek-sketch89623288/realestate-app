import { supabase } from '../lib/supabase'
import PropertyCard from '../components/PropertyCard'

// ダミー物件データ
const DUMMY_PROPERTIES = [
  { id: 1, name: 'グランドマンション渋谷', rent: 150000, area: '渋谷区', rooms: '2LDK' },
  { id: 2, name: 'サンライズアパート新宿', rent: 95000,  area: '新宿区', rooms: '1K'   },
  { id: 3, name: 'オーシャンビュー品川',   rent: 200000, area: '品川区', rooms: '3LDK' },
  { id: 4, name: 'シティハイツ池袋',       rent: 120000, area: '豊島区', rooms: '2DK'  },
  { id: 5, name: 'パークサイド目黒',       rent: 180000, area: '目黒区', rooms: '2LDK' },
  { id: 6, name: 'モダンレジデンス恵比寿', rent: 230000, area: '渋谷区', rooms: '3LDK' },
]

function Properties({ session }) {
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
          {/* ログイン中のユーザーメールアドレスを表示 */}
          <span className="user-email">{session?.user?.email}</span>
          <button onClick={handleLogout} className="btn-logout">
            ログアウト
          </button>
        </div>
      </header>

      <main className="properties-main">
        <p className="properties-count">{DUMMY_PROPERTIES.length}件の物件が見つかりました</p>
        <div className="properties-grid">
          {DUMMY_PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Properties
