


# 開発環境構築手順 v2.0


ローカル環境に開発環境を構築する手順です。


① PHP7.3以上、MySQLが動作する環境をご用意ください。

② コマンドラインツール(Git Bashなど）を起動してください。

③ Windowsで開発している場合、以下のコマンドを実行してください。

```
exec winpty bash
```

④cd コマンドでプロジェクトをインストールする任意のディレクトリへ移動します。


⑤ GitHubからプロジェクトを取り込みます。

```
git clone git@github.com:amaraimusi/wild_north.git
```

⑥開発環境のphp.iniを開きmemory_limitの容量を確認してください。「512M」だと後述のvendorインストールでメモリ不足エラーが発生しますので3Gくらいに書き換えてください。

```
memory_limit=512M ←変更前
memory_limit=3G ←変更後

```


⑦ 下記のcomposerコマンドでvendorをインストールしてください。環境に合わせたパッケージがvendorに自動インストールされます。

```
cd wild_north/dev
composer update
```

※次のような書き方もできます。→「php composer.phar update」

<br>



⑧下記のComposerコマンドでLaravelのUIパッケージをインストールしてください。


```
composer require laravel/ui
```

※次のような書き方もできます。→「php composer.phar require laravel/ui」

<br>


⑦ MySQLにてwild_northデータベースを作成してください。照合順序はutf8mb4_general_ciを選択してください。

```
例
CREATE DATABASE wild_north COLLATE utf8mb4_general_ci
```

⑧ wild_north.sqlダンプファイル(wild_north/doc/wild_north.sql)をインポートしてください。

マイグレーションはご用意しておりません。phpmyadminかmysqlコマンドなどをご利用ください。


⑨.envファイルへ開発環境に合わせたDB設定を記述してください。

設定についてはLaravelの公式サイトなどを参照してください。


⑩URLへアクセスし、ログイン画面が表示されれば成功です。

```
例
http://localhost/wild_north/dev/public/
```

⑪検証用のアカウントは以下の通りです。
いずれのアカウントもパスワードは「abcd1234」になります。
	
```
himiko@example.com
ono_no_imoko@example.com
```


```