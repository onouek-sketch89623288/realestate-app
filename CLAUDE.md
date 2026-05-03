# realestate-app — 不動産アプリ

## プロジェクト概要

HTML/CSS/JavaScriptで構築する不動産アプリ。

## 技術スタック

- **HTML** — マークアップ・構造
- **CSS** — スタイリング・レイアウト
- **JavaScript** — ロジック・インタラクション（バニラJS）

## ディレクトリ構成

```
realestate-app/
├── index.html       # エントリーポイント
├── css/
│   └── style.css    # スタイル
└── js/
    └── main.js      # アプリロジック
```

## 開発ルール

- 外部ライブラリは原則使用しない
- ファイルはすべてUTF-8（BOMなし）で保存する
- CSSはモバイルファーストで記述する
- JavaScriptは`const`/`let`を使い、`var`は使わない
- 関数は単一責任の原則に従い小さく保つ

## Git運用ルール

- **コードを変更するたびに必ずGitHubへプッシュすること**
- コミットメッセージは日本語で、変更内容が伝わる簡潔な文にする
- プッシュ先リポジトリ: `git@github.com:onouek-sketch89623288/realestate-app.git`
- ブランチ: 原則`main`ブランチで作業する

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

## GitHubリポジトリ

https://github.com/onouek-sketch89623288/realestate-app
