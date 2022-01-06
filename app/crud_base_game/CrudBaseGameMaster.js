
/**
 * CrudBaseゲームマスター（通称、ゲームマスター）
 * @note 
 *     便利屋的な役割も持ち、各クラスはこのクラスを呼び出して制御する。
 *     ゲーム進行の統括。テーブルトークRPGのゲームマスターのような役割。
 *     ゲームエンジンとしての役割。
 * @since 2021-12-25 | 2022-1-5
 * @auther amaraimusi
 * @version 1.1.0
 */
class CrudBaseGameMaster{
	
	/**
	 * コンストラクタ
	 * 
	 * @param box
	 * - flg
	 */
	constructor(game_canvas_xid, box){
		
		if (box == null) box = {};
		this.box = box;
		box['game_canvas_xid'] = game_canvas_xid;
		if (box['resolution'] == null)  box['resolution'] = 1.5; // 解像度 0.3～2.0の葉にで指定すること。例→0.5:解像度低 1:解像度標準 1.5:解像度高

		// ▽デバッグ関連
		this.cbgDebug = new CbgDebug(this);
		box = this.cbgDebug.setBoxProps(box);

		
		// ゲームキャンバス関連
		let gameCanvas = $('#' + game_canvas_xid); // キャンバスを取得
		if(gameCanvas[0] == null) throw Error('システムエラー 211225A');
		gameCanvas.get( 0 ).width = $( window ).width(); // キャンバスを画面いっぱいに広げる
		gameCanvas.get( 0 ).height = $( window ).height();
		let canvas = gameCanvas[0]; // HTML内のcanvas要素をゲームキャンバスとして取得するする。
		
		let main_width = gameCanvas.width(); // 横幅を取得する
		let main_height = gameCanvas.height(); // 縦幅を取得する
	
		// 画面の解像度を調整する
		let resolution = box.resolution; // 解像度
		canvas.width = main_width * resolution;
		canvas.height = main_height * resolution;
		
		// メンバに描画関連オブジェクトをセットする
		let ctx = canvas.getContext('2d'); // キャンバス・コンテキスト
		this.ctx = ctx;
		this.gameCanvas = gameCanvas; // jQueryゲームキャンバス要素
		this.canvas = canvas; // ゲームキャンバス

		box['main_width'] = main_width; // メイン横幅
		box['main_height'] = main_height; // メイン横幅
		if (box['font'] == null)  box['font'] = null; // テキストフォント    画面に表示する文字のフォント

		
		// ■■■□□□■■■□□□
		this.test_backimage = new Image();
		this.test_backimage.src = "rsc/test/backimage_test.jpg";
		
		var test_width = this.test_backimage.naturalWidth ;
		var test_height = this.test_backimage.naturalHeight ;
		console.log('test_width=' + test_width);//■■■□□□■■■□□□
		console.log('test_height=' + test_height);//■■■□□□■■■□□□
		
		this.test_chara = new Image();
		this.test_chara.src = "rsc/test/tamamusi.png";
		console.log(this.test_chara);//■■■□□□■■■□□□

		// 各画面コントローラ関連のプロパティ
		box['gamen_code'] = 'town'; // 画面コード
		box['prev_gamen_code'] = ''; // 前フレーム画面コード
		
		
		// 各画面コントローラオブジェクトの生成
		let gamens = {
			town:new TownController(this),
		};
		this.gamens = gamens;
		
		// Ajaxのセキュリティ
		box['ajax_url_load_data'] = '/wild_north/app/ajax/load_game_data.php';// ■■■□□□■■■□□□
		
		this.ajaxLoadData(box); // Ajax通信でゲームデータを読み取る

	}
	
	// Ajax通信でゲームデータを読み取る
	ajaxLoadData(box){
		
		let sendData={neko_name:'cat&dog%',same:{hojiro:'ホオジロザメ',shumoku:'シュモクザメ'}};
		
		// データ中の「&」と「%」を全角の＆と％に一括エスケープ(&記号や%記号はPHPのJSONデコードでエラーになる)
		sendData = this._escapeAjaxSendData(sendData);
		
		let fd = new FormData();
		
		let send_json = JSON.stringify(sendData);//データをJSON文字列にする。
		fd.append( "key1", send_json );
		
		// CSRFトークンを取得
		let csrf_token = jQuery('#csrf_token').val();
		fd.append( "csrf_token", csrf_token );
		
		let ajax_url =box.ajax_url_load_data;
		
		// AJAX
		jQuery.ajax({
			type: "post",
			url: ajax_url,
			data: fd,
			cache: false,
			dataType: "text",
			processData: false,
			contentType : false,
		})
		.done((res_json, type) => {
			let res;
			try{
				res =jQuery.parseJSON(res_json);//パース
			}catch(e){
				jQuery("#err").append(res_json);
				return;
			}
			console.log(res);//■■■□□□■■■□□□
			this.box['gameData'] = res;
			
			
			
			
		})
		.fail((jqXHR, statusText, errorThrown) => {
			let errElm = jQuery('#err');
			errElm.append('アクセスエラー');
			errElm.append(jqXHR.responseText);
			alert(statusText);
		});
	}
	
	
	/** ボックスのGetter
	 */
	getBox(){
		return this.box;
	}
	
	
	/** 前処理
	 */
	processBefore(){
		let box = this.box;
		
		this._clearScreen(); // 画面クリア
		box.fps_lap_time = Date.now(); // ラップタイムを取得
		
		// ▽デバッグ関連
		box.debug_py_next = box.debug_py;
	}
	
