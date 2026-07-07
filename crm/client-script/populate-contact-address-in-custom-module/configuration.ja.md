[![ja](https://img.shields.io/badge/lang-ja-red.svg)](configuration.ja.md)
[![en](https://img.shields.io/badge/lang-en-red.svg)](configuration.en.md)

> **お知らせ**：当社は、お客様により充実したサポート情報を迅速に提供するため、本ページのコンテンツは機械翻訳を用いて日本語に翻訳しています。正確かつ最新のサポート情報をご覧いただくには、本内容の英語版を参照してください。

# カスタムモジュールへの連絡先住所の自動入力

## クライアントスクリプトの作成
1. CRMで[クライアントスクリプトを作成](/common/crm/client-script/how-to-work.ja.md)し、以下の詳細を入力します。
    - `名前（Name）`: Populate Contact Address in Custom Module
    - `カテゴリ（Category）`: Module
    - `ページ（Page）`: Create, Edit, Clone
    - `モジュール（Module）`: `<カスタムモジュール名>`
    - `レイアウト（Layout）`: Standard
    - `タイプ（Type）`: Field Event
    - `フィールド（Field）`: `<連絡先ルックアップフィールド名>`
    - `イベント（Event）`: On Change

2. [このコード](script.js)をスクリプトエディターに追加し、保存します。

> **注意** : スクリプトで使用されているフィールドのAPI名は、カスタムモジュールの住所フィールドの実際のAPI名と一致している必要があります。以下の手順に従って、正しいAPI名を確認し、スクリプトを更新してください。

### フィールドAPI名の確認方法
1. `CRM設定 > カスタマイズ > モジュールとフィールド` に移動します。
2. スクリプトを設定するカスタムモジュールを選択します。
3. 住所フィールド（請求先／配送先）をクリックして、フィールドのプロパティを開きます。
4. フィールドのプロパティに表示されている `フィールドAPI名` をコピーします。

### スクリプトの更新方法
1. [script.js](script.js) を開き、`ZDK.Page.getForm().setValues({...})` のブロックを見つけます。
2. `setValues` オブジェクトのキー（左側）を、カスタムモジュールの請求先・配送先住所フィールドの実際のAPI名に置き換えます。
3. 値（右側）は連絡先モジュールの標準住所フィールドのAPI名であり、変更不要です。

### フィールドマッピングの参照

以下はスクリプトで使用されているマッピング構造です。**カスタムモジュールフィールド** のAPI名を、お使いのカスタムモジュールのものに置き換えてください。

| カスタムモジュールフィールド（請求先住所） | 連絡先フィールド（その他の住所） |
|------------------------------------------|----------------------------------|
| `Billing_Address_Street_Address` | `Other_Street` |
| `Billing_Address_City` | `Other_City` |
| `Billing_Address_State_Province` | `Other_State` |
| `Billing_Address_Zip_Postal_Code` | `Other_Zip` |
| `Billing_Address_Country_Region` | `Other_Country` |
| `Billing_Address_Flat_House_No_Building_Apartment_N` | `Other_Flat_House_No_Building_Apartment_Name` |
| `Billing_Address_Coordinates_Latitude` | `Other_Latitude` |
| `Billing_Address_Coordinates_Longitude` | `Other_Longitude` |

| カスタムモジュールフィールド（配送先住所） | 連絡先フィールド（郵送先住所） |
|------------------------------------------|--------------------------------|
| `Shipping_Address_Street_Address` | `Mailing_Street` |
| `Shipping_Address_City` | `Mailing_City` |
| `Shipping_Address_State_Province` | `Mailing_State` |
| `Shipping_Address_Zip_Postal_Code` | `Mailing_Zip` |
| `Shipping_Address_Country_Region` | `Mailing_Country` |
| `Shipping_Address_Flat_House_No_Building_Apartment` | `Mailing_Flat_House_No_Building_Apartment_Name` |
| `Shipping_Address_Coordinates_Latitude` | `Mailing_Latitude` |
| `Shipping_Address_Coordinates_Longitude` | `Mailing_Longitude` |