# realestate-app — 不動産管理アプリ

## プロジェクト概要

React + Vite + Supabase認証機能付きの不動産管理Webアプリ。

## 技術スタック

- **React 18** — UIフレームワーク
- **Vite 5** — ビルドツール・開発サーバー
- **React Router v6** — クライアントサイドルーティング
- **Supabase** — 認証（メール＋パスワード）

## ディレクトリ構成

```
realestate-app/
├── index.html              # エントリーポイント
├── vite.config.js          # Vite設定
├── package.json
├── .env                    # 環境変数（Gitに含めない）
├── .env.example            # 環境変数のテンプレート
├── .gitignore
└── src/
    ├── main.jsx            # Reactマウントポイント
    ├── App.jsx             # ルーティング・認証状態管理
    ├── index.css           # グローバルスタイル
    ├── lib/
    │   └── supabase.js     # Supabaseクライアント初期化
    ├── pages/
    │   ├── Login.jsx       # ログイン画面
    │   ├── Register.jsx    # 会員登録画面
    │   └── Properties.jsx  # 物件一覧画面
    └── components/
        ├── AuthGuard.jsx   # 認証ガード（未ログイン時リダイレクト）
        └── PropertyCard.jsx # 物件カードコンポーネント
```

## 環境変数

`.env` ファイルを作成し、以下を設定する（`.env.example` を参照）。

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 開発サーバー起動

```bash
npm run dev
```

## 開発ルール

- 外部ライブラリは `package.json` に定義されたもののみ使用する
- ファイルはすべてUTF-8（BOMなし）で保存する
- CSSはモバイルファーストで記述する
- JavaScriptは `const`/`let` を使い、`var` は使わない
- 関数は単一責任の原則に従い小さく保つ
- コメントは日本語で記載する

## Git運用ルール

- **コードを変更するたびに必ずGitHubへプッシュすること**
- コミットメッセージは日本語で、変更内容が伝わる簡潔な文にする
- プッシュ先リポジトリ: `git@github.com:onouek-sketch89623288/realestate-app.git`
- ブランチ: 原則 `main` ブランチで作業する

### コミット〜プッシュの手順

```bash
git add <変更ファイル>
git commit -m "変更内容を日本語で記述"
git push origin main
```

## 禁止事項

- `package.json` の依存パッケージを無断で追加・変更しない
- `.env` ファイルを読んだり変更したりしない
- `rm -rf` コマンドは実行しない

## デプロイ情報

- 本番URL：https://realestate-app-two-jet.vercel.app
- Supabaseプロジェクト名：realestate-app

## GitHubリポジトリ

https://github.com/onouek-sketch89623288/realestate-app
