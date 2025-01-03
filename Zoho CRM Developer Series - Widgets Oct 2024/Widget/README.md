[![jp](https://img.shields.io/badge/lang-jp-green.svg)](https://github.com/zoho/zoho-japan/blob/main/Zoho%20CRM%20Developer%20Series%20-%20Widgets%20Oct%202024/Widget/README.md)
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/zoho/zoho-japan/blob/main/Zoho%20CRM%20Developer%20Series%20-%20Widgets%20Oct%202024/Widget/README.en.md)

# 概要
こちらは、さまざまなタブの期限レコードをカレンダー形式で可視化するために作成されたCRMウィジェットです。

| タブ名 | 説明 |
| ----------- | ----------- |
| タスク | 期限日を基に表示 |
| 予定 | 期限日を基に表示 |
| 通話 | 通話開始時刻を基に表示 |
| 見積書 | 期限日を基に表示 |
| 請求書 | 期限日を基に表示 |
| 受注書 | 期限日を基に表示 |
| 発注書 | 期限日を基に表示 |

# 実装方法

## 前提条件
- ウィジェットをサポートするZoho CRMトライアル版または有料版

## 実装手順
1. [zet](https://www.zoho.com/crm/developer/docs/widgets/install-cli.html)をインストールし、新しいプロジェクトを作成します。
2. こちらの[app](app/)フォルダー内のファイルで、既存のappフォルダーを置き換えます。
3. [script.js](app/js/script.js)内の`CONNECTION_NAME`および`CRM_BASE_URL`の変数を、適切な値に更新します。
4. JP DC以外のデータセンターにウィジェットを実装する場合、[script.js](app/js/script.js)内の必要なAPIエンドポイントも更新します。
5. ウィジェットを.zip化します。
6. Zoho CRMに実装します。

# 強化計画
1. スクリプトを変更せずにマルチDCのサポート
2. ステータス項目に基づいて「完了済み」ステータスのレコードをフィルタリング -（こちらの[設定](app/js/script.js#L3)に必要な詳細が既に含まれています）
3. 特定のグループに所属するすべてのユーザーのレコードを表示
4. 月の変更に伴うAPIコール数の最適化
5. UIの強化
6. 多言語サポート

