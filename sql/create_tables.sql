-- =====================================================
-- 不動産管理アプリ — テーブル定義 & RLSポリシー
-- Supabase SQL Editor で実行してください
-- =====================================================

-- -----------------------------------------------------
-- propertiesテーブル作成
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS properties (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT        NOT NULL,
  rent        INTEGER     NOT NULL CHECK (rent > 0),
  area        TEXT        NOT NULL,
  floor_plan  TEXT        NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- -----------------------------------------------------
-- Row Level Security（RLS）を有効化
-- 有効にすることで、ポリシーがない操作はすべてブロックされる
-- -----------------------------------------------------
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------
-- RLSポリシー定義
-- auth.uid() = user_id の条件で自分のデータのみ操作可能にする
-- -----------------------------------------------------

-- SELECT: 自分が登録した物件のみ参照できる
CREATE POLICY "自分の物件のみ参照可能"
  ON properties
  FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: 自分のuser_idでのみ登録できる
CREATE POLICY "自分の物件のみ登録可能"
  ON properties
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: 自分が登録した物件のみ更新できる
CREATE POLICY "自分の物件のみ更新可能"
  ON properties
  FOR UPDATE
  USING (auth.uid() = user_id);

-- DELETE: 自分が登録した物件のみ削除できる
CREATE POLICY "自分の物件のみ削除可能"
  ON properties
  FOR DELETE
  USING (auth.uid() = user_id);

-- -----------------------------------------------------
-- 動作確認用クエリ（実行後に確認する場合）
-- -----------------------------------------------------
-- SELECT * FROM properties;
-- SELECT * FROM pg_policies WHERE tablename = 'properties';