	draw(){
		let box = this.box;
		
		this.ctx.drawImage(this.test_backimage,
	            0,  // sx      (元画像の切り抜き始点X)
	            0,  // sy      (元画像の切り抜き始点Y)
	            1287,  // sWidth  (元画像の切り抜きサイズ：横幅)
	            714,  // sHeight (元画像の切り抜きサイズ：高さ)
	            0,  // dx      (Canvasの描画開始位置X)
	            0,  // dy      (Canvasの描画開始位置Y)
	            (box.main_width + 10) * box.resolution ,  // dWidth  (Canvasの描画サイズ：横幅) ※ 「+10」は補正値
	            box.main_height * box.resolution   // dHeight (Canvasの描画サイズ：高さ)
       		);
		
		    this.ctx.drawImage(this.test_chara,
	            0,  // sx      (元画像の切り抜き始点X)
	            0,  // sy      (元画像の切り抜き始点Y)
	            307,  // sWidth  (元画像の切り抜きサイズ：横幅)
	            420,  // sHeight (元画像の切り抜きサイズ：高さ)
	            200,  // dx      (Canvasの描画開始位置X)
	            400,  // dy      (Canvasの描画開始位置Y)
	            120,  // dWidth  (Canvasの描画サイズ：横幅)
	            84   // dHeight (Canvasの描画サイズ：高さ)
       		);
	}
	
	/** 後処理
	 */
	processAfter(){
		
		let box = this.box;
		
		this.cbgDebug.calcFps(); // FPS計算
		
		
	}


	/**
	 * テキスト描画
	 * @param string text 画面に表示するテキスト
	 * @param int x テキストを表示する位置X
	 * @param int y テキストを表示する位置Y
	 * @param string font フォント情報（省略可）
	 * 
	 */
	drawText(text, x, y ,font){
		
		if(font == null){
			if(this.box.font == null){
				this.box.font = "30px 'Meiryo'";
				this.ctx.font = this.box.font;
			}
		}else{
			this.box.font = font;
			this.ctx.font = this.box.font;
		}
		
		this.ctx.fillText(text, x, y, this.box.main_width - x);
		
	}
	
	/**
	 * デバッグを画面に表示
	 * @param string text 
	 */
	debugX(text){
		this.cbgDebug.debugX(text);
	}
	
	/** 画面クリア
	 */
	_clearScreen(){
		this.ctx.clearRect(0, 0, this.box.main_width, this.box.main_height); //一度canvasをクリア
	}
	
	
		// 画面アクティブチェック
	checkGamenActivate(){
		let box = this.box;
		
		if(box.gamen_code != box.prev_gamen_code){
			
			let gamen = this.gamens[box.gamen_code];
			gamen.activate();
			
			
			box.prev_gamen_code = box.gamen_code;
		}
	}
	
	/**
	 *  背景画像を配置
	 *  @param int back_img_id 背景画像ID
	 */
	backImage(back_img_id){
		console.log('背景画像を配置');//■■■□□□■■■□□□
	}
	
		/**
	 * データ中の「&」と「%」を全角の＆と％に一括エスケープ
	 * 
	 * @note
	 * PHPのJSONデコードでエラーになるので、＆記号をエスケープ。％記号も後ろに数値がつくとエラーになるのでエスケープ
	 * これらの記号はMySQLのインポートなどでエラーになる場合があるのでその予防。
	 * @param mixed data エスケープ対象 :文字列、オブジェクト、配列を指定可
	 * @returns エスケープ後
	 */
	_escapeAjaxSendData(data){
		if (typeof data == 'string'){
			data = data.replace(/&/g, '＆');
			data = data.replace(/%/g, '％');
			return data;

		}else if (typeof data == 'object'){
			for(var i in data){
				data[i] = this._escapeAjaxSendData(data[i]);
			}
			return data;
		}else{
			return data;
		}
	}
	
}