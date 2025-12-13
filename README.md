# LLM を使用したサービスのサンプル（Django + React + Ollama）

例外処理などは省き、最低限の実装で LLM を使用したサービスを構築するサンプルコードです。

## 環境構築

```
# dockerビルド
docker compose build --no-cache

# llmモデルのダウンロード（ここではllama3.1:8bをダウンロード）
docker exec -it llm_server ollama pull llama3.1:8b

# サービス起動
docker compose up -d

# backend 管理者ユーザー作成（Django管理者ページを使う場合）
cd backend
docker compose exec backend sh -c "python manage.py createsuperuser"
任意のユーザー名、メールアドレス、パスワードを入力してください。

# サービス停止
docker compose down
```

## LLM モデル例

2025 年 12 月現在のおすすめモデル一覧

```
# ローカル（Ollama 前提）

順位	モデル	コメント
- Llama 3.1 (70B)	圧倒的知識量（要高スペック）
- Llama 3.1 (8B)	実用最強バランス
- Qwen2.5	        技術・数学に強い
- Gemma 3	        軽量・Google品質
- Phi-3	            軽いが知識は少なめ

Llama 3.1 (70B) は高スペックな分、PCスペックが必要らしい。
- 容量140GB以上使用
- メモリ64GB以上推奨
- GPUのVRAMは48GB以上推奨
```

##　仕組み解説

- フロントエンド（React）からバックエンド（Django）に質問を送信
- バックエンドで Ollama API にリクエストを送信
- Ollama が LLM モデルで回答を生成し、バックエンドにレスポンスを返す
- バックエンドがフロントエンドに生成された文章を返す

## プロンプトの設定

`backend/apps/llm_config/prompts/` 以下のファイルを編集してください。

- `default.py`: これがキモ。デフォルトのシステムプロンプトを定義しています。ここを設定することで、LLM の応答スタイルを変更できます。
  　 （プロンプトをいじった場合、docker 再起動しないとダメっぽいです）
