
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
		box['game_canvas_xid'] = game_canvas_xid;
		if (box['resolution'] == null)  box['resolution'] = 1.5; // 解像度 0.3～2.0の葉にで指定すること。例→0.5:解像度低 1:解像度標準 1.5:解像度高

		// ▽デバッグ関連
		if (box['debug_px'] == null)  box['debug_px'] = 10; // デバッグ表示位置X
		if (box['debug_py'] == null)  box['debug_py'] = 30; // デバッグ表示位置Y
		box['debug_py_next'] = 0; // デバッグ位置Yネクスト
		box['debug_line_h'] = 32; // デバッグ行高
		

		let gameCanvas = $('#' + game_canvas_xid);
		
		gameCanvas.get( 0 ).width = $( window ).width();
		gameCanvas.get( 0 ).height = $( window ).height();
		
		
		let o_width = gameCanvas.outerWidth();
		console.log('o_width＝' + o_width);//■■■□□□■■■□□□
		let i_width = gameCanvas.innerWidth();
		console.log('i_width＝' + i_width);//■■■□□□■■■□□□
		
		
		if(gameCanvas[0] == null) throw Error('システムエラー 211225A')
		let canvas = gameCanvas[0]; // HTML内のcanvas要素をゲームキャンバスとして取得するする。
		
		let main_width = gameCanvas.width(); // 横幅を取得する
		let main_height = gameCanvas.height(); // 縦幅を取得する
		console.log('main_width=' + main_width);//■■■□□□■■■□□□
	
		// 画面の解像度を調整する
		let resolution = box.resolution; // 解像度
		canvas.width = main_width * resolution;
		canvas.height = main_height * resolution;
		console.log('main_width * resolution=' + main_width * resolution);//■■■□□□■■■□□□
		
		
		o_width = gameCanvas.outerWidth();
		console.log('o_width＝' + o_width);//■■■□□□■■■□□□
		i_width = gameCanvas.innerWidth();
		console.log('i_width＝' + i_width);//■■■□□□■■■□□□
		
		let ctx = canvas.getContext('2d'); // キャンバス・コンテキスト
		
		this.ctx = ctx;
		this.gameCanvas = gameCanvas; // jQueryゲームキャンバス要素
		this.canvas = canvas; // ゲームキャンバス




		box['main_width'] = main_width; // メイン横幅
		box['main_height'] = main_height; // メイン横幅
		if (box['font'] == null)  box['font'] = null; // テキストフォント    画面に表示する文字のフォント
		
		// ▽FPS関連 ※FPS指定はできない。60FPSで固定。機種によっては30FPSになる。
		box['frame_count'] = 0; // フレームカウンタ
		box['fps_lap_time'] = 0; // FPS制御用・ラップタイム
		box['fps_lap_time_old'] = 0; // FPS制御用・前フレームのラップタイム
		box['fps_moment'] = 0; // FPS制御用・刹那時間 (1フレームにおけるゲーム処理時間)
		box['fps_f_ms'] = 0; // FPS制御用・1フレームms
		box['fps_sec_conter'] = 0; // 1秒フレームカウンタ
		box['fps_sec_lap_time'] = Date.now(); // 1秒ラップタイム
		box['fps_real'] = 0; // FPS   1秒あたりのフレーム数
		
		
		
		this.box = box;
		
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
		
		this._calcFps(); // FPS計算
		
		
	}
	
	/** FPS計算
	 */
	_calcFps(){
		let box = this.box;
		let fps_lap_time = box.fps_lap_time; // FPSラップタイム
		let fps_lap_time_old = box.fps_lap_time_old; // 前フレームのFPSラップタイム
		
		let fps_lap_time_after= Date.now(); // ラップタイムを取得
		let fps_moment = fps_lap_time_after - fps_lap_time; // 刹那時間を算出
		
		let fps_f_ms = fps_lap_time - fps_lap_time_old; // FPSを算出
		
		box.frame_count++; // フレームカウンタのインクリメント
		
		// ▽ FPSの計算
		if(box.fps_sec_lap_time + 1000 < fps_lap_time){
			box.fps_real = box.fps_sec_conter / (fps_lap_time - box.fps_sec_lap_time);
			box.fps_real = box.fps_real * 1000;
			box.fps_sec_conter = 0;
			box.fps_sec_lap_time = fps_lap_time;
		}else{
			box.fps_sec_conter ++; // 1秒フレームカウンタのインクリメント
		}
		
		
		box.fps_moment = fps_moment;
		box.fps_f_ms = fps_f_ms;

		this.debugX(box.fps_lap_time); // ラップタイムを表示
		this.debugX('フレームカウンタ ' + box.frame_count);
		this.debugX('刹那時間ms ' + box.fps_moment);
		this.debugX('FPS ' + box.fps_real);

		box.fps_lap_time_old = fps_lap_time;
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
		let box = this.box;
		
		let x = box.debug_px;
		let y = box.debug_py_next ;
		
		box.debug_py_next += box.debug_line_h;
		
		this.drawText(text, x, y);
		
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
	
}