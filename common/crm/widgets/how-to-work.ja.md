[![ja](https://img.shields.io/badge/lang-ja-blue.svg)](how-to-work.ja.md)
[![en](https://img.shields.io/badge/lang-en-red.svg)](how-to-work.en.md)

> **お知らせ**：当社は、お客様により充実したサポート情報を迅速に提供するため、本ページのコンテンツは機械翻訳を用いて日本語に翻訳しています。正確かつ最新のサポート情報をご覧いただくには、本内容の英語版を参照してください。

# Zoho CRMでウィジェットを作成する方法

## ウィジェットとは？

ウィジェットは、Zoho CRMに作成・追加できる埋め込み型のUIコンポーネントです。サードパーティアプリケーションのデータを活用する処理を行うために使用できます。Zoho CRM向けのウィジェットは、[JS SDK](https://www.zohocrm.dev/explore/widgets/v1.5/jssdk#init)を使って構築できます。ウィジェットは[ZRC](https://www.zohocrm.dev/explore/widgets/v1.5/zrc_overview#what_is_zrc)にも対応しており、統一された構文でシームレスかつ一貫したAPI呼び出しが可能です。

Zoho CRMのウィジェットを使用すると、開発者は関連リスト、Webタブ、ボタンなどの表示領域にカスタムのHTML/CSS/JSアプリケーションを埋め込むことで、CRMのUIを拡張できます。本ドキュメントでは、**ZET CLI**のインストールから、ウィジェットのパッケージ化、デプロイ、Zoho CRM上での動作確認まで、ライフサイクル全体を解説します。

## 前提条件

- Zoho CRMのProfessional・Enterprise・Ultimate エディションの管理者権限を持つアカウント。
- お使いのマシンに [Node.js](https://nodejs.org/ja/download)（LTS版を推奨）がインストールされていること。
- コードエディターまたはIDE（例：Visual Studio Code）。
- HTML、CSS、JavaScriptの基礎知識。

## 制限

- Enterprise EditionおよびUltimate Editionで、それぞれ最大200個のウィジェットを作成できます。

---

## 1. ZET CLIのインストール

Zoho Extension Toolkit（ZET）は、Zohoのウィジェット/拡張機能を作成・実行・パッケージ化・デプロイするためのコマンドラインインターフェース（CLI）です。

ターミナルを開き、以下のコマンドを実行します：

```bash
npm install -g zoho-extension-toolkit
```

インストールを確認します：

```bash
zet -v
```
![](./media/step-1-zet-version.png)

---

## 2. ウィジェットプロジェクトの新規作成

ウィジェットを作成したいディレクトリに移動し、以下を実行します：

```bash
zet init
```

このコマンドを実行すると、プロジェクトテンプレートを作成するZohoサービスの一覧が表示されます。

![](./media/step-2-zet-init.png)

以下の項目を入力します：

- **サービスの選択** — `Zoho CRM`を選択します。
- **プロジェクト名の入力** — 任意のわかりやすい名前（例：`my_first_widget`）を入力します。

ZETにより、以下のような構造のプロジェクトが生成されます：

```
my_first_widget/
├── app/
│   └── widget.html
├── plugin-manifest.json
└── ...
```

![](./media/step-2b-project-structure.png)

---

## 3. `plugin-manifest.json`の確認

`zet init`でプロジェクトを作成すると、プロジェクトルートに`plugin-manifest.json`が自動生成されます。このファイルはプロジェクトの識別情報を持ち、開発サーバー起動時に`http://localhost:5000/plugin-manifest.json`で参照できます。

自動生成されるマニフェストの典型的な内容：

```json
{
    "service": "CRM"
}
```

![](./media/step-3-manifest.png)

---

## 4. ビジネスロジックの実装

`app/`フォルダー内で、ウィジェットのUIおよびロジックを構築します。

- `app/widget.html` — ウィジェットUIのマークアップ。
- `app/css/style.css` — スタイル定義。
- `app/js/main.js` — ビジネスロジック。CRMデータとのやり取りには[Zoho CRM JavaScript SDK（ZOHO.embeddedApp）](https://www.zohocrm.dev/explore/widgets/v1.5/jssdk#init)を使用します。

最小構成の`main.js`の例：

```javascript
ZOHO.embeddedApp.on("PageLoad", function (data) {
    console.log("ウィジェットが読み込まれました：", data);
    // ここにビジネスロジックを記述します
});

ZOHO.embeddedApp.init();
```

![](./media/step-4-business-logic.png)

> **重要** ：イベントリスナーを登録した**後**に、必ず`ZOHO.embeddedApp.init()`を呼び出してください。

> **メモ** ：JS SDKの`<script>`タグは、SDKを呼び出す独自のJSファイルよりも**前に**`widget.html`に記述する必要があります。SDKの最新CDN URLは [https://www.zohocrm.dev/explore/widgets/](https://www.zohocrm.dev/explore/widgets/) でご確認ください。

---

## 5. ウィジェットをローカルで実行する（`zet run`）

パッケージ化およびデプロイの前に、ウィジェットをローカルでホストし、Zoho CRM上で動作確認を行うことができます。

プロジェクトのルートディレクトリで以下を実行します：

```bash
zet run
```

![](./media/step-5-zet-run.png)

ZETがローカルのHTTPSサーバー（既定：`https://127.0.0.1:5000`）を起動します。

### ローカル証明書の信頼

`zet run`を初めて実行すると、ブラウザーが自己署名証明書に関する警告を表示します。Zoho CRMがウィジェットを読み込めるようにするため、`https://127.0.0.1:5000`をブラウザーで開き、証明書を手動で信頼してください。

![](./media/step-5b-cert-warning.png)

### Zoho CRMでローカルウィジェットのテストを有効にする

1. `設定 > 開発者向け情報 > ウィジェット`に移動します。
2. **「新しいウィジェットを作成する」** をクリックします。
3. ウィジェットの**名前**を入力し、**ウィジェットの種類**（Webタブ、関連リスト、ボタン、設定、ホーム画面のダッシュボード、シグナル、ウィザード、ブループリントなど）を選択し、**設置場所**として`外部`を選択します。
4. **ベースURL**に`https://127.0.0.1:5000/app/widget.html`を入力し、**保存する**をクリックします。

![](./media/step-5c-external-hosting.png)

5. 該当のCRMページ（例：レコード詳細画面）に移動すると、ローカルでホストされているウィジェットがCRM内に読み込まれます。

![](./media/step-5d-widget-in-crm.png)

> **ヒント** ：ソースファイルを編集後、CRMページを再読み込みするだけで、再パッケージ化することなく変更内容を即座に確認できます。

---

## 6. ウィジェットのパッケージ化

ウィジェットの動作確認が完了したら、ローカルサーバーを停止（`Ctrl + C`）し、以下を実行します：

```bash
zet pack
```

![](./media/step-6-zet-pack.png)

プロジェクトの`dist/`フォルダー内に`.zip`ファイルが生成されます。これがデプロイ用の成果物となります。

---

## 7. ウィジェットをZoho CRMにデプロイする

パッケージ化したウィジェットを直接アップロードして、他のユーザーがウィジェットにアクセス・使用できるようにします。

1. `設定 > 開発者向け情報 > ウィジェット`に移動します。
2. **「新しいウィジェットを作成する」** をクリックします。
3. **名前**を入力し、**詳細情報**（任意）を入力、**ウィジェットの種類**を選択し、**設置場所**として`Zoho`を選択します。
4. **アップロードする**をクリックして`dist/`フォルダーの`.zip`を選択し、**インデックスページ**（例：`/widget.html`）を入力して**保存する**をクリックします。

![](./media/step-7-upload-widget.png)

---

## 8. デプロイしたウィジェットの動作確認

1. ウィジェットを設定したCRMページ（Webタブ、関連リスト、ボタンなど）を開きます。
2. ウィジェットが正常に読み込まれ、ビジネスロジックが期待通り動作することを確認します。
3. ブラウザーの**開発者ツール（F12）** を使用して、ウィジェットのiframeを検査し、`console.log`出力をデバッグします。

![](./media/step-8-test-widget.png)

> **重要** ：<span style="color:red">ウィジェットによって行われたデータ操作は、本番のCRMに反映されます。動作確認の際は、必ずサンドボックス／テスト用CRMアカウント、またはテスト用レコードを使用してください。</span>

---

## 参考リンク

- [Zoho CRM ウィジェット — 公式ドキュメント](https://www.zoho.com/crm/developer/docs/widgets/)
- [Zoho CRM JavaScript SDK メソッド一覧](https://www.zohocrm.dev/explore/widgets/v1.5/jssdk#init)
